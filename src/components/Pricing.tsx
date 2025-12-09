import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Starter",
        price: "$29/mo",
        features: [
            "Up to 50 AWS resources",
            "Weekly audits",
            "Email reports",
            "Basic optimization",
            "Community support",
        ],
    },
    {
        name: "Growth",
        price: "$99/mo",
        features: [
            "Up to 500 resources",
            "Daily audits",
            "Slack/Teams",
            "Advanced detectors",
            "Priority support",
            "Custom alerts",
            "API access",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$219/mo",
        features: [
            "Unlimited resources",
            "Real-time monitoring",
            "Multi-account",
            "Custom detectors",
            "Dedicated support",
            "SLA",
            "SSO/SAML",
            "Compliance reports",
        ],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="pricing-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Pricing</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((t) => (
                    <Card key={t.name} title={t.name} highlight={t.popular} className={t.popular ? "scale-[1.02]" : ""}>
                        <p className="mt-2 text-2xl font-bold">{t.price}</p>
                        <ul className="mt-3 space-y-2">
                            {t.features.map((f) => (
                                <li key={f} className="text-sm">• {f}</li>
                            ))}
                        </ul>
                        <Button className="mt-4" asChild>
                            <a href="#demo" aria-label={`Choose ${t.name}`}>Choose {t.name}</a>
                        </Button>
                    </Card>
                ))}
            </div>
            <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">No credit card • 14-day trial • Cancel anytime</p>
        </section>
    );
}
