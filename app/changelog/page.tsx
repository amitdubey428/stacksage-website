import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Changelog - StackSage",
    description: "StackSage release history — new detectors, features, and improvements shipped over time.",
};

const releases = [
    {
        version: "v0.8.0",
        date: "March 5, 2026",
        badge: "Latest",
        badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
        headline: "Storage & Egress Intelligence",
        summary:
            "Five new detectors targeting the most common invisible cost leaks in S3 and NAT gateways. All are runnable without CloudWatch — no extra IAM permissions required for the offline checks.",
        highlights: [
            "S3 access logging disabled — flags buckets with no server access logs (prerequisite for confident lifecycle decisions)",
            "S3 Intelligent-Tiering not configured — flags buckets missing automatic tier movement for variable workloads",
            "NAT gateway egress cost estimate — quantifies monthly data-processing cost per NAT and cross-references missing VPC endpoints",
            "DynamoDB VPC Gateway endpoint missing — free fix that eliminates DynamoDB traffic through NAT ($0.045/GB)",
            "CloudWatch log groups with no metric filters — large log groups stored but never analysed; corroborates retention findings",
            "NAT idle-gateway detector now active (was imported but previously unhoooked)",
        ],
        detectorCount: "35+",
    },
    {
        version: "v0.7.3",
        date: "March 1, 2026",
        badge: null,
        badgeColor: "",
        headline: "Self-Serve pip Install & Free Tier",
        summary:
            "StackSage goes public on PyPI. Anyone with AWS credentials can run a full cost audit in under five minutes — no Docker, no GitHub Actions required.",
        highlights: [
            "pip install stacksage — single-command install, works with local creds, SSO profiles, or assumed roles",
            "Free tier — top 50 findings delivered without a license; upgrade unlocks the full audit pack",
            "stacksage.yml config — per-project exclusions, thresholds, and tag governance rules",
            "HTML audit report auto-opens in browser with findings, remediation plan, and verification commands",
            "Telemetry opt-in — anonymous ping on first run (finding count + region count only)",
        ],
        detectorCount: "30+",
    },
    {
        version: "v0.6.0",
        date: "February 15, 2026",
        badge: null,
        badgeColor: "",
        headline: "ECS & Fargate Optimization",
        summary: "Architecture-level recommendations for container workloads — migrate EC2-backed ECS to Fargate, and flag non-prod services that qualify for Fargate Spot.",
        highlights: [
            "ECS EC2-backed → Fargate migration opportunities based on service utilization metrics",
            "Fargate Spot recommendations for non-production services (tag/name heuristic)",
            "Scanner: full ECS cluster + service inventory including task CPU/memory enrichment",
        ],
        detectorCount: "28+",
    },
    {
        version: "v0.5.0",
        date: "February 15, 2026",
        badge: null,
        badgeColor: "",
        headline: "Serverless Architecture Recommendations",
        summary: "Detectors that look beyond right-sizing — recommending serverless migrations where the workload pattern fits.",
        highlights: [
            "EC2 → Lambda + API Gateway migration candidates (CloudWatch CPU heuristic)",
            "Lambda x86_64 → arm64 (Graviton2) — ~20% compute savings with no code changes in most runtimes",
            "RDS → Aurora Serverless v2 candidates for spiky CPU workloads",
        ],
        detectorCount: "25+",
    },
    {
        version: "v0.4.0",
        date: "February 15, 2026",
        badge: null,
        badgeColor: "",
        headline: "30+ Detectors Across 12 AWS Services",
        summary: "Major coverage expansion — DynamoDB, ElastiCache, CloudFront, Route 53, Lambda memory, and more.",
        highlights: [
            "DynamoDB unused tables (zero read/write for 30+ days)",
            "Lambda memory overprovisioning (< 30% memory utilization)",
            "CloudFront zero-traffic distributions",
            "Route 53 unused hosted zones (zero queries for 90+ days)",
            "ElastiCache idle clusters",
        ],
        detectorCount: "30+",
    },
    {
        version: "v0.3.0",
        date: "February 3, 2026",
        badge: null,
        badgeColor: "",
        headline: "Configuration, Docs Site & GitHub Actions",
        summary: "First customer-facing configuration system and the launch of stacksageai.com/docs.",
        highlights: [
            "stacksage.yml — exclude resources by ID, tag, region, or detector type; customize thresholds",
            "GitHub Actions integration — run audits on a schedule or on push with zero local setup",
            "EBS performance over-provisioning (gp3/io1/io2 with CloudWatch metrics)",
            "Load balancer empty target groups (ALB/NLB with no registered targets)",
            "Cost guardrails — detect missing AWS Budgets and Cost Anomaly Detection",
            "Docs site launched at stacksageai.com/docs",
        ],
        detectorCount: "20+",
    },
    {
        version: "v0.2.0",
        date: "January 19, 2026",
        badge: null,
        badgeColor: "",
        headline: "Security Posture Checks",
        summary: "Beyond cost — StackSage now surfaces IAM, exposure, and audit-logging gaps alongside waste findings.",
        highlights: [
            "IAM baseline checks (unused roles, overly permissive policies)",
            "Exposure checks (public S3, unencrypted EBS, unencrypted RDS)",
            "Audit logging baseline (CloudTrail, CloudWatch, GuardDuty, Security Hub)",
            "Summary report artifact (summary.md) alongside HTML and CSV",
        ],
        detectorCount: "15+",
    },
    {
        version: "v0.1.0",
        date: "January 2026",
        badge: "Initial Release",
        badgeColor: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
        headline: "First Working Audit",
        summary: "Core EC2, EBS, RDS, S3, NAT, and EIP waste detection. Docker-based, designed for internal use and early pilots.",
        highlights: [
            "EC2 idle instances (CPU < 5% over 14 days)",
            "EBS unattached volumes and oversized snapshots",
            "RDS idle and oversized instances",
            "S3 lifecycle missing and versioning cost checks",
            "NAT gateway idle detection and missing VPC S3 endpoint",
            "HTML report with per-finding remediation commands and estimated savings",
        ],
        detectorCount: "12+",
    },
];

export default function ChangelogPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <div className="mb-14">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Changelog</h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
                    What&apos;s shipped in StackSage — new detectors, capabilities, and improvements.
                </p>
            </div>

            <div className="relative">
                {/* vertical timeline line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />

                <div className="space-y-14">
                    {releases.map((release) => (
                        <div key={release.version} className="relative pl-10">
                            {/* dot */}
                            <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-950 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{release.version}</span>
                                {release.badge && (
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${release.badgeColor}`}>
                                        {release.badge}
                                    </span>
                                )}
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">{release.date}</span>
                                <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                                    {release.detectorCount} detectors
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{release.headline}</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{release.summary}</p>

                            <ul className="space-y-1.5">
                                {release.highlights.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                        <span className="mt-1 shrink-0 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Want to request a feature or report a bug?
                </p>
                <a
                    href="https://github.com/amitdubey428/stacksage-ai-stacksage-community/issues"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                    Open an issue on GitHub →
                </a>
            </div>
        </div>
    );
}
