"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    title: string;
    href?: string;
    items?: NavItem[];
}

const navigation: NavItem[] = [
    {
        title: "Getting Started",
        items: [
            { title: "Quick Start", href: "/docs/quick-start" },
            { title: "Installation", href: "/docs/installation" },
            { title: "GitHub Actions Setup", href: "/docs/github-actions" },
        ],
    },
    {
        title: "Configuration",
        items: [
            { title: "Overview", href: "/docs/configuration" },
            { title: "Exclusions & Filters", href: "/docs/exclusions" },
            { title: "Custom Thresholds", href: "/docs/thresholds" },
            { title: "Tag Governance", href: "/docs/tag-governance" },
        ],
    },
    {
        title: "Security",
        items: [
            { title: "IAM Policy Setup", href: "/docs/iam-policy" },
            { title: "Privacy & Data Handling", href: "/docs/privacy" },
            { title: "Security Best Practices", href: "/docs/security" },
        ],
    },
    {
        title: "Detectors",
        items: [
            { title: "All Detectors", href: "/docs/detectors" },
            { title: "Compute", href: "/docs/detectors/compute" },
            { title: "Storage", href: "/docs/detectors/storage" },
            { title: "Database", href: "/docs/detectors/database" },
            { title: "Network", href: "/docs/detectors/network" },
        ],
    },
    {
        title: "Reference",
        items: [
            { title: "CLI Reference", href: "/docs/cli-reference" },
            { title: "Report Format", href: "/docs/report-format" },
            { title: "Troubleshooting", href: "/docs/troubleshooting" },
        ],
    },
];

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
    const [isOpen, setIsOpen] = useState(
        item.items?.some((child) => pathname === child.href) ?? false
    );

    const hasActiveChild = item.items?.some((child) => pathname === child.href);

    return (
        <div className="mb-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    hasActiveChild
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                )}
            >
                <span>{item.title}</span>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>
            {isOpen && item.items && (
                <div className="ml-3 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-3">
                    {item.items.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href!}
                            className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-colors",
                                pathname === child.href
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                            )}
                        >
                            {child.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="relative flex min-h-screen">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zinc-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-zinc-200 bg-white transition-transform duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 lg:static lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800 lg:justify-center">
                        <Link href="/" className="text-lg font-bold">
                            StackSage
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <NavGroup key={item.title} item={item} pathname={pathname} />
                            ))}
                        </div>
                    </nav>
                    <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Version 0.3.0
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                {/* Mobile header */}
                <header className="sticky top-0 z-30 flex h-16 items-center border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mr-4"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link href="/" className="text-lg font-bold">
                        StackSage
                    </Link>
                </header>

                {/* Page content */}
                <main className="flex-1">
                    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
