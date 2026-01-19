"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import {
    Database,
    Eye,
    HardDrive,
    KeyRound,
    Network,
    Server,
    ShieldCheck,
    Tags,
    Timer,
} from "lucide-react";

const features = [
    {
        title: "EC2 Waste",
        desc: "Stopped & idle instances, generation upgrade suggestions",
        icon: <Server className="h-5 w-5" />,
    },
    {
        title: "Security Posture",
        desc: "IAM root posture + key hygiene, audit logging baselines, and public exposure signals",
        icon: <KeyRound className="h-5 w-5" />,
    },
    {
        title: "EBS + Snapshots",
        desc: "Unattached volumes, gp2→gp3 recommendations, old snapshot cleanup",
        icon: <HardDrive className="h-5 w-5" />,
    },
    {
        title: "RDS Signals",
        desc: "Idle/underused RDS signals with pragmatic recommendations",
        icon: <Database className="h-5 w-5" />,
    },
    {
        title: "Network Waste",
        desc: "NAT gateways, unused EIPs, idle load balancers, missing S3 endpoints",
        icon: <Network className="h-5 w-5" />,
    },
    {
        title: "Tag Hygiene",
        desc: "Untagged resources surfaced when you opt in",
        icon: <Tags className="h-5 w-5" />,
    },
    {
        title: "CloudWatch (Optional)",
        desc: "Utilization enrichments with a bounded query budget + provenance",
        icon: <Eye className="h-5 w-5" />,
    },
    {
        title: "Privacy-First",
        desc: "Runs in your GitHub Actions runner with a customer-controlled read-only role",
        icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
        title: "Workflow Outputs",
        desc: "One-page summary + HTML report + machine-readable JSON/CSV findings as artifacts",
        icon: <Timer className="h-5 w-5" />,
    },
];

export default function Features() {
    return (
        <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="features-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Detectors that find waste & hygiene issues</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">Run audits in GitHub Actions and get a report you can share: a one-page summary, an HTML report, and machine-readable findings (JSON/CSV).</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <Parallax key={f.title} amount={10 + (i % 4) * 5}>
                        <Card title={f.title} icon={f.icon}>{f.desc}</Card>
                    </Parallax>
                ))}
            </div>
        </section>
    );
}

function Parallax({ children, amount = 15 }: { children: React.ReactNode; amount?: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;
        const onScroll = () => {
            const r = el.getBoundingClientRect();
            const viewportH = window.innerHeight || document.documentElement.clientHeight;
            const visible = Math.max(0, Math.min(1, 1 - r.top / viewportH));
            el.style.transform = `translateY(${(1 - visible) * amount}px)`;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [amount]);
    return <div ref={ref} className="will-change-transform">{children}</div>;
}
