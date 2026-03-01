import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Zap, DollarSign } from "lucide-react";

export const metadata: Metadata = {
    title: "StackSage Alternatives - Compare AWS Cost Optimization Tools",
    description: "Compare StackSage with Infracost, AWS Trusted Advisor, CloudHealth, and Komiser. Find the right AWS cost optimization and security audit tool for your needs.",
    keywords: ["stacksage alternative", "infracost alternative", "aws trusted advisor alternative", "cloudhealth alternative", "aws cost optimization tools", "finops tools comparison"],
};

export default function AlternativesPage() {
    const comparisons = [
        {
            name: "StackSage vs Infracost",
            slug: "infracost",
            tagline: "Post-deployment waste detection vs Pre-deployment cost estimation",
            description: "Infracost estimates costs before deployment. StackSage finds waste after deployment. Use both for complete coverage.",
            icon: "📊",
        },
        {
            name: "StackSage vs AWS Trusted Advisor",
            slug: "aws-trusted-advisor",
            tagline: "40+ checks vs Limited free checks",
            description: "Trusted Advisor's free tier has limited checks. StackSage provides comprehensive detection without AWS support plans.",
            icon: "✅",
        },
        {
            name: "StackSage vs CloudHealth",
            slug: "cloudhealth",
            tagline: "Privacy-first GitHub Actions vs Enterprise SaaS Platform",
            description: "CloudHealth is a $10K+/year platform. StackSage runs in your GitHub Actions with zero external data transmission.",
            icon: "🔒",
        },
        {
            name: "StackSage vs Komiser",
            slug: "komiser",
            tagline: "Report artifacts vs Dashboard infrastructure",
            description: "Komiser requires hosting a dashboard. StackSage generates report artifacts with no infrastructure to maintain.",
            icon: "📦",
        },
    ];

    const features = [
        {
            title: "Privacy-First",
            description: "Your AWS data never leaves your GitHub Actions runner",
            icon: <Shield className="h-6 w-6" />,
        },
        {
            title: "Zero Infrastructure",
            description: "No servers to run, no databases to maintain",
            icon: <Zap className="h-6 w-6" />,
        },
        {
            title: "Evidence-Based",
            description: "Every finding includes CloudWatch metrics and confidence grades",
            icon: <CheckCircle className="h-6 w-6" />,
        },
        {
            title: "Cost-Effective",
            description: "No SaaS fees, only minimal CloudWatch API costs",
            icon: <DollarSign className="h-6 w-6" />,
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Hero Section */}
            <div className="mx-auto max-w-6xl px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        Compare StackSage with Alternatives
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8">
                        Find the right AWS cost optimization and security audit tool for your needs.
                        See how StackSage compares with other popular solutions.
                    </p>
                </div>

                {/* Key Differentiators */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900"
                        >
                            <div className="text-blue-600 dark:text-blue-400 mb-3">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {comparisons.map((comparison) => (
                        <Link
                            key={comparison.slug}
                            href={`/alternatives/${comparison.slug}/`}
                            className="group p-8 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all bg-white dark:bg-zinc-900"
                        >
                            <div className="text-4xl mb-4">{comparison.icon}</div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {comparison.name}
                            </h2>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                                {comparison.tagline}
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                                {comparison.description}
                            </p>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                                See detailed comparison
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center p-12 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Try StackSage Free
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                        Start finding idle AWS resources and security issues in under 5 minutes.
                        No credit card required.
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
