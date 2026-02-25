"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
    {
        name: "Trial",
        price: "Free",
        description: "Self-serve audit pack you can run independently in GitHub Actions",
        features: [
            "Public trial image (GHCR)",
            "No license required",
            "Minimal IAM permissions (read-only)",
            "Summary + HTML + JSON/CSV outputs",
            "Security posture basics + limited cost/waste preview",
            "Findings capped (intentionally)",
        ],
    },
    {
        name: "GitHub Workflow",
        price: "$99/mo",
        description: "Monthly subscription — full audit pack delivered as a workflow you run on your schedule",
        features: [
            "Private GHCR image + workflow template",
            "Time-limited license secret",
            "Deeper coverage + richer evidence",
            "Recurring runs (weekly/daily)",
            "Prioritized outputs for actionability",
            "Cancel anytime",
        ],
        popular: true,
    },
];

export default function Pricing() {
    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
    const [loading, setLoading] = useState(false);

    const canCheckout = Boolean(clientToken && priceId);

    const loadPaddle = useCallback(async (): Promise<boolean> => {
        if (typeof window === "undefined") return false;
        if ((window as any).Paddle) return true;

        return new Promise<boolean>((resolve) => {
            const script = document.createElement("script");
            script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
            script.onload = () => {
                (window as any).Paddle.Initialize({ token: clientToken });
                resolve(true);
            };
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, [clientToken]);

    const handleCheckout = useCallback(async () => {
        if (!canCheckout) return;
        setLoading(true);
        const ready = await loadPaddle();
        if (!ready) {
            setLoading(false);
            return;
        }
        (window as any).Paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
        });
        setLoading(false);
    }, [canCheckout, loadPaddle, priceId]);

    useEffect(() => {
        if (canCheckout) {
            loadPaddle();
        }
    }, [canCheckout, loadPaddle]);

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
                        <p className="mt-3 text-2xl font-bold">
                            {t.price}
                            {t.popular && (
                                <span className="ml-1.5 text-sm font-normal text-zinc-500 dark:text-zinc-400">+ taxes</span>
                            )}
                        </p>
                        <ul className="mt-4 space-y-2">
                            {t.features.map((f) => (
                                <li key={f} className="text-sm">• {f}</li>
                            ))}
                        </ul>
                        {t.name === "Trial" ? (
                            <Button className="mt-6" asChild>
                                <Link href="/docs/#trial" aria-label="Start Trial">
                                    Start Trial
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                className="mt-6"
                                onClick={canCheckout ? handleCheckout : undefined}
                                disabled={loading || !canCheckout}
                            >
                                <span>{loading ? "Loading..." : "Buy now"}</span>
                            </Button>
                        )}
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Trial is self-serve. If you need help, email is optional.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    To cancel your subscription, use the Paddle customer portal link in your receipt email or contact{" "}
                    <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                </p>
            </div>
        </section>
    );
}
