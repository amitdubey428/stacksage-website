import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sample Audit Report — StackSage",
    description: "View a sample StackSage audit report (HTML) and see the JSON/CSV-style findings output format.",
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
                        Sample Audit Report
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        This page shows the format you’ll receive from a StackSage run: an HTML report plus machine-readable findings (JSON/CSV).
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
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
                    <iframe
                        src="/demo/audit_report.html"
                        className="w-full"
                        style={{ height: "calc(100vh - 250px)", minHeight: "600px" }}
                        title="StackSage Sample Audit Report"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>

                <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>
                        Your actual report is generated in your GitHub Actions runner.
                        Optional enrichments include CloudWatch utilization and Cost Explorer historical spend breakdown (if you enable permissions).
                    </p>
                </div>
            </div>
        </div>
    );
}
