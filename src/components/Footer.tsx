import React from "react";

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
                    <a href="/docs" aria-label="Docs" className="hover:text-indigo-600">Docs</a>
                    <a href="/privacy" aria-label="Privacy" className="hover:text-indigo-600">Privacy</a>
                    <a href="/privacy-access" aria-label="Privacy & Access" className="hover:text-indigo-600">Privacy &amp; Access</a>
                    <a href="/terms" aria-label="Terms" className="hover:text-indigo-600">Terms</a>
                </div>
            </div>
        </footer>
    );
}
