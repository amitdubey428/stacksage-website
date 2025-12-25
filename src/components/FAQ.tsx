"use client";
import React from "react";

const faqs = [
    { q: "Is this safe?", a: "Yes, read-only IAM; privacy-first." },
    { q: "How long to see results?", a: "Many see wins in days; most within 30 days." },
    { q: "Do I need code changes?", a: "No." },
    {
        q: "What AWS services do you cover?",
        a: "EC2, EBS, RDS, CloudWatch, networking, tagging; expanding continuously.",
    },
];

export default function FAQ() {
    return (
        <section aria-labelledby="faq-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-bold tracking-tight">FAQ</h2>
            <div className="mt-6 grid gap-3">
                {faqs.map((f) => (
                    <details key={f.q} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                        <summary className="cursor-pointer text-lg font-medium">{f.q}</summary>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{f.a}</p>
                    </details>
                ))}
            </div>
            <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
                Customers often find meaningful savings in the first 30 days (varies by workload).
            </p>
        </section>
    );
}
