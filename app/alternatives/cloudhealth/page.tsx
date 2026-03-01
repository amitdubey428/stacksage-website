import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "CloudHealth vs StackSage - Enterprise FinOps Platform vs Privacy-First Audit Tool",
    description: "Compare CloudHealth/Flexera and StackSage. CloudHealth is a $10K+/year enterprise SaaS platform. StackSage runs on your machine or in CI with zero external data transmission.",
    keywords: ["cloudhealth alternative", "flexera alternative", "finops tools", "aws cost management", "cloudhealth vs stacksage"],
};

export default function CloudHealthComparisonPage() {
    const comparison = [
        {
            feature: "Deployment Model",
            cloudhealth: "Multi-tenant SaaS platform",
            stacksage: "pip install or CI",
        },
        {
            feature: "Data Privacy",
            cloudhealth: "Data sent to Flexera servers",
            stacksage: "Data stays on your machine or CI runner",
        },
        {
            feature: "Pricing",
            cloudhealth: "$10,000+ /year minimum",
            stacksage: "License-based (no per-user fees)",
        },
        {
            feature: "Target Customer",
            cloudhealth: "Enterprise organizations",
            stacksage: "Startups to enterprise",
        },
        {
            feature: "Setup Time",
            cloudhealth: "Days to weeks (onboarding required)",
            stacksage: "Under 5 minutes",
        },
        {
            feature: "Cloud Support",
            cloudhealth: "AWS, Azure, GCP, multi-cloud",
            stacksage: "AWS (Azure, GCP on roadmap)",
        },
        {
            feature: "Cost Optimization",
            cloudhealth: "Yes (extensive)",
            stacksage: "Yes (40+ checks)",
        },
        {
            feature: "Security Posture",
            cloudhealth: "Yes",
            stacksage: "Yes (16+ posture checks)",
        },
        {
            feature: "Evidence Grading",
            cloudhealth: "No",
            stacksage: "Yes (A-F confidence grades)",
        },
        {
            feature: "Infrastructure Required",
            cloudhealth: "None (SaaS)",
            stacksage: "None (runs locally or in CI)",
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
                    <span>CloudHealth vs StackSage</span>
                </div>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        CloudHealth vs StackSage
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                        <strong>Enterprise SaaS vs Privacy-First Audits.</strong> CloudHealth is a $10K+/year platform.
                        StackSage runs on your machine or in CI with zero external data transmission.
                    </p>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 border-2 border-purple-200 dark:border-purple-900 rounded-xl bg-purple-50 dark:bg-purple-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            🏢 CloudHealth (Flexera)
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Enterprise FinOps platform</strong> with multi-cloud support and extensive features.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Comprehensive multi-cloud support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Advanced cost allocation & chargeback</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Policy automation & governance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Managed SaaS (no infrastructure)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>$10,000+/year minimum commitment</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Data sent to external servers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Complex onboarding process</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border-2 border-green-200 dark:border-green-900 rounded-xl bg-green-50 dark:bg-green-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            🔍 StackSage
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Privacy-first audits</strong> — runs on your machine or in CI, nothing shared.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Zero external data transmission</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>5-minute setup (no onboarding)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Evidence-graded findings (A-F)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Significantly lower cost</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>AWS only (for now)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>No multi-cloud cost allocation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Fewer enterprise governance features</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mb-16 p-8 border-2 border-yellow-200 dark:border-yellow-900 rounded-xl bg-yellow-50 dark:bg-yellow-950">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        💰 Cost Comparison
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">CloudHealth</h3>
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li>• Enterprise pricing starts at $10,000+/year</li>
                                <li>• Typically 3% of cloud spend (negotiable)</li>
                                <li>• Multi-year contracts common</li>
                                <li>• Sales process required</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">StackSage</h3>
                            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                                <li>• License-based pricing</li>
                                <li>• No percentage of cloud spend</li>
                                <li>• CloudWatch API costs: ~$5/month</li>
                                <li>• Self-serve trial available</li>
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
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">CloudHealth</th>
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
                                            {row.cloudhealth}
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
                            Choose CloudHealth if you:
                        </h3>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Need multi-cloud cost management</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Require advanced chargeback/showback</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Have enterprise FinOps team & budget</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Want managed SaaS platform</span>
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
                                <span>Want privacy-first (no SaaS data transmission)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Need fast setup (&lt;5 minutes)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Are AWS-focused (for now)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Want significantly lower costs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Get started without enterprise pricing
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                        Try StackSage free to audit your AWS account with privacy-first architecture.
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
