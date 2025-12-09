"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
    const [open, setOpen] = React.useState(false);
    const [clicks, setClicks] = React.useState(0);
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:supports-[backdrop-filter]:bg-black/40 dark:bg-black/60 border-b border-zinc-200/60 dark:border-zinc-800">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="#" className="font-bold tracking-tight relative inline-block group" onClick={() => setClicks((c) => c + 1)}>
                    <span className="block">StackSage</span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute left-0 top-0 w-full h-full mix-blend-difference" style={{ clipPath: "inset(0 0 80% 0)" }}>StackSage</span>
                        <span className="absolute left-0 top-0 w-full h-full mix-blend-difference" style={{ clipPath: "inset(80% 0 0 0)" }}>StackSage</span>
                    </span>
                    <span className="sr-only">Home</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <a href="#features" className="hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">Features</a>
                    <a href="#how-it-works" className="hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">How it works</a>
                    <a href="#pricing" className="hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">Pricing</a>
                    <a href="#demo" className="hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1">Demo</a>
                    <Button asChild>
                        <a href="#demo" aria-label="Get Your Free Audit">Get Your Free Audit</a>
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
                        <a className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="#features">Features</a>
                        <a className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="#how-it-works">How it works</a>
                        <a className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="#pricing">Pricing</a>
                        <a className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 rounded-md px-1" href="#demo">Demo</a>
                        <Button asChild>
                            <a href="#demo" aria-label="Get Your Free Audit">Get Your Free Audit</a>
                        </Button>
                    </div>
                </div>
            )}
            <span className="sr-only">Easter egg clicks: {clicks}</span>
        </nav>
    );
}
