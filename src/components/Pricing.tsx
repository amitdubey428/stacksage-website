import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Trial",
        price: "Free",
        description: "Self-serve trial you can run independently in your GitHub Actions",
        features: [
            "Public trial image (GHCR)",
            "No license required",
            "Minimal IAM permissions (read-only)",
            "HTML report + JSON/CSV outputs",
            "Security posture basics + limited cost/waste preview",
            "Findings capped (intentionally)",
        ],
    },
    {
        name: "GitHub Workflow",
        price: "$99/mo",
        description: "Full StackSage scan delivered as a workflow you run on your schedule",
        features: [
            "Private GHCR image + workflow template",
            "Time-limited license secret",
            "Deeper coverage + richer evidence",
            "Recurring runs (weekly/daily)",
            "Prioritized outputs for actionability",
        ],
        popular: true,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <div className="text-center mb-12">
                <h2 id="pricing-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Two ways to get value: run the free Trial, or use the paid workflow for full coverage.
                </p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {tiers.map((t) => (
                    <Card key={t.name} title={t.name} highlight={t.popular} className={t.popular ? "scale-[1.02]" : ""}>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{t.description}</p>
                        <p className="mt-3 text-2xl font-bold">{t.price}</p>
                        <ul className="mt-4 space-y-2">
                            {t.features.map((f) => (
                                <li key={f} className="text-sm">• {f}</li>
                            ))}
                        </ul>
                        <Button className="mt-6" asChild>
                            <a href={t.name === "Trial" ? "/docs#trial" : "/#paid-access"} aria-label={`Choose ${t.name}`}>
                                {t.name === "Trial" ? "Start Trial" : "Request Paid Access"}
                            </a>
                        </Button>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Trial is self-serve. If you need help, email is optional.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Email us at <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>
                </p>
            </div>
        </section>
    );
}
