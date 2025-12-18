import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Starter",
        price: "$29/mo",
        description: "Perfect for small teams and startups",
        features: [
            "Multi-account support (up to 3 accounts)",
            "Weekly audits",
            "Email reports",
            "Basic optimization recommendations",
            "Community support",
        ],
    },
    {
        name: "Growth",
        price: "$99/mo",
        description: "For growing teams and businesses",
        features: [
            "Multi-account support (up to 15 accounts)",
            "Daily audits",
            "Slack/Teams integration",
            "Advanced cost detectors",
            "Priority support",
            "Custom alerts & notifications",
            "API access",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$219/mo",
        description: "For large organizations & AWS agencies",
        features: [
            "Unlimited AWS accounts included",
            "Real-time monitoring",
            "Custom cost detectors",
            "Dedicated support manager",
            "99.9% SLA guarantee",
            "SSO/SAML integration",
            "Compliance & audit reports",
            "White-label options available",
        ],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <div className="text-center mb-12">
                <h2 id="pricing-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Flat monthly rate based on your organization size. No hidden fees, no percentage of savings, no per-resource charges.
                </p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <a href="#demo" aria-label={`Choose ${t.name}`}>Choose {t.name}</a>
                        </Button>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">No credit card • 14-day trial • Cancel anytime</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-3xl mx-auto">
                    All plans include multi-account support with no hidden fees. Enterprise pricing covers unlimited AWS accounts — perfect for agencies, consultancies, and large organizations managing multiple environments.
                </p>
            </div>
        </section>
    );
}
