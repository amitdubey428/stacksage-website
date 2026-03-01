import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "AWS Trusted Advisor vs StackSage - Complete Comparison",
    description: "Compare AWS Trusted Advisor and StackSage. Trusted Advisor has 56 free checks (482 with Business Support). StackSage provides 40+ checks without requiring AWS support plans.",
    keywords: ["aws trusted advisor alternative", "trusted advisor vs stacksage", "aws cost optimization", "aws well-architected"],
};

export default function TrustedAdvisorComparisonPage() {
    const comparison = [
        {
            feature: "Free Tier Checks",
            trustedAdvisor: "56 checks",
            stacksage: "40+ checks (trial: top 50 findings)",
        },
        {
            feature: "Full Access Requirement",
            trustedAdvisor: "Business Support+ ($100+/month minimum)",
            stacksage: "License-based (no support plan needed)",
        },
        {
            feature: "Total Checks Available",
            trustedAdvisor: "482 checks (with Business Support+)",
            stacksage: "40+ checks + expanding",
        },
        {
            feature: "Deployment Model",
            trustedAdvisor: "AWS Console + API",
            stacksage: "pip install or CI",
        },
        {
            feature: "Authentication",
            trustedAdvisor: "AWS IAM credentials",
            stacksage: "Local creds, SSO profile, or IAM role",
        },
        {
            feature: "Data Privacy",
            trustedAdvisor: "Analyzed by AWS",
            stacksage: "Stays on your machine or CI runner",
        },
        {
            feature: "CloudWatch Metrics",
            trustedAdvisor: "Yes (for some checks)",
            stacksage: "Yes (with evidence grades A-F)",
        },
        {
            feature: "Cost Savings Estimates",
            trustedAdvisor: "Yes",
            stacksage: "Yes (with real-time AWS pricing)",
        },
        {
            feature: "Security Checks",
            trustedAdvisor: "Yes (comprehensive)",
            stacksage: "Yes (16 posture checks)",
        },
        {
            feature: "Remediation Guidance",
            trustedAdvisor: "Recommendations",
            stacksage: "Copy-paste CLI commands",
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
                    <span>AWS Trusted Advisor vs StackSage</span>
                </div>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        AWS Trusted Advisor vs StackSage
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                        <strong>Comprehensive AWS auditing without requiring AWS Business Support.</strong> Get 40+
                        cost and security checks without paying for an AWS support plan.
                    </p>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 border-2 border-orange-200 dark:border-orange-900 rounded-xl bg-orange-50 dark:bg-orange-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            ✅ AWS Trusted Advisor
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Native AWS service</strong> with 56 free checks, 482 total with Business Support+.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Native AWS integration</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>482 checks with Business Support+</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Well-Architected best practices</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Limited free tier (only 56 checks)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Full access requires $100+/month support plan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>No evidence-graded findings</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border-2 border-green-200 dark:border-green-900 rounded-xl bg-green-50 dark:bg-green-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            🔍 StackSage
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Privacy-first audits</strong> — runs on your machine or in CI without AWS support plans.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>No AWS support plan required</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>40+ checks (cost + security)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Evidence grades (A-F) for confidence</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Copy-paste CLI remediation commands</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Fewer total checks than full Trusted Advisor</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>AWS-only (no multi-cloud)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mb-16 p-8 border-2 border-yellow-200 dark:border-yellow-900 rounded-xl bg-yellow-50 dark:bg-yellow-950">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        💰 Cost Consideration
                    </h2>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                        <strong>AWS Trusted Advisor full access requires AWS Business Support or higher:</strong>
                    </p>
                    <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="font-mono text-sm">•</span>
                            <span><strong>Business Support:</strong> Greater of $100/month or 10% of monthly AWS usage</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-mono text-sm">•</span>
                            <span><strong>Enterprise Support:</strong> Greater of $15K/month or 10% of usage (first $150K)</span>
                        </li>
                    </ul>
                    <p className="text-zinc-700 dark:text-zinc-300">
                        <strong>StackSage</strong> provides comprehensive auditing without requiring AWS support plans.
                        CloudWatch API costs are typically under $5/month for comprehensive scans.
                    </p>
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
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">Trusted Advisor</th>
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
                                            {row.trustedAdvisor}
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
                            Choose Trusted Advisor if you:
                        </h3>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Already have AWS Business/Enterprise Support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Want native AWS Console integration</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Need maximum check coverage (482 checks)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Prefer AWS-managed tooling</span>
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
                                <span>Don't want to pay for AWS support plans</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Want privacy-first (data stays on your machine)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Need evidence-graded findings (A-F)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Want copy-paste CLI remediation commands</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Get comprehensive AWS audits without support plans
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                        Try StackSage free to audit your AWS account with 40+ cost and security checks.
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
