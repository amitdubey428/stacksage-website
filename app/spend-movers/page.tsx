import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Spend Movers Guide — StackSage",
    description:
        "How to interpret Cost Explorer spend movers in StackSage reports, with examples and next steps.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
        </section>
    );
}

export default function SpendMoversPage() {
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
                        href="/docs"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Documentation
                    </Link>
                </div>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Spend Movers Guide</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    Spend movers highlight <strong>period-over-period changes</strong> in AWS spend, grouped by service and
                    region. They are powered by Cost Explorer aggregates (no line-item data).
                </p>

                <Section title="What you’re seeing">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Total change</strong>: the overall delta between the current and previous windows.
                        </li>
                        <li>
                            <strong>Top increases/decreases</strong>: the biggest movers by service and region.
                        </li>
                        <li>
                            <strong>New spend</strong>: a service/region that had zero in the previous window.
                        </li>
                        <li>
                            <strong>Stopped spend</strong>: a service/region that dropped to zero in the current window.
                        </li>
                    </ul>
                </Section>

                <Section title="How to interpret movers">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            Start with the <strong>largest increases</strong> and confirm whether they are expected changes
                            (deploys, traffic spikes, feature launches, backups).
                        </li>
                        <li>
                            Investigate <strong>new spend</strong> entries for accidental enablement or new services.
                        </li>
                        <li>
                            Validate <strong>decreases</strong> to ensure they align with a planned shutdown or
                            optimization.
                        </li>
                        <li>
                            Use the findings list to connect spikes to specific resources (e.g., NAT gateways, idle
                            ELBs, overprovisioned RDS).
                        </li>
                    </ol>
                </Section>

                <Section title="Common root causes">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>New workloads or environments (preview/staging/DR).</li>
                        <li>Traffic spikes (marketing campaigns, incident load).</li>
                        <li>Service configuration changes (log retention, backup cadence).</li>
                        <li>One-off activities (data migrations, large exports/imports).</li>
                    </ul>
                </Section>

                <Section title="Privacy & data scope">
                    <p>
                        Spend movers use Cost Explorer <strong>aggregate totals only</strong> and never pull line-item
                        billing data. Output is a small table of deltas by service and region.
                    </p>
                </Section>

                <Section title="Next steps">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Confirm Cost Explorer is enabled in your IAM policy.</li>
                        <li>Review top mover rows in the HTML report.</li>
                        <li>Re-run the audit after remediation to verify the delta shrinks.</li>
                    </ul>
                </Section>
            </div>
        </div>
    );
}
