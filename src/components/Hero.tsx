"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedGradient from "@/components/AnimatedGradient";

export default function Hero() {
    const [copied, setCopied] = React.useState(false);
    const installCmd = "pip install stacksage && stacksage scan";

    function handleCopy() {
        navigator.clipboard.writeText(installCmd).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <section className="relative isolate" aria-labelledby="hero-title">
            <AnimatedGradient />
            <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-sky-600">
                        Find what&apos;s wasting money in your AWS account
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        Runs on your machine in under 5 minutes. Connects with read-only credentials,
                        scans for cost waste and security gaps, opens a full HTML report in your browser —
                        nothing leaves your machine.
                    </p>

                    {/* pip install block */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleCopy}
                            className="group flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-5 py-3 font-mono text-sm text-zinc-800 dark:text-zinc-200 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                            aria-label="Copy install command"
                        >
                            <span className="text-indigo-500 select-none">$</span>
                            <span>{installCmd}</span>
                            <span className="ml-2 text-xs text-zinc-400 group-hover:text-indigo-500 transition-colors select-none">
                                {copied ? "✓ copied" : "copy"}
                            </span>
                        </button>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Magnetic>
                            <Button asChild size="lg">
                                <Link href="/docs/quick-start/">Get Started Free</Link>
                            </Button>
                        </Magnetic>
                        <Magnetic strength={20}>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/demo-report/">View Sample Report</Link>
                            </Button>
                        </Magnetic>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">Free — top 50 findings, no sign-up</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">Runs locally, nothing shared</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">Works with any AWS profile or SSO</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">Cost + security posture in one report</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">HTML + JSON/CSV outputs</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}

// Subtle magnetic hover wrapper
function Magnetic({ children, strength = 30 }: { children: React.ReactNode; strength?: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${(dx / r.width) * strength}px, ${(dy / r.height) * strength}px)`;
        };
        const onLeave = () => {
            el.style.transform = "translate(0,0)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [strength]);
    return <div ref={ref} className="inline-block will-change-transform">{children}</div>;
}
