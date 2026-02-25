import { fulfillOrder } from "./fulfillment";

export interface Env {
    PADDLE_WEBHOOK_SECRET: string;
    ALLOWED_ORIGIN: string;
    // License signing — Ed25519 private key (PKCS8 DER, base64-encoded)
    STACKSAGE_PRIVATE_KEY_PKCS8_B64: string;
    // GHCR delivery
    STACKSAGE_IMAGE: string;
    STACKSAGE_GHCR_USERNAME: string;
    STACKSAGE_GHCR_TOKEN: string;
    // Email
    RESEND_API_KEY: string;
    FROM_EMAIL: string;
    // License duration fallback (days) — overridden by billing_cycle when available
    LICENSE_DAYS_DEFAULT: string;
}

function jsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
}

/**
 * Verifies a Paddle webhook signature.
 *
 * Paddle sends a `Paddle-Signature` header in the format:
 *   ts=<timestamp>;h1=<hmac-sha256-hex>
 *
 * The signed payload is: `<timestamp>:<raw-body>`
 */
async function verifyPaddleSignature(
    rawBody: string,
    signature: string,
    secret: string
): Promise<boolean> {
    const parts = signature.split(";");
    const tsPart = parts.find((p) => p.startsWith("ts="));
    const h1Part = parts.find((p) => p.startsWith("h1="));
    if (!tsPart || !h1Part) return false;

    const ts = tsPart.slice(3);
    const h1 = h1Part.slice(3);

    const signedPayload = `${ts}:${rawBody}`;

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const mac = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(signedPayload)
    );

    const expected = Array.from(new Uint8Array(mac))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return expected === h1;
}

async function doFulfill(
    eventType: string,
    data: Record<string, unknown>,
    env: Env,
): Promise<void> {
    const customerObj = data.customer as Record<string, unknown> | undefined;
    const customData = data.custom_data as Record<string, unknown> | undefined;
    const billingDetails = data.billing_details as Record<string, unknown> | undefined;

    const email =
        (customData?.email as string | undefined) ||
        (customerObj?.email as string | undefined) ||
        (billingDetails?.email_address as string | undefined) ||
        "";

    if (!email) {
        console.error(
            `[stacksage] No customer email in ${eventType} event — skipping fulfillment`,
            JSON.stringify(data).slice(0, 400),
        );
        return;
    }

    const name =
        (customData?.name as string | undefined) ||
        (customerObj?.name as string | undefined) ||
        email;

    let daysValid = parseInt(env.LICENSE_DAYS_DEFAULT || "365", 10);
    const items = (data.items as Array<Record<string, unknown>> | undefined) || [];
    const firstItem = items[0] as Record<string, unknown> | undefined;
    const price = firstItem?.price as Record<string, unknown> | undefined;
    const billingCycle = price?.billing_cycle as Record<string, unknown> | undefined;
    if (billingCycle?.interval === "month") daysValid = 35;  // 30d + 5d grace
    if (billingCycle?.interval === "year") daysValid = 370;  // 365d + 5d grace

    const plan = (customData?.plan as string | undefined) || "pro";

    console.log(`[stacksage] Fulfilling ${eventType} for ${email} — plan=${plan} days=${daysValid}`);

    await fulfillOrder({
        customerName: name,
        customerEmail: email,
        plan,
        daysValid,
        ghcrImage: env.STACKSAGE_IMAGE,
        ghcrUsername: env.STACKSAGE_GHCR_USERNAME,
        ghcrToken: env.STACKSAGE_GHCR_TOKEN,
        privateKeyPkcs8B64: env.STACKSAGE_PRIVATE_KEY_PKCS8_B64,
        resendApiKey: env.RESEND_API_KEY,
        fromEmail: env.FROM_EMAIL || "onboarding@stacksageai.com",
    });

    console.log(`[stacksage] Onboarding email sent to ${email}`);
}

async function handleWebhook(request: Request, env: Env): Promise<Response> {
    const signature = request.headers.get("paddle-signature") || "";
    if (!signature) {
        return new Response("Missing signature", { status: 400 });
    }

    const rawBody = await request.text();

    const valid = await verifyPaddleSignature(rawBody, signature, env.PADDLE_WEBHOOK_SECRET);
    if (!valid) {
        return new Response("Invalid signature", { status: 401 });
    }

    let event: Record<string, unknown>;
    try {
        event = JSON.parse(rawBody);
    } catch {
        return new Response("Invalid JSON", { status: 400 });
    }

    const eventType = event.event_type as string | undefined;

    // Always acknowledge to Paddle before doing async work —
    // if fulfillment throws, we log but still return 200 to avoid duplicate retries.
    const fulfillmentPromise = (async () => {
        switch (eventType) {
            case "transaction.completed": {
                const data = event.data as Record<string, unknown>;

                // If this transaction belongs to a subscription, skip fulfillment here —
                // subscription.activated is the canonical trigger for subscriptions and
                // fires separately. Fulfilling both would send the customer two emails.
                if (data.subscription_id) {
                    console.log(
                        `[stacksage] transaction.completed has subscription_id=${data.subscription_id} — deferring to subscription.activated`,
                    );
                    break;
                }

                await doFulfill(eventType, data, env);
                break;
            }

            case "subscription.activated": {
                const data = event.data as Record<string, unknown>;
                await doFulfill(eventType, data, env);
                break;
            }

            case "subscription.canceled": {
                // License expiry is the enforcement mechanism — no active revocation needed.
                // Log for visibility in case manual action is required before natural expiry.
                const data = event.data as Record<string, unknown>;
                console.log(
                    `[stacksage] subscription.canceled — id=${data.id} customer_id=${data.customer_id}`,
                );
                break;
            }

            default:
                // Unhandled event type — acknowledge and move on
                break;
        }
    })();

    // Wait for fulfillment but don't surface errors to Paddle (avoid duplicate webhooks)
    await fulfillmentPromise.catch((err: unknown) => {
        console.error("[stacksage] Fulfillment error:", err);
    });

    return new Response("ok", { status: 200 });
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/webhook") {
            return handleWebhook(request, env);
        }

        return new Response("Not found", { status: 404 });
    },
};
