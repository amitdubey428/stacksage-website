import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sample Audit Report — StackSage",
    description: "See a real example of StackSage's AWS cost optimization audit report with actionable insights and savings recommendations.",
};

export default function DemoReportPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-6">
                    <a 
                        href="/" 
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        ← Back to Home
                    </a>
                </div>
                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        Sample Audit Report
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        This is a real example of what you'll receive after connecting your AWS account. 
                        We've identified $352.80 in monthly savings opportunities across 15 issues.
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
                        <a 
                            href="/#demo"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-11 px-5 text-base active:scale-[0.98]"
                        >
                            Get Your Own Audit
                        </a>
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
                        This report is based on a sample AWS account. Your actual report will be customized 
                        to your infrastructure with real metrics from CloudWatch and Cost Explorer.
                    </p>
                </div>
            </div>
        </div>
    );
}
