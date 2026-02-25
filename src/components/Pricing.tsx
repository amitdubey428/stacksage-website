"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
    const [showEmailStep, setShowEmailStep] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef<HTMLInputElement>(null);

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

    // Show the email capture step first
    const handleBuyNow = useCallback(() => {
        if (!canCheckout) return;
        setShowEmailStep(true);
        setEmailError("");
    }, [canCheckout]);

    // Focus the email input once it appears
    useEffect(() => {
        if (showEmailStep) {
            setTimeout(() => emailInputRef.current?.focus(), 50);
        }
    }, [showEmailStep]);

    // Open Paddle checkout with email in customData
    const handleCheckout = useCallback(async () => {
        const trimmed = email.trim();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setEmailError("Please enter a valid email address.");
            emailInputRef.current?.focus();
            return;
        }
        setEmailError("");
        setLoading(true);
        const ready = await loadPaddle();
        if (!ready) {
            setLoading(false);
            return;
        }
        (window as any).Paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
            customer: { email: trimmed },
            customData: { email: trimmed, plan: "pro" },
        });
        setLoading(false);
    }, [canCheckout, loadPaddle, priceId, email]);

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
                        ) : showEmailStep ? (
                            <div className="mt-6 space-y-2">
                                <label htmlFor="checkout-email" className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                    Your work email
                                </label>
                                <input
                                    id="checkout-email"
                                    ref={emailInputRef}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
                                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                />
                                {emailError && (
                                    <p className="text-xs text-red-500">{emailError}</p>
                                )}
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Your license and access credentials will be sent here immediately after payment.
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1"
                                        onClick={handleCheckout}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Continue to checkout →"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => { setShowEmailStep(false); setEmailError(""); }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                className="mt-6"
                                onClick={canCheckout ? handleBuyNow : undefined}
                                disabled={!canCheckout}
                            >
                                <span>Buy now</span>
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
