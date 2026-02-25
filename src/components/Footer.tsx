import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-zinc-200/60 dark:border-zinc-800">
            <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} StackSage. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.linkedin.com/company/stacksageai/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-indigo-600"
                    >
                        LinkedIn
                    </a>
                    <Link href="/docs/" aria-label="Docs" className="hover:text-indigo-600">Docs</Link>
                    <Link href="/alternatives/" aria-label="Alternatives" className="hover:text-indigo-600">Alternatives</Link>
                    <Link href="/privacy/" aria-label="Privacy" className="hover:text-indigo-600">Privacy</Link>
                    <Link href="/terms/" aria-label="Terms" className="hover:text-indigo-600">Terms</Link>
                    <Link href="/refund-policy/" aria-label="Refund Policy" className="hover:text-indigo-600">Refund Policy</Link>
                </div>
            </div>
        </footer>
    );
}
