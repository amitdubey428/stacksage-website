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
                Average result: <SavingsCounter from={0} to={4200} />/month saved in first 30 days
            </p>
        </section>
    );
}

function SavingsCounter({ from = 0, to = 4200, duration = 2000 }: { from?: number; to?: number; duration?: number }) {
    const [value, setValue] = React.useState(from);
    const ref = React.useRef<HTMLSpanElement | null>(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setValue(to);
            return;
        }
        const start = performance.now();
        const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setValue(Math.round(from + (to - from) * eased));
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [from, to, duration]);
    const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
    return <span ref={ref} className="font-semibold text-zinc-200">{formatted}</span>;
}
