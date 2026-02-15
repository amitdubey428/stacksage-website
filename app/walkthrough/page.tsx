import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Walkthrough — StackSage",
    description:
        "A quick, visual walkthrough of what you get after running StackSage once in GitHub Actions.",
};

function Snippet({
    title,
    desc,
    code,
}: {
    title: string;
    desc: string;
    code: string;
}) {
    return (
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {desc}
            </p>
            <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-4">
                <pre className="text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200">
                    <code>{code}</code>
                </pre>
            </div>
        </section>
    );
}

export default function WalkthroughPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                    ← Back to Home
                </Link>
            </div>

            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    60‑second walkthrough
                </h1>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                    StackSage runs inside your GitHub Actions runner, assumes a customer‑controlled read‑only role,
                    and produces an audit pack you can share (summary + HTML) and automate (JSON/CSV).
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/demo-report/"
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-11 px-5 text-base active:scale-[0.98]"
                    >
                        Open Sample Audit Pack →
                    </Link>
                    <Link
                        href="/docs/#trial"
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-11 px-5 text-base active:scale-[0.98]"
                    >
                        Start Trial →
                    </Link>
                </div>
            </header>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Snippet
                    title="1) summary.md"
                    desc="A one-page, CTO-ready summary you can paste into an email, Slack, or a ticket."
                    code={`# StackSage Audit Summary\n\n- Findings: 17\n- Est. monthly savings: $312.40\n- CloudWatch metrics: enabled (14d lookback)\n\nTop actions:\n1) Delete unused EBS volumes (~$84/mo)\n2) Migrate gp2 → gp3 (~$51/mo)\n3) Fix open security groups (posture)\n`}
                />
                <Snippet
                    title="2) findings.json / findings.csv"
                    desc="Machine-readable outputs for automation, dashboards, and internal reporting."
                    code={`[{\n  \"type\": \"lambda_graviton_migration\",\n  \"resource_type\": \"lambda\",\n  \"id\": \"my-function\",\n  \"severity\": \"low\",\n  \"confidence\": 0.85,\n  \"estimated_monthly_savings_usd\": 12.34,\n  \"verification_commands\": [\"aws lambda get-function-configuration ...\"]\n}]\n`}
                />
                <Snippet
                    title="3) audit_report.html"
                    desc="A shareable HTML report with evidence and copyable verification commands."
                    code={`audit_report.html\n- Executive summary\n- Evidence & metrics\n- Remediation commands\n- Provenance (budget + errors)\n`}
                />
            </div>

            <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    What to do next
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>• If you want proof-first: open the sample audit pack and skim the top findings.</li>
                    <li>• If you want to run it: follow the Trial guide and run once inside your repo.</li>
                    <li>• If you want full coverage: use the paid GitHub Workflow request form from the homepage.</li>
                </ul>
            </div>
        </div>
    );
}
