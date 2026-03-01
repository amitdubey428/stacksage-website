/**
 * ⚠️  NOT IN USE — as of 2026-03 StackSage uses Paddle exclusively for payments.
 * This worker is kept for reference but is NOT deployed and NOT receiving traffic.
 * Do NOT modify, deploy, or wire up new secrets for this worker without confirming
 * that the team has decided to re-enable Razorpay.
 * Active payment worker: workers/paddle/
 */

export interface Env {
    RAZORPAY_KEY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RAZORPAY_WEBHOOK_SECRET: string;
    RAZORPAY_AMOUNT_INR_PAISE: string;
    RAZORPAY_CURRENCY: string;
    ALLOWED_ORIGIN: string;
    RECEIPT_PREFIX: string;
}

const DEFAULT_CURRENCY = "INR";

function jsonResponse(data: unknown, status = 200, origin?: string) {
    const headers: Record<string, string> = {
        "content-type": "application/json",
    };
    if (origin) {
        headers["access-control-allow-origin"] = origin;
        headers["access-control-allow-credentials"] = "true";
    }
    return new Response(JSON.stringify(data), { status, headers });
}

function withCors(request: Request, env: Env) {
    const origin = request.headers.get("origin") || "";
    if (!origin) {
        return { ok: true, origin: "" };
    }
    const allowed = env.ALLOWED_ORIGIN || "";
    if (!allowed) {
        return { ok: false, origin: "" };
    }
    if (origin === allowed) {
        return { ok: true, origin };
    }
    return { ok: false, origin: "" };
}

async function handleOptions(request: Request, env: Env) {
    const { ok, origin } = withCors(request, env);
    if (!ok) {
        return new Response(null, { status: 403 });
    }
    return new Response(null, {
        status: 204,
        headers: {
            "access-control-allow-origin": origin,
            "access-control-allow-credentials": "true",
            "access-control-allow-methods": "POST,OPTIONS",
            "access-control-allow-headers": "content-type",
        },
    });
}

function toBasicAuth(keyId: string, keySecret: string) {
    const raw = `${keyId}:${keySecret}`;
    const encoded = btoa(raw);
    return `Basic ${encoded}`;
}

async function createOrder(request: Request, env: Env) {
    const { ok, origin } = withCors(request, env);
    if (!ok) {
        return new Response("Forbidden", { status: 403 });
    }
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const amount = Number(env.RAZORPAY_AMOUNT_INR_PAISE || "0");
    if (!amount || amount < 100) {
        return jsonResponse({ ok: false, error: "invalid_amount" }, 500, origin);
    }

    const currency = env.RAZORPAY_CURRENCY || DEFAULT_CURRENCY;
    const receiptPrefix = env.RECEIPT_PREFIX || "stacksage";
    const receipt = `${receiptPrefix}_${Date.now()}`;

    const payload = {
        amount,
        currency,
        receipt,
        notes: {
            email: String(body.email || ""),
            company: String(body.company || ""),
            source: "stacksage-website",
        },
    };

    const resp = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: toBasicAuth(env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET),
        },
        body: JSON.stringify(payload),
    });

    if (!resp.ok) {
        const text = await resp.text();
        return jsonResponse({ ok: false, error: "order_failed", details: text }, 502, origin);
    }

    const data = (await resp.json()) as Record<string, unknown>;
    return jsonResponse({ ok: true, order: data }, 200, origin);
}

async function handleWebhook(request: Request, env: Env) {
    const signature = request.headers.get("x-razorpay-signature") || "";
    const rawBody = await request.text();
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(env.RAZORPAY_WEBHOOK_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
    const expected = Array.from(new Uint8Array(mac))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    if (expected !== signature) {
        return new Response("Invalid signature", { status: 401 });
    }

    // TODO: persist fulfillment signal (email/license) in your system
    return new Response("ok", { status: 200 });
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);
        if (request.method === "OPTIONS") {
            return handleOptions(request, env);
        }

        if (request.method === "POST" && url.pathname === "/create-order") {
            return createOrder(request, env);
        }

        if (request.method === "POST" && url.pathname === "/webhook") {
            return handleWebhook(request, env);
        }

        return new Response("Not found", { status: 404 });
    },
};
