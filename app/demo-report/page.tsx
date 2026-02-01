import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sample Audit Pack — StackSage",
    description:
        "View a sample StackSage audit pack (summary, HTML report, JSON/CSV findings) plus a remediation plan.",
};

export default function DemoReportPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        ← Back to Home
                    </Link>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        Sample Audit Pack
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        This page shows the audit pack you’ll receive from a StackSage run: a one-page summary, an HTML report, and machine-readable findings (JSON/CSV).
                        Paid runs also include a remediation plan.
                        Optional enrichments include Cost Explorer spend totals and spend movers (period-over-period deltas) when permissions are enabled.
                        The report embedded below is a mock demo account.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        <a
                            href="/demo/audit_report.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98]"
                        >
                            Open Full Report in New Tab
                        </a>
                        <Link
                            href="/#demo"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-11 px-5 text-base active:scale-[0.98]"
                        >
                            Get Your Own Audit
                        </Link>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                        <a className="underline" href="/demo/summary.md" target="_blank" rel="noopener noreferrer">
                            Download summary.md
                        </a>
                        <a className="underline" href="/demo/findings.json" target="_blank" rel="noopener noreferrer">
                            Download findings.json
                        </a>
                        <a className="underline" href="/demo/findings.csv" target="_blank" rel="noopener noreferrer">
                            Download findings.csv
                        </a>
                        <a className="underline" href="/demo/remediation_plan.md" target="_blank" rel="noopener noreferrer">
                            Download remediation_plan.md
                        </a>
                        <a className="underline" href="/demo/remediation_plan.json" target="_blank" rel="noopener noreferrer">
                            Download remediation_plan.json
                        </a>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
                    <iframe
                        src="/demo/audit_report.html"
                        className="w-full"
                        style={{ height: "calc(100vh - 250px)", minHeight: "600px" }}
                        title="StackSage Sample Audit Pack"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>

                <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>
                        Your actual report is generated in your GitHub Actions runner.
                        Optional enrichments include CloudWatch utilization, Cost Explorer historical spend breakdown, and spend movers (if you enable permissions).
                    </p>
                    <p className="mt-2">
                        <Link className="underline" href="/spend-movers">Read the Spend Movers Guide →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
