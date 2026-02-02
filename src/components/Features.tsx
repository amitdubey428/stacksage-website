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
        title: "EC2 Savings",
        desc: "Stopped & idle instances plus generation upgrade opportunities",
        icon: <Server className="h-5 w-5" />,
    },
    {
        title: "Security Posture",
        desc: "IAM hygiene, audit logging baselines, exposure signals, and encryption posture",
        icon: <KeyRound className="h-5 w-5" />,
    },
    {
        title: "EBS + Snapshots",
        desc: "Unattached volumes, gp2→gp3 recommendations, old snapshot cleanup",
        icon: <HardDrive className="h-5 w-5" />,
    },
    {
        title: "RDS Signals",
        desc: "Right-sizing signals plus low-connections guardrail, public access, encryption, and backup posture",
        icon: <Database className="h-5 w-5" />,
    },
    {
        title: "Network Waste",
        desc: "Idle NAT gateways, unused EIPs, and idle load balancers",
        icon: <Network className="h-5 w-5" />,
    },
    {
        title: "Tag Hygiene",
        desc: "Untagged resources surfaced when you opt in",
        icon: <Tags className="h-5 w-5" />,
    },
    {
        title: "CloudWatch (Optional)",
        desc: "Utilization enrichments (invocations, bytes, requests) with a bounded query budget + provenance",
        icon: <Eye className="h-5 w-5" />,
    },
    {
        title: "Privacy-First",
        desc: "Runs in your GitHub Actions runner with a customer-controlled read-only role",
        icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
        title: "Workflow Outputs",
        desc: "One-page summary + HTML report + JSON/CSV findings with copyable verification commands",
        icon: <Timer className="h-5 w-5" />,
    },
];

export default function Features() {
    return (
        <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="features-title" className="text-3xl sm:text-4xl font-bold tracking-tight">An audit pack, not just a cost scan</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">Get cost savings, guardrails, and security posture in one shareable report — summary, HTML, and JSON/CSV artifacts.</p>
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
