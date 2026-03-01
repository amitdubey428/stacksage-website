/**
 * StackSage Telemetry Worker
 *
 * Receives anonymous usage pings from `stacksage scan`.
 * Accepts ONLY: { findings_count: number, aws_region_count: number }
 *
 * No IPs, no account IDs, no resource IDs are stored.
 * Analytics Engine stores two doubles per ping — that's it.
 *
 * Endpoint: POST https://telemetry.stacksageai.com/v1/ping
 *
 * Deploy:
 *   cd workers/telemetry
 *   wrangler deploy
 *
 * Add custom domain in Cloudflare Dashboard:
 *   Workers & Pages → stacksage-telemetry → Settings → Domains & Routes
 *   → Add Custom Domain → telemetry.stacksageai.com
 *   (requires stacksageai.com to be on Cloudflare nameservers)
 */

export interface Env {
    ANALYTICS: AnalyticsEngineDataset;
    ALLOWED_USER_AGENT_PREFIX: string;
}

interface PingPayload {
    findings_count: number;
    aws_region_count: number;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // Only POST to /v1/ping
        const url = new URL(request.url);
        if (request.method !== "POST" || url.pathname !== "/v1/ping") {
            return new Response("Not Found", { status: 404 });
        }

        // Validate User-Agent — only accept pings from the CLI
        const ua = request.headers.get("User-Agent") ?? "";
        if (!ua.startsWith(env.ALLOWED_USER_AGENT_PREFIX)) {
            return new Response("Forbidden", { status: 403 });
        }

        // Parse and validate payload
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return new Response("Bad Request: invalid JSON", { status: 400 });
        }

        const payload = body as Partial<PingPayload>;
        const findings_count = payload.findings_count;
        const aws_region_count = payload.aws_region_count;

        // Strict validation — reject unexpected shapes or extra keys
        if (
            typeof findings_count !== "number" ||
            typeof aws_region_count !== "number" ||
            findings_count < 0 ||
            aws_region_count < 0 ||
            findings_count > 100_000 || // sanity cap
            aws_region_count > 30 ||    // AWS has ~30 regions
            Object.keys(payload as object).length !== 2
        ) {
            return new Response("Bad Request: unexpected payload shape", { status: 400 });
        }

        // Write to Analytics Engine — two doubles, no blobs, no indexes
        // (no identifiable data stored at all)
        env.ANALYTICS.writeDataPoint({
            doubles: [findings_count, aws_region_count],
            blobs: [],
            indexes: [],
        });

        return new Response("ok", { status: 200 });
    },
};
