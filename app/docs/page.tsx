import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Documentation — StackSage",
    description:
        "How StackSage works, what it reads, what it outputs, and how to get started running audits in GitHub Actions.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
        </section>
    );
}

function CodeBlock({ children }: { children: string }) {
    return (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-4 text-xs text-zinc-800 dark:text-zinc-100">
            <code className="font-mono">{children}</code>
        </pre>
    );
}

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        ← Back to Home
                    </Link>
                    <span className="text-sm text-zinc-400">/</span>
                    <Link
                        href="/demo-report"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Sample Report
                    </Link>
                    <span className="text-sm text-zinc-400">/</span>
                    <Link
                        href="/privacy-access"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Privacy &amp; Access
                    </Link>
                </div>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Documentation</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    StackSage runs AWS audits in your environment (typically GitHub Actions) using a customer-controlled read-only role.
                    It produces local artifacts you can share internally: a one-page summary, an HTML report, and machine-readable findings.
                </p>

                <Section title="What StackSage does">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Finds <span className="font-semibold text-zinc-900 dark:text-zinc-100">cost waste</span> and concrete
                            savings opportunities.
                        </li>
                        <li>
                            Flags <span className="font-semibold text-zinc-900 dark:text-zinc-100">security posture signals</span>
                            (IAM hygiene, exposure basics, audit logging baselines).
                        </li>
                        <li>
                            Makes findings explainable via evidence/provenance (e.g. measured vs heuristic vs skipped due to permissions).
                        </li>
                    </ul>
                </Section>

                <Section title="How it works (high level)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Run StackSage on a schedule (GitHub Actions) or locally.</li>
                        <li>Assume a customer-controlled read-only role (STS AssumeRole).</li>
                        <li>Read resource metadata and (optional) aggregate utilization/spend totals.</li>
                        <li>Generate local artifacts as workflow outputs under your control.</li>
                    </ol>
                </Section>

                <Section title="Outputs">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-mono">summary.md</span> — one-page account brief (top savings, security posture,
                            skipped checks, next actions)
                        </li>
                        <li>
                            <span className="font-mono">audit_report.html</span> — full interactive report (financial findings vs
                            security posture findings, plus complete appendix)
                        </li>
                        <li>
                            <span className="font-mono">findings.json</span> / <span className="font-mono">findings.csv</span> —
                            machine-readable exports
                        </li>
                    </ul>
                    <p>
                        See a real example at <Link className="underline" href="/demo-report">/demo-report</Link>.
                    </p>
                </Section>

                <Section title="Getting started (GitHub Actions)">
                    <p>
                        The typical setup is a scheduled workflow that runs StackSage in a container and uploads the report artifacts.
                        StackSage requires a customer-controlled IAM role to assume.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Create a read-only IAM role in your AWS account with the recommended permissions.</li>
                        <li>Add the role ARN as a GitHub Actions secret (for example: <span className="font-mono">CUSTOMER_ROLE_ARN</span>).</li>
                        <li>Run the workflow on a schedule (weekly/daily) and review artifacts.</li>
                    </ol>
                    <p>
                        For the exact permissions and opt-ins, see <Link className="underline" href="/privacy-access">Privacy &amp; Access</Link>.
                    </p>
                    <CodeBlock>{`# Typical secrets / inputs
CUSTOMER_ROLE_ARN=arn:aws:iam::<account-id>:role/<role-name>
STACKSAGE_LICENSE=<time-limited signed license (pilot)>`}</CodeBlock>
                </Section>

                <Section title="Security posture signals (what we check)">
                    <p>
                        StackSage includes baseline posture checks intended to surface obvious risks early and reduce audit blind spots.
                        These checks are designed to be privacy-first: we prefer aggregate evidence and avoid raw sensitive policy contents.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">IAM hygiene</span>: root MFA, root keys,
                            password policy baseline, access key rotation signals
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Exposure basics</span>: public security
                            group ingress on sensitive ports, S3 public access block posture, RDS public/encryption/backup baselines
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Audit logging</span>: CloudTrail baseline,
                            AWS Config recorder status, high-level enablement checks
                        </li>
                    </ul>
                </Section>

                <Section title="Privacy & permissions">
                    <p>
                        StackSage is privacy-first by default. It runs inside your environment and produces local artifacts; it does not
                        require exporting AWS inventory to a hosted SaaS.
                    </p>
                    <p>
                        Read the detailed permissions matrix and opt-ins here: <Link className="underline" href="/privacy-access">/privacy-access</Link>.
                    </p>
                </Section>

                <Section title="Support">
                    <p>
                        Questions or want help getting set up? Email <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                    </p>
                </Section>
            </div>
        </div>
    );
}
