import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Pilot",
        price: "Contact us",
        description: "Early access for teams piloting StackSage",
        features: [
            "Private GHCR image access",
            "GitHub Actions workflow template",
            "Report artifacts (HTML + JSON/CSV)",
            "Support during setup",
        ],
    },
    {
        name: "Team",
        price: "Contact us",
        description: "For teams running recurring audits",
        features: [
            "Everything in Pilot",
            "Help configuring scheduled runs",
            "Optional CloudWatch/Cost Explorer enrichments (if enabled)",
        ],
        popular: true,
    },
    {
        name: "Org",
        price: "Contact us",
        description: "For org-wide rollouts",
        features: [
            "Everything in Team",
            "Onboarding + support",
            "Multiple repos/workflows",
        ],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <div className="text-center mb-12">
                <h2 id="pricing-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Early access pricing while we onboard design partners. Tell us about your AWS footprint and how you want to run audits.
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
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Email us at <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>
                </p>
            </div>
        </section>
    );
}
