"use client";
import React from "react";
import Link from "next/link";
import Script from "next/script";

type ColorScheme = "light" | "dark";


function getPreferredScheme(): ColorScheme {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export default function Demo() {
    const loomUrl = process.env.NEXT_PUBLIC_LOOM_DEMO_URL;

    const [tallyTheme, setTallyTheme] = React.useState<ColorScheme>("light");
    React.useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const update = () => setTallyTheme(getPreferredScheme());
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const tallySrc = `https://tally.so/embed/68Lrke?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&theme=${tallyTheme}`;

    React.useEffect(() => {
        // When theme changes, ask Tally embed script to re-scan and apply.
        // Safe no-op if the script hasn't loaded yet.
        const w = window as any;
        if (w?.Tally?.loadEmbeds) {
            w.Tally.loadEmbeds();
        }
    }, [tallyTheme]);
    const sampleArtifacts = [
        {
            title: "Summary (human-readable)",
            desc: "A one-page markdown summary you can paste into Slack, Jira, or an exec email.",
            code: `# StackSage Audit Summary\n\n- Findings: 17\n- Est. monthly savings: $312.40\n- CloudWatch metrics: enabled (14d lookback)\n\nTop 3 actions:\n1) Delete unused EBS volumes (~$84/mo)\n2) Migrate gp2 → gp3 (~$51/mo)\n3) Fix open security groups (posture)\n`,
        },
        {
            title: "Findings (machine-readable)",
            desc: "JSON + CSV outputs for automation, dashboards, and internal reporting.",
            code: `[{\n  "type": "ec2_idle_instances",\n  "resource_type": "ec2",\n  "id": "i-0abc123...",\n  "severity": "high",\n  "confidence": 0.9,\n  "estimated_monthly_savings_usd": 74.12,\n  "verification_commands": ["aws ec2 describe-instances ..."]\n}]\n`,
        },
        {
            title: "Report (shareable HTML)",
            desc: "An HTML report your team can open without needing the CLI installed.",
            code: `audit_report.html\n- Executive summary\n- Evidence & metrics\n- Remediation commands\n- Provenance (budget + errors)\n`,
        },
    ];

    return (
        <section id="demo" aria-labelledby="demo-title" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
            <h2 id="demo-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                First look: what you get after one run
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                Before you wire anything up, here’s the proof: a real audit pack output (summary + HTML + JSON/CSV) generated inside GitHub Actions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Link className="underline" href="/demo-report/">View the sample audit pack (no signup)</Link>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-zinc-700 dark:text-zinc-300">
                    No AWS credential sharing. Customer-controlled read-only role.
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <Link className="underline" href="/walkthrough/">60‑second walkthrough</Link>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleArtifacts.map((a) => (
                    <div
                        key={a.title}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5"
                    >
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{a.title}</h3>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{a.desc}</p>
                        <div className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-3">
                            <pre className="text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200"><code>{a.code}</code></pre>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            90‑second video walkthrough
                        </h3>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            Prefer a quick visual demo? Watch the end-to-end flow: run → artifacts → report → next steps.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/walkthrough/"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                        >
                            Text walkthrough →
                        </Link>
                        <Link
                            href="/demo-report/"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                        >
                            Sample report →
                        </Link>
                    </div>
                </div>

                {loomUrl ? (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40">
                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                src={loomUrl}
                                title="StackSage walkthrough"
                                className="absolute inset-0 h-full w-full"
                                allow="fullscreen; picture-in-picture"
                            />
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                        Video embed is optional. To enable it, set <code>NEXT_PUBLIC_LOOM_DEMO_URL</code> in the site environment.
                    </p>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 h-full">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Open the full sample report</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                        The embedded report includes concrete savings estimates, confidence scores, and copyable verification commands.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                            href="/demo-report/"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                        >
                            View Sample Audit Pack →
                        </Link>
                        <Link
                            href="/docs/#trial"
                            className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-11 px-5 text-base active:scale-[0.98] whitespace-nowrap"
                        >
                            Start the Trial →
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex flex-col">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">If you want to run it in your repo</h3>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                        <li>• A GitHub repo with Actions enabled</li>
                        <li>• A customer-controlled IAM read-only role ARN to assume</li>
                        <li>• GitHub secrets for the workflow</li>
                    </ul>

                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        You keep full control: StackSage runs inside your Actions runner and only reads metadata + aggregate metrics.
                    </p>
                </div>
            </div>

            <div id="paid-access" className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-2xl font-bold tracking-tight">Paid GitHub Workflow ($99/mo)</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Request access to the private image + workflow for full coverage. Trial is self-serve; paid access is approved via this form.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                        <li>• Private GHCR image + time-limited license</li>
                        <li>• Deeper coverage and richer evidence</li>
                        <li>• Designed for recurring weekly/daily runs</li>
                    </ul>
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <iframe
                        key={tallyTheme}
                        data-tally-src={tallySrc}
                        loading="lazy"
                        width="100%"
                        height="835"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="StackSage Paid Workflow Request"
                    />
                </div>
            </div>

            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                Questions? Email us at {" "}
                <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
            </p>

            <Script async src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        </section>
    );
}
