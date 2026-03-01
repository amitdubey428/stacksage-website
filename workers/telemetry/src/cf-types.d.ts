/**
 * Minimal ambient type declarations for Cloudflare Workers APIs
 * used in this worker. These are the canonical shapes from
 * @cloudflare/workers-types — duplicated here so the editor
 * resolves types before `npm install` is run.
 *
 * The installed package (in node_modules) takes precedence at build time.
 */

interface AnalyticsEngineDataPoint {
    indexes?: string[];
    blobs?: (string | null)[];
    doubles?: number[];
}

interface AnalyticsEngineDataset {
    writeDataPoint(event: AnalyticsEngineDataPoint): void;
}
