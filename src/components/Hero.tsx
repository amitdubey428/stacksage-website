"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedGradient from "@/components/AnimatedGradient";

export default function Hero() {
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
                    {/* Free Audit Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            Free Audit Available — Limited Time
                        </span>
                    </div>

                    <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-sky-600">
                        Stop Overpaying for AWS
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        StackSage finds hidden cost savings in your infrastructure. Privacy-first, read-only access. No code changes.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Magnetic>
                            <Button asChild size="lg">
                                <a href="#demo">Get Your Free Audit</a>
                            </Button>
                        </Magnetic>
                        <Magnetic strength={20}>
                            <Button asChild variant="outline" size="lg">
                                <a href="#how-it-works">See How It Works</a>
                            </Button>
                        </Magnetic>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">10–50% avg savings</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">5 min setup</li>
                        <li className="rounded-full border border-zinc-200/60 dark:border-zinc-700 px-3 py-1">Read-only access</li>
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
