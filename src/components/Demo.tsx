"use client";
import React from "react";

export default function Demo() {
    return (
        <section id="demo" aria-labelledby="demo-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="demo-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Get Your Free Audit</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl">Share a few details and we’ll send tailored automation recommendations.</p>

            <div className="mt-6 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <iframe
                    data-tally-src="https://tally.so/embed/A7z6zk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
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
                <a className="underline" href="https://tally.so/r/A7z6zk" target="_blank" rel="noreferrer">https://tally.so/r/A7z6zk</a>
                . Or email us at {" "}
                <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
            </p>
        </section>
    );
}
