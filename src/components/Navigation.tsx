"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const [clicks, setClicks] = React.useState(0);

    const goToSection = React.useCallback(
        (id: string) => {
            const targetHash = `#${id}`;

            // Navigate to home if needed.
            if (pathname !== "/") {
                router.push(`/${targetHash}`);
            } else {
                // Keep URL in sync without a route change.
                window.history.pushState(null, "", targetHash);
            }

            // Scroll once the element exists (handles route transitions).
            const maxAttempts = 40;
            let attempts = 0;
            const tryScroll = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    return;
                }
                attempts += 1;
                if (attempts < maxAttempts) {
                    window.setTimeout(tryScroll, 50);
                }
            };
            tryScroll();
        },
        [pathname, router]
    );

    const onNavSectionClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setOpen(false);
        goToSection(id);
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 text-zinc-900 dark:supports-[backdrop-filter]:bg-black/40 dark:bg-black/60 dark:text-zinc-100 border-b border-zinc-200/60 dark:border-zinc-800">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-bold tracking-tight relative inline-block group" onClick={() => setClicks((c) => c + 1)}>
                    {/* Base label */}
                    <span className="block">StackSage</span>
                    {/* Glitch layers (show on hover) */}
                    <span aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100">
                        <span className="absolute inset-0 text-indigo-400 mix-blend-screen transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 select-none">StackSage</span>
                        <span className="absolute inset-0 text-pink-400 mix-blend-screen transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5 select-none">StackSage</span>
                    </span>
                    <span className="sr-only">Home</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/#features"
                        onClick={(e) => onNavSectionClick(e, "features")}
                        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                    >
                        Features
                    </Link>
                    <Link
                        href="/#how-it-works"
                        onClick={(e) => onNavSectionClick(e, "how-it-works")}
                        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                    >
                        How it works
                    </Link>
                    <Link href="/walkthrough/" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">Walkthrough</Link>
                    <Link href="/docs/" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">Docs</Link>
                    <Link
                        href="/#pricing"
                        onClick={(e) => onNavSectionClick(e, "pricing")}
                        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/#demo"
                        onClick={(e) => onNavSectionClick(e, "demo")}
                        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                    >
                        Demo
                    </Link>
                    <Button asChild>
                        <Link href="/#demo" onClick={(e) => onNavSectionClick(e, "demo")} aria-label="Get a Demo">Get a Demo</Link>
                    </Button>
                </div>
                <button
                    className={cn("md:hidden", "p-2 rounded-lg border border-zinc-300 dark:border-zinc-700")}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen(!open)}
                >
                    <span className="sr-only">Open menu</span>☰
                </button>
            </div>
            {open && (
                <div id="mobile-menu" className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
                    <div className="px-4 py-3 grid gap-3">
                        <Link
                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                            href="/#features"
                            onClick={(e) => onNavSectionClick(e, "features")}
                        >
                            Features
                        </Link>
                        <Link
                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                            href="/#how-it-works"
                            onClick={(e) => onNavSectionClick(e, "how-it-works")}
                        >
                            How it works
                        </Link>
                        <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="/walkthrough/" onClick={() => setOpen(false)}>
                            Walkthrough
                        </Link>
                        <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="/docs/">Docs</Link>
                        <Link
                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                            href="/#pricing"
                            onClick={(e) => onNavSectionClick(e, "pricing")}
                        >
                            Pricing
                        </Link>
                        <Link
                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1"
                            href="/#demo"
                            onClick={(e) => onNavSectionClick(e, "demo")}
                        >
                            Demo
                        </Link>
                        <Button asChild>
                            <Link href="/#demo" onClick={(e) => onNavSectionClick(e, "demo")} aria-label="Get a Demo">Get a Demo</Link>
                        </Button>
                    </div>
                </div>
            )}
            <span className="sr-only">Easter egg clicks: {clicks}</span>
        </nav>
    );
}
