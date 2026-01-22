"use client";
import React from "react";

const faqs = [
    { q: "Where does StackSage run?", a: "Inside your GitHub Actions runner (in your repo)." },
    {
        q: "Can I run the Trial without contacting you?",
        a: "Yes. Trial is self-serve: create a read-only IAM role, add GitHub secrets, copy the workflow, and run it. Full steps are on /docs.",
    },
    {
        q: "How is Trial delivered?",
        a: "As a public Docker image pulled from GHCR and run by your workflow (no license required).",
    },
    {
        q: "How is the paid GitHub Workflow delivered?",
        a: "As a private Docker image pulled from GHCR, run by your workflow, with a time-limited license secret.",
    },
    { q: "Do you ingest AWS credentials?", a: "No. AWS access is via a customer-controlled read-only IAM role used by your workflow." },
    {
        q: "What do I get as output?",
        a: "An HTML report plus machine-readable findings (JSON/CSV) as workflow artifacts.",
    },
    {
        q: "Does Trial include savings ($) estimates?",
        a: "Trial includes a limited cost/waste preview but does not compute exact savings. The paid workflow unlocks deeper coverage and quantification.",
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
