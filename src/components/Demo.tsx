"use client";
import React from "react";
import Script from "next/script";

export default function Demo() {
    return (
        <section id="demo" aria-labelledby="demo-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="demo-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Run the Trial (Self-Serve)</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl">
                You can run StackSage Trial independently in your GitHub Actions with a customer-controlled read-only role. No license required.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        <a className="underline" href="/demo-report">See a real example (no signup)</a>
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        No AWS credential sharing. Customer-controlled read-only role.
                    </p>

                    <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">What you’ll need</h3>
                        <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <li>• A GitHub repo with Actions enabled</li>
                            <li>• AWS IAM role ARN (read-only) that GitHub can assume</li>
                            <li>• GitHub secrets: AWS access keys + role ARN</li>
                        </ul>

                        <a
                            href="/docs#trial"
                            className="mt-5 inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                        >
                            View Trial Setup Guide →
                        </a>
                    </div>
                </div>

                {/* Sample Report CTA (kept next to the form) */}
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">See What You’ll Get</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                        Browse a sample audit report with concrete, actionable findings — including security posture signals (IAM, audit logging, exposure).
                    </p>
                    <a
                        href="/demo-report"
                        className="mt-4 inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                    >
                        View Sample Report →
                    </a>
                </div>
            </div>

            <div id="paid-access" className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-2xl font-bold tracking-tight">Paid GitHub Workflow ($99/mo)</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Request access to the private image + workflow for full coverage. Trial is self-serve; paid access is approved via this form.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                        <li>• Private GHCR image + time-limited license</li>
                        <li>• Deeper coverage and richer evidence</li>
                        <li>• Designed for recurring weekly/daily runs</li>
                    </ul>
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <iframe
                        data-tally-src="https://tally.so/embed/68Lrke?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                        loading="lazy"
                        width="100%"
                        height="835"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="StackSage Paid Workflow Request"
                    />
                </div>
            </div>

            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                Questions? Email us at {" "}
                <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
            </p>

            <Script async src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        </section>
    );
}
