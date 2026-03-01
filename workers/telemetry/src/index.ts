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
 * Deploy (sets up worker + custom domain in one step):
 *   cd workers/telemetry
 *   npm install
 *   wrangler deploy
 *
 * View logs (Workers Observability):
 *   Cloudflare Dashboard → Workers & Pages → stacksage-telemetry → Logs
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
            console.log(`[telemetry] rejected: ${request.method} ${url.pathname}`);
            return new Response("Not Found", { status: 404 });
        }

        // Validate User-Agent — only accept pings from the CLI
        const ua = request.headers.get("User-Agent") ?? "";
        if (!ua.startsWith(env.ALLOWED_USER_AGENT_PREFIX)) {
            console.warn(`[telemetry] forbidden user-agent: "${ua}"`);
            return new Response("Forbidden", { status: 403 });
        }

        // Parse and validate payload
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            console.warn("[telemetry] bad request: invalid JSON");
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
            console.warn("[telemetry] bad request: unexpected shape", JSON.stringify(payload));
            return new Response("Bad Request: unexpected payload shape", { status: 400 });
        }

        // Write to Analytics Engine — two doubles, no blobs, no indexes
        // (no identifiable data stored at all)
        try {
            // indexes must be a single-element array or omitted (CF limitation).
            // doubles[0] = findings_count, doubles[1] = aws_region_count
            env.ANALYTICS.writeDataPoint({
                doubles: [findings_count, aws_region_count],
            });
            console.log(
                `[telemetry] ping recorded: findings=${findings_count} regions=${aws_region_count}`
            );
        } catch (e) {
            // Non-fatal — log for observability but still return 200 to the CLI
            console.error("[telemetry] analytics write failed:", e);
        }

        return new Response("ok", { status: 200 });
    },
};
