import React from "react";

const steps = [
    { n: 1, title: "Create IAM Role", desc: "Read-only access in 2 minutes" },
    { n: 2, title: "Run First Audit", desc: "Scan infra for savings opportunities" },
    { n: 3, title: "Review Findings", desc: "Prioritized recommendations" },
    { n: 4, title: "Save Money", desc: "Watch your AWS bill drop 10–50%" },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" aria-labelledby="how-title" className="bg-zinc-50 dark:bg-zinc-900/40 scroll-mt-24">
            <div className="mx-auto max-w-6xl px-4 py-20">
                <h2 id="how-title" className="text-3xl sm:text-4xl font-bold tracking-tight">How it works</h2>
                <ol className="mt-8 relative border-l border-zinc-200 dark:border-zinc-700 pl-6">
                    {steps.map((s) => (
                        <li key={s.n} className="mb-8">
                            <div className="absolute -left-3 mt-1 h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                                {s.n}
                            </div>
                            <h3 className="text-xl font-semibold">{s.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-300">{s.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
