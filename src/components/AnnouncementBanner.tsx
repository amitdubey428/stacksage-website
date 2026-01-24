"use client";
import React from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBanner() {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
            <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="flex items-center justify-center gap-3 text-center pr-8 sm:pr-0">
                    <span className="text-sm sm:text-base font-medium">
                        Run an AWS waste & hygiene audit in your GitHub Actions runner —
                        <span className="font-semibold ml-1">no SaaS ingestion of AWS credentials</span>
                    </span>
                    <Link
                        href="/demo-report/"
                        className="ml-2 inline-flex items-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                        View Sample Report →
                    </Link>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Dismiss banner"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
