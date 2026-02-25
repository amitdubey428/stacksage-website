export interface Env {
    PADDLE_WEBHOOK_SECRET: string;
    ALLOWED_ORIGIN: string;
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

    switch (eventType) {
        case "transaction.completed":
        case "subscription.activated": {
            // TODO: provision license — extract customer email from event data and
            // issue a time-limited license secret via your license service.
            // const data = event.data as Record<string, unknown>;
            // const customer = data.customer as Record<string, unknown>;
            // const email = customer.email as string;
            break;
        }
        case "subscription.canceled": {
            // TODO: revoke license on cancellation
            break;
        }
        default:
            // Unhandled event type — acknowledge receipt and move on
            break;
    }

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
