import Link from "next/link";
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
            { title: "Quick Start", href: "/docs/quick-start/" },
            { title: "Licensing & Trial", href: "/docs/licensing/" },
        ],
    },
    {
        title: "Configuration",
        items: [
            { title: "Overview", href: "/docs/configuration/" },
        ],
    },
    {
        title: "Security",
        items: [
            { title: "IAM Policy Setup", href: "/docs/iam-policy/" },
            { title: "Privacy & Data Handling", href: "/docs/privacy/" },
        ],
    },
    {
        title: "Detectors",
        items: [
            { title: "All Detectors", href: "/docs/detectors/" },
        ],
    },
    {
        title: "Reference",
        items: [
            { title: "Troubleshooting", href: "/docs/troubleshooting/" },
        ],
    },
];

function NavGroup({ item }: { item: NavItem }) {
    return (
        <div className="mb-4">
            <div className="px-3 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
            </div>
            {item.items && (
                <div className="ml-3 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-3">
                    {item.items.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href!}
                            className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-colors",
                                "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
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
    return (
        <div className="min-h-screen flex bg-white dark:bg-zinc-950">
            {/* Sidebar - hidden on mobile, visible on desktop */}
            <aside className="hidden lg:flex w-64 shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col">
                    <div className="flex h-16 items-center justify-center border-b border-zinc-200 px-6 dark:border-zinc-800">
                        <Link href="/" className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            StackSage
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <NavGroup key={item.title} item={item} />
                            ))}
                        </div>
                    </nav>
                    <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Version 0.5.0
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-h-screen bg-white dark:bg-zinc-950">
                <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
                    {/* Mobile nav hint */}
                    <div className="lg:hidden mb-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            <Link href="/docs/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                ← Back to Documentation
                            </Link>
                        </p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
