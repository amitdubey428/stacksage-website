import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Komiser vs StackSage - Dashboard vs Report Artifacts",
    description: "Compare Komiser and StackSage. Komiser is an open-source dashboard requiring infrastructure. StackSage generates report artifacts with zero infrastructure to maintain.",
    keywords: ["komiser alternative", "komiser vs stacksage", "open source cloud cost", "aws cost dashboard"],
};

export default function KomiserComparisonPage() {
    const comparison = [
        {
            feature: "License",
            komiser: "Elastic License 2.0 (ELv2)",
            stacksage: "Commercial license",
        },
        {
            feature: "Deployment Model",
            komiser: "Self-hosted dashboard",
            stacksage: "pip install or CI",
        },
        {
            feature: "Infrastructure Required",
            komiser: "Yes (server + database)",
            stacksage: "None (runs locally or in CI)",
        },
        {
            feature: "Output Format",
            komiser: "Live dashboard",
            stacksage: "HTML/JSON report artifacts",
        },
        {
            feature: "Data Storage",
            komiser: "PostgreSQL/MySQL database",
            stacksage: "Local files or CI artifacts",
        },
        {
            feature: "Authentication",
            komiser: "Cloud credentials in config",
            stacksage: "Local creds, SSO profile, or IAM role",
        },
        {
            feature: "Cloud Support",
            komiser: "AWS, Azure, GCP, Digital Ocean, Civo, +10 more",
            stacksage: "AWS (Azure, GCP on roadmap)",
        },
        {
            feature: "Cost Optimization",
            komiser: "Inventory + basic cost analysis",
            stacksage: "40+ cost + security checks",
        },
        {
            feature: "Evidence Grading",
            komiser: "No",
            stacksage: "Yes (A-F confidence grades)",
        },
        {
            feature: "Security Checks",
            komiser: "Basic security insights",
            stacksage: "16 posture checks with scorecard",
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="mx-auto max-w-6xl px-4 py-16">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
                    <Link href="/alternatives/" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Alternatives
                    </Link>
                    <span className="mx-2">/</span>
                    <span>Komiser vs StackSage</span>
                </div>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        Komiser vs StackSage
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                        <strong>Dashboard vs Report Artifacts.</strong> Komiser requires hosting a dashboard with database.
                        StackSage generates report artifacts with zero infrastructure to maintain.
                    </p>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            💻 Komiser
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Open-source dashboard</strong> for multi-cloud resource inventory and cost analysis.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Elastic License 2.0 (source available)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Multi-cloud support (10+ providers)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Live interactive dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Resource tagging governance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Requires server + database hosting</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Infrastructure maintenance overhead</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>No evidence-graded findings</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border-2 border-green-200 dark:border-green-900 rounded-xl bg-green-50 dark:bg-green-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            📦 StackSage
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Report artifacts</strong> — generated locally or in CI with no infrastructure.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Zero infrastructure required</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>HTML/JSON report artifacts</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Evidence-graded findings (A-F)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>OIDC auth (no access keys)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>AWS only (for now)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Commercial license (not open source)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Reports vs live dashboard</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Infrastructure Comparison */}
                <div className="mb-16 p-8 border-2 border-yellow-200 dark:border-yellow-900 rounded-xl bg-yellow-50 dark:bg-yellow-950">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        🏗️ Infrastructure & Maintenance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Komiser Requires:</h3>
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li>• Server to run Komiser binary</li>
                                <li>• PostgreSQL or MySQL database</li>
                                <li>• Ongoing maintenance & updates</li>
                                <li>• Security patching for server</li>
                                <li>• Database backups & scaling</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">StackSage Requires:</h3>
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li>• Python 3.10+ (already on most machines)</li>
                                <li>• <code>pip install stacksage</code> (one command)</li>
                                <li>• No server infrastructure</li>
                                <li>• No database maintenance</li>
                                <li>• Updates via <code>pip install --upgrade stacksage</code></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">
                        Detailed Feature Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-zinc-200 dark:border-zinc-800">
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">Feature</th>
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">Komiser</th>
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">StackSage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    >
                                        <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">
                                            {row.feature}
                                        </td>
                                        <td className="p-4 text-zinc-700 dark:text-zinc-300">
                                            {row.komiser}
                                        </td>
                                        <td className="p-4 text-zinc-700 dark:text-zinc-300">
                                            {row.stacksage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* When to Choose */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Choose Komiser if you:
                        </h3>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Want a live interactive dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Need multi-cloud support now</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Have infrastructure team to maintain it</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Prefer source-available software</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Choose StackSage if you:
                        </h3>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Want zero infrastructure overhead</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Prefer report artifacts over dashboards</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Need evidence-graded findings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Are AWS-focused (for now)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Start auditing without infrastructure
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                        Try StackSage free to audit your AWS account with zero infrastructure to maintain.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/docs/quick-start/"
                            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/demo-report/"
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                        >
                            View Demo Report
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
