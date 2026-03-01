import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Settings, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Documentation - StackSage",
    description: "Complete documentation for StackSage AWS audit tool",
};

export default function DocsPage() {
    const sections = [
        {
            title: "Getting Started",
            icon: <Zap className="h-6 w-6" />,
            links: [
                { href: "/docs/quick-start", label: "Quick Start" },
                { href: "/docs/licensing", label: "Licensing & Trial" },
                { href: "/walkthrough", label: "60‑second Walkthrough" },
                { href: "/demo-report", label: "Sample Audit Pack" },
            ],
        },
        {
            title: "Configuration",
            icon: <Settings className="h-6 w-6" />,
            links: [
                { href: "/docs/configuration", label: "Configuration" },
                { href: "/docs/exclusions", label: "Exclusions & Filters" },
                { href: "/docs/thresholds", label: "Custom Thresholds" },
                { href: "/docs/tag-governance", label: "Tag Governance" },
                { href: "/docs/cli-reference", label: "CLI Reference" },
            ],
        },
        {
            title: "Security",
            icon: <Shield className="h-6 w-6" />,
            links: [
                { href: "/docs/iam-policy", label: "IAM Policy Setup" },
                { href: "/docs/privacy", label: "Privacy & Data Handling" },
                { href: "/privacy-access", label: "Privacy Access (Data & Permissions)" },
            ],
        },
        {
            title: "Reference",
            icon: <BookOpen className="h-6 w-6" />,
            links: [
                { href: "/docs/detectors", label: "All Detectors" },
                { href: "/docs/troubleshooting", label: "Troubleshooting" },
                { href: "/spend-movers", label: "Spend Movers Guide" },
            ],
        },
    ];

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Documentation</h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
                    Everything you need to know about setting up and using StackSage for AWS cost optimization and security auditing.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section) => (
                    <div
                        key={section.title}
                        className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-blue-600 dark:text-blue-400">{section.icon}</div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{section.title}</h2>
                        </div>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center justify-between group text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Need Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/demo-report/"
                        className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
                    >
                        <div className="font-medium mb-1 text-zinc-900 dark:text-zinc-100">Demo Report</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">See what the output looks like</div>
                    </a>
                    <a
                        href="/#faq"
                        className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
                    >
                        <div className="font-medium mb-1 text-zinc-900 dark:text-zinc-100">FAQ</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">Common questions answered</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
