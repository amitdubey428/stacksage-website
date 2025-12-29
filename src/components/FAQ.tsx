"use client";
import React from "react";

const faqs = [
    { q: "Where does StackSage run?", a: "Inside your GitHub Actions runner." },
    { q: "Do you ingest AWS credentials?", a: "No. AWS access is via a customer-controlled read-only IAM role used by your workflow." },
    { q: "What do I get as output?", a: "An HTML report plus machine-readable findings (JSON/CSV) as workflow artifacts." },
    {
        q: "What AWS services do you cover?",
        a: "Common waste & hygiene checks across EC2, EBS, RDS, tagging, and more. Optional enrichments: CloudWatch utilization + Cost Explorer historical spend (if enabled).",
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
                Findings are based on what the workflow can read with the permissions you grant; outcomes vary by account and usage.
            </p>
        </section>
    );
}
