import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "How StackSage Works — Walkthrough",
    description:
        "Step-by-step walkthrough of StackSage: install with pip, run stacksage scan, and get your full AWS audit report in minutes.",
};

function Step({ n, title, desc, code }: { n: number; title: string; desc: string; code?: string }) {
    return (
        <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                {n}
            </div>
            <div className="flex-1 pb-10 border-l border-zinc-200 dark:border-zinc-700 pl-6 -ml-[1.25rem]">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{desc}</p>
                {code && (
                    <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-4">
                        <pre className="text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200"><code>{code}</code></pre>
                    </div>
                )}
            </div>
        </div>
    );
}

function Output({ title, desc, code }: { title: string; desc: string; code: string }) {
    return (
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{desc}</p>
            <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-4">
                <pre className="text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200"><code>{code}</code></pre>
            </div>
        </section>
    );
}

export default function WalkthroughPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-16">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                    ← Back to Home
                </Link>
            </div>

            <header className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    How StackSage works
                </h1>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                    Install with pip, connect your AWS credentials, run one command. Here&apos;s exactly what happens from first install to full audit report.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                        href="/docs/quick-start/"
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400 h-10 px-5 text-sm active:scale-[0.98]"
                    >
                        Get Started →
                    </Link>
                    <Link
                        href="/demo-report/"
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400 h-10 px-5 text-sm active:scale-[0.98]"
                    >
                        View Sample Report →
                    </Link>
                </div>
            </header>

            {/* Steps */}
            <div className="relative">
                <Step
                    n={1}
                    title="Install StackSage"
                    desc="One command. No containers, no CI pipeline required. Works on macOS, Linux, and Windows."
                    code={`pip install stacksage`}
                />
                <Step
                    n={2}
                    title="Set your license key (Pro) or run free"
                    desc="The free tier gives you the top 50 findings with no sign-up. For the full unlimited report, set your license key as an environment variable."
                    code={`# Free tier — just run:\nstacksage scan\n\n# Pro license:\nexport STACKSAGE_LICENSE=STACKSAGE1.eyJ...\nstacksage scan`}
                />
                <Step
                    n={3}
                    title="Connect your AWS account"
                    desc="StackSage uses your existing AWS credentials — no new keys to create. Works with any credential method."
                    code={`# Use the default profile:\nstacksage scan\n\n# Use a named SSO profile:\nstacksage scan --profile my-sso-profile\n\n# Assume a read-only cross-account role:\nstacksage scan --role-arn arn:aws:iam::123456789012:role/ReadOnly`}
                />
                <Step
                    n={4}
                    title="stacksage scan runs — 2 to 5 minutes"
                    desc="StackSage queries your account with read-only API calls across EC2, RDS, EBS, Lambda, S3, IAM, VPC, CloudWatch, and more. No data leaves your machine."
                    code={`$ stacksage scan\n[1/13] EC2 instances...          done  (3 findings)\n[2/13] EBS volumes & snapshots... done  (5 findings)\n[3/13] RDS instances...          done  (2 findings)\n[4/13] Lambda functions...       done  (4 findings)\n[5/13] S3 buckets...             done  (1 finding)\n[6/13] IAM posture...            done  (6 findings)\n...\nReport saved → ./stacksage_report/audit_report.html\nOpening in browser...`}
                />
                <Step
                    n={5}
                    title="Review your full audit report"
                    desc="The HTML report opens in your browser automatically. Every finding includes a savings estimate, confidence score, evidence, and copyable AWS CLI verification commands."
                />
            </div>

            {/* Outputs */}
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-4 mb-6">
                What you get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Output
                    title="summary.md"
                    desc="CTO-ready one-pager. Paste into Slack, Jira, or an exec email."
                    code={`# StackSage Audit Summary\n\n- Findings: 17\n- Est. monthly savings: $312/mo\n- CloudWatch: enabled (14d)\n\nTop actions:\n1) Delete unused EBS (~$84/mo)\n2) Migrate gp2 → gp3 (~$51/mo)\n3) Fix open security groups\n`}
                />
                <Output
                    title="findings.json / .csv"
                    desc="Machine-readable for automation, dashboards, and internal reporting."
                    code={`[{\n  "type": "ebs_unattached_volume",\n  "id": "vol-0abc123",\n  "severity": "high",\n  "estimated_monthly_savings_usd": 42.00,\n  "verification_commands": [\n    "aws ec2 describe-volumes ..."\n  ]\n}]\n`}
                />
                <Output
                    title="audit_report.html"
                    desc="Shareable HTML with evidence, metrics, and remediation commands. No login required to open."
                    code={`audit_report.html\n─ Executive summary\n─ Per-service findings\n─ Evidence & metrics\n─ Remediation commands\n─ Provenance (data sources)\n`}
                />
            </div>

            {/* What's next */}
            <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    What to do next
                </h2>
                <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>
                        <span className="font-medium">Want proof first?</span>{" "}
                        <Link href="/demo-report/" className="text-indigo-600 dark:text-indigo-400 underline">Open the sample audit report</Link> — no signup, no AWS credentials needed.
                    </li>
                    <li>
                        <span className="font-medium">Ready to run it?</span>{" "}
                        <Link href="/docs/quick-start/" className="text-indigo-600 dark:text-indigo-400 underline">Follow the Quick Start</Link> — you&apos;ll have results in under 5 minutes.
                    </li>
                    <li>
                        <span className="font-medium">Want scheduled, automated audits?</span>{" "}
                        <Link href="/docs/github-actions/" className="text-indigo-600 dark:text-indigo-400 underline">Set up GitHub Actions</Link> — runs weekly and uploads the report as an artifact.
                    </li>
                    <li>
                        <span className="font-medium">Need least-privilege IAM?</span>{" "}
                        <Link href="/docs/iam-policy/" className="text-indigo-600 dark:text-indigo-400 underline">Read-only IAM policy setup</Link> — takes 5 minutes with the CLI snippet.
                    </li>
                </ul>
            </div>
        </div>
    );
}
