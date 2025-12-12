"use client";
import React from "react";

export default function Demo() {
    return (
        <section id="demo" aria-labelledby="demo-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="demo-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Get Your Free Audit</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl">Share a few details and we'll send tailored automation recommendations.</p>

            {/* Sample Report CTA */}
            <div className="mt-6 mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            See What You'll Get
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Check out a sample audit report with real savings opportunities
                        </p>
                    </div>
                    <a
                        href="/demo-report"
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                    >
                        View Sample Report →
                    </a>
                </div>
            </div>

            <div className="mt-6 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <iframe
                    data-tally-src="https://tally.so/embed/68Lrke?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="835"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="StackSage Free Audit"
                />
            </div>

            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                If the form doesn’t load, open it directly: {" "}
                <a className="underline" href="https://tally.so/r/68Lrke" target="_blank" rel="noreferrer">https://tally.so/r/68Lrke</a>
                . Or email us at {" "}
                <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
            </p>
        </section>
    );
}
