import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy & Access — StackSage",
    description: "Exactly what StackSage reads from AWS, what it outputs, and what is opt-in.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
        </section>
    );
}

function Table({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-black/20">
            <table className="w-full text-left text-sm">{children}</table>
        </div>
    );
}

export default function PrivacyAccessPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        ← Back to Home
                    </Link>
                    <span className="text-sm text-zinc-400">/</span>
                    <Link
                        href="/privacy"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Privacy
                    </Link>
                </div>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Privacy &amp; Access</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    This page explains exactly what StackSage reads from AWS, what ends up in your outputs, and what is opt-in.
                    StackSage is privacy-first by default: it runs inside your GitHub Actions runner and does not ingest AWS
                    credentials into a hosted SaaS.
                </p>

                <Section title="Data flow (high level)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Run the StackSage workflow (or run locally).</li>
                        <li>Assume a customer-controlled read-only role (STS AssumeRole).</li>
                        <li>Read resource metadata and (optional) aggregate metrics / spend totals.</li>
                        <li>
                            Produce local artifacts (HTML report + JSON/CSV findings) as workflow artifacts under your control.
                        </li>
                    </ol>
                </Section>

                <Section title="Privacy guardrails">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>No application payloads are accessed.</li>
                        <li>No S3 object contents or object keys are accessed.</li>
                        <li>
                            CloudWatch utilization (when enabled) uses aggregate statistics only (e.g., Average over a lookback
                            window) with a bounded query budget.
                        </li>
                        <li>Cost Explorer (when enabled) uses spend totals only (grouped by service and region).</li>
                    </ul>
                </Section>

                <Section title="Opt-ins (explicit)">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Cost Explorer</span> (historical spend)
                            — requires <span className="font-mono">ce:GetCostAndUsage</span>.
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">AWS Pricing API</span> (public catalog metadata)
                            — requires <span className="font-mono">pricing:GetProducts</span>.
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tagging compliance checks</span> — may surface tag values;
                            keep this opt-in to reduce noise.
                        </li>
                    </ul>
                </Section>

                <Section title="What we output (and what we avoid)">
                    <p>
                        Outputs typically include resource identifiers needed for actionability (instance IDs, volume IDs, etc.), regions/AZs,
                        estimated monthly cost and savings, and evidence/provenance (for example: whether CloudWatch/Cost Explorer were enabled,
                        and per-metric status like measured/no data/access denied/skipped).
                    </p>
                    <p>
                        We avoid collecting secrets/credentials, S3 object names/keys or contents, and CloudWatch Logs event payloads.
                    </p>
                </Section>

                <Section title="Permissions matrix (by feature)">
                    <p>
                        This is a representative set of read-only APIs used for common checks. Exact usage can vary by enabled features.
                    </p>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Core inventory (default)</h3>
                    <Table>
                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/40">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Feature</th>
                                <th className="px-4 py-3 font-semibold">AWS API(s)</th>
                                <th className="px-4 py-3 font-semibold">What we read</th>
                                <th className="px-4 py-3 font-semibold">What appears in outputs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
                            <tr>
                                <td className="px-4 py-3">Region discovery</td>
                                <td className="px-4 py-3 font-mono">ec2:DescribeRegions</td>
                                <td className="px-4 py-3">Enabled regions list</td>
                                <td className="px-4 py-3">Regions scanned</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">EC2 inventory</td>
                                <td className="px-4 py-3 font-mono">ec2:DescribeInstances</td>
                                <td className="px-4 py-3">Instance metadata (type/state/tags if present)</td>
                                <td className="px-4 py-3">Instance IDs + type/state + region in findings</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">EBS inventory</td>
                                <td className="px-4 py-3 font-mono">ec2:DescribeVolumes</td>
                                <td className="px-4 py-3">Volume metadata (size/type/attachments/tags)</td>
                                <td className="px-4 py-3">Volume IDs + size/type/region in findings</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">Snapshot inventory</td>
                                <td className="px-4 py-3 font-mono">ec2:DescribeSnapshots</td>
                                <td className="px-4 py-3">Snapshot metadata (size/start time/tags)</td>
                                <td className="px-4 py-3">Snapshot IDs + age/size/region in findings</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">S3 inventory (minimal)</td>
                                <td className="px-4 py-3 font-mono">s3:ListAllMyBuckets, s3:GetBucketLocation</td>
                                <td className="px-4 py-3">Bucket list + region</td>
                                <td className="px-4 py-3">Bucket names + region in findings</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">RDS inventory</td>
                                <td className="px-4 py-3 font-mono">rds:DescribeDBInstances</td>
                                <td className="px-4 py-3">DB metadata (class/engine/status/VPC)</td>
                                <td className="px-4 py-3">DB identifier/class/region in findings</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h3 className="mt-8 text-base font-semibold text-zinc-900 dark:text-zinc-100">CloudWatch utilization (opt-in)</h3>
                    <Table>
                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/40">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Feature</th>
                                <th className="px-4 py-3 font-semibold">AWS API(s)</th>
                                <th className="px-4 py-3 font-semibold">What we read</th>
                                <th className="px-4 py-3 font-semibold">What appears in outputs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
                            <tr>
                                <td className="px-4 py-3">Utilization metrics</td>
                                <td className="px-4 py-3 font-mono">cloudwatch:GetMetricStatistics</td>
                                <td className="px-4 py-3">Aggregate datapoints (Average)</td>
                                <td className="px-4 py-3">Aggregates + status; provenance + budget counters</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h3 className="mt-8 text-base font-semibold text-zinc-900 dark:text-zinc-100">Cost Explorer (opt-in)</h3>
                    <Table>
                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/40">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Feature</th>
                                <th className="px-4 py-3 font-semibold">AWS API(s)</th>
                                <th className="px-4 py-3 font-semibold">What we read</th>
                                <th className="px-4 py-3 font-semibold">What appears in outputs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
                            <tr>
                                <td className="px-4 py-3">Spend totals</td>
                                <td className="px-4 py-3 font-mono">ce:GetCostAndUsage</td>
                                <td className="px-4 py-3">Service/region totals for a time window</td>
                                <td className="px-4 py-3">Total spend + top services/regions tables</td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>

                <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
                    Questions? Email <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                </p>
            </div>
        </div>
    );
}
