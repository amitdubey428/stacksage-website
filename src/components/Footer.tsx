import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-zinc-200/60 dark:border-zinc-800">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 md:text-left">© {new Date().getFullYear()} StackSage. All rights reserved.</p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 md:justify-end">
                    <a
                        href="https://github.com/amitdubey428/stacksage-ai-stacksage-community/issues"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Community"
                        className="hover:text-indigo-600"
                    >
                        Community
                    </a>
                    <a
                        href="https://pypi.org/project/stacksage/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="PyPI"
                        className="hover:text-indigo-600"
                    >
                        PyPI
                    </a>
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
                    <Link href="/changelog/" aria-label="Changelog" className="hover:text-indigo-600">Changelog</Link>
                    <Link href="/alternatives/" aria-label="Alternatives" className="hover:text-indigo-600">Alternatives</Link>
                    <Link href="/privacy/" aria-label="Privacy" className="hover:text-indigo-600">Privacy</Link>
                    <Link href="/terms/" aria-label="Terms" className="hover:text-indigo-600">Terms</Link>
                    <Link href="/refund-policy/" aria-label="Refund Policy" className="hover:text-indigo-600">Refund Policy</Link>
                </div>
            </div>
        </footer>
    );
}
