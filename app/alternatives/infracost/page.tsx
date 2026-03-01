import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle, Minus } from "lucide-react";

export const metadata: Metadata = {
    title: "Infracost vs StackSage - Which AWS Cost Tool Should You Use?",
    description: "Compare Infracost and StackSage for AWS cost optimization. Infracost estimates pre-deployment costs. StackSage detects post-deployment waste. Use both for complete coverage.",
    keywords: ["infracost alternative", "infracost vs stacksage", "aws cost estimation", "aws cost optimization", "terraform cost estimation"],
};

export default function InfracostComparisonPage() {
    const comparison = [
        {
            feature: "Deployment Stage",
            infracost: "Pre-deployment (IaC review)",
            stacksage: "Post-deployment (live resources)",
        },
        {
            feature: "Primary Use Case",
            infracost: "Estimate costs before deploying",
            stacksage: "Find waste after deployment",
        },
        {
            feature: "Data Source",
            infracost: "Terraform/CloudFormation code",
            stacksage: "AWS APIs + CloudWatch metrics",
        },
        {
            feature: "Authentication",
            infracost: "No cloud credentials needed",
            stacksage: "Local creds, SSO profile, or IAM role",
        },
        {
            feature: "Deployment Model",
            infracost: "SaaS platform + CLI",
            stacksage: "pip install or CI",
        },
        {
            feature: "Pricing",
            infracost: "Free tier + paid plans",
            stacksage: "License-based",
        },
        {
            feature: "Supported IaC",
            infracost: "Terraform, Terragrunt, CloudFormation, CDK",
            stacksage: "N/A (scans live infrastructure)",
        },
        {
            feature: "Idle Resource Detection",
            infracost: "No (pre-deployment only)",
            stacksage: "Yes (CloudWatch-based)",
        },
        {
            feature: "Security Posture Checks",
            infracost: "No",
            stacksage: "Yes (16 posture checks)",
        },
        {
            feature: "Evidence Grading",
            infracost: "N/A",
            stacksage: "A-F grades based on metric confidence",
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
                    <span>Infracost vs StackSage</span>
                </div>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        Infracost vs StackSage
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                        <strong>Different stages of the cost optimization lifecycle.</strong> Infracost estimates costs
                        before deployment. StackSage detects waste after deployment. They complement each other.
                    </p>
                </div>

                {/* Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            📊 Infracost
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Pre-deployment cost estimation</strong> integrated into CI/CD pipelines.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Shows cost impact in pull requests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Policy enforcement before deployment</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>No cloud credentials required</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Cannot detect idle resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>No security posture checks</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border-2 border-green-200 dark:border-green-900 rounded-xl bg-green-50 dark:bg-green-950">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            🔍 StackSage
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                            <strong>Post-deployment waste detection</strong> — runs on your machine or in CI.
                        </p>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Detects idle/oversized live resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>CloudWatch metric-based evidence</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Security posture scorecard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Cannot estimate pre-deployment costs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Requires AWS read-only permissions</span>
                            </li>
                        </ul>
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
                                    <th className="text-left p-4 text-zinc-900 dark:text-zinc-100 font-semibold">Infracost</th>
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
                                            {row.infracost}
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

                {/* Use Both */}
                <div className="mb-16 p-8 border-2 border-purple-200 dark:border-purple-900 rounded-xl bg-purple-50 dark:bg-purple-950">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        💡 Best Practice: Use Both Together
                    </h2>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                        Infracost and StackSage solve different problems in the cost optimization lifecycle:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-3">
                            <div className="text-2xl">1️⃣</div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Before Deployment</h3>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                    Use <strong>Infracost</strong> in pull requests to estimate costs and enforce policies
                                    before resources are created.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-2xl">2️⃣</div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">After Deployment</h3>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                    Use <strong>StackSage</strong> weekly to find resources that became idle,
                                    oversized, or misconfigured over time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* When to Choose */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Choose Infracost if you:
                        </h3>
                        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Manage infrastructure with Terraform/CloudFormation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Want cost visibility in pull requests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Need budget guardrails before deployment</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Don't want to share cloud credentials</span>
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
                                <span>Need to find idle/oversized live resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Want CloudWatch metric-based evidence</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Require security posture checks</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Prefer privacy-first (no SaaS data transmission)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Ready to find AWS waste?
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                        Try StackSage free to detect idle resources and security issues in your AWS account.
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
