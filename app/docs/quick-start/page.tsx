import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: "Quick Start - StackSage Documentation",
    description: "Get StackSage running in under 5 minutes. Install with pip, connect your AWS credentials, run stacksage scan.",
};

function CodeBlock({ code }: { code: string }) {
    return (
        <div className="not-prose my-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
                <pre className="text-sm overflow-x-auto flex-1"><code>{code}</code></pre>
            </div>
        </div>
    );
}

export default function QuickStartPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Quick Start</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                Get your first AWS audit in under 5 minutes. No containers, no CI pipeline, no sign-up.
            </p>

            {/* Prerequisites */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Prerequisites</h2>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-8">
                <li>Python 3.10 or higher (<code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">python3 --version</code>)</li>
                <li>AWS credentials already configured on your machine (any method: <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">~/.aws/credentials</code>, env vars, SSO, or instance profile)</li>
                <li>Read-only AWS access to the account you want to audit</li>
            </ul>

            {/* Step 1 */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Step 1 — Install StackSage</h2>
            <CodeBlock code={`pip install stacksage`} />
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                That&apos;s it. StackSage is a standard Python package — no Docker, no GitHub Actions workflow to set up first.
            </p>

            {/* Step 2 */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Step 2 — Run your first scan</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                Run against your default AWS profile:
            </p>
            <CodeBlock code={`stacksage scan`} />
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                Or specify an SSO profile or role:
            </p>
            <CodeBlock code={`# Named profile (SSO, named credential, etc.)\nstacksage scan --profile my-sso-profile\n\n# Assume a cross-account read-only role\nstacksage scan --role-arn arn:aws:iam::123456789012:role/StackSageReadOnly`} />
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                The scan reads only metadata and aggregate metrics — no resource data leaves your machine.
                Expect it to complete in <strong>2–5 minutes</strong> depending on the size of your account.
            </p>

            {/* Step 3 */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Step 3 — Review your report</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                When the scan finishes, StackSage automatically opens <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">audit_report.html</code> in your browser.
                You&apos;ll also find these files in the output directory:
            </p>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-8">
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">audit_report.html</code> — shareable HTML report with evidence and remediation commands</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">findings.json</code> / <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">findings.csv</code> — machine-readable outputs for automation</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">summary.md</code> — one-page executive summary, ready to paste into Slack or an email</li>
            </ul>

            <div className="not-prose my-6 rounded-lg border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">Free tier</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                    Without a license, StackSage returns the top 50 findings (sorted by savings). No sign-up or credit card required.
                    For the full unlimited report, <Link href="/docs/licensing/" className="underline hover:text-blue-900 dark:hover:text-blue-100">get a Pro license</Link>.
                </p>
            </div>

            {/* Pro license */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Adding your Pro license</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                Set your license key as an environment variable before scanning:
            </p>
            <CodeBlock code={`export STACKSAGE_LICENSE=STACKSAGE1.eyJ...\nstacksage scan`} />
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Add the <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">export</code> line to your <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">~/.zshrc</code> or <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">~/.bashrc</code> to persist it across sessions.
            </p>

            {/* IAM */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Recommended: least-privilege IAM</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                For production use, create a dedicated read-only IAM role and pass it via <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">--role-arn</code>.
                This means StackSage never touches your default admin credentials.
                See the <Link href="/docs/iam-policy/" className="text-blue-600 dark:text-blue-400 hover:underline">IAM Policy Setup guide</Link> for a 5-minute setup using the AWS CLI.
            </p>

            {/* Optional GH Actions */}
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Optional: schedule with GitHub Actions</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Want automated weekly audits that upload the report as a CI artifact? See the{" "}
                <Link href="/docs/github-actions/" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub Actions setup guide</Link>.
                GitHub Actions is optional — <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">stacksage scan</code> on your machine is fully functional without it.
            </p>

            <div className="not-prose my-8 rounded-lg border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6">
                <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">🎉 You&apos;re set up!</h3>
                <p className="text-green-800 dark:text-green-200 mb-4">
                    Your report shows cost savings estimates, confidence scores, security posture signals, and copyable AWS CLI verification commands for every finding.
                </p>
                <Link
                    href="/docs/configuration/"
                    className="inline-flex items-center gap-2 text-green-700 dark:text-green-300 hover:underline font-medium"
                >
                    Next: Configure exclusions and thresholds <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">What&apos;s next?</h2>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-8">
                <li><Link href="/docs/cli-reference/" className="text-blue-600 dark:text-blue-400 hover:underline">CLI reference — all flags and environment variables</Link></li>
                <li><Link href="/docs/configuration/" className="text-blue-600 dark:text-blue-400 hover:underline">Configuration — exclusions, thresholds, stacksage.yml</Link></li>
                <li><Link href="/docs/iam-policy/" className="text-blue-600 dark:text-blue-400 hover:underline">IAM policy setup — least-privilege read-only role</Link></li>
                <li><Link href="/docs/detectors/" className="text-blue-600 dark:text-blue-400 hover:underline">All detectors — what StackSage checks</Link></li>
                <li><Link href="/docs/github-actions/" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub Actions — automated scheduled audits</Link></li>
                <li><Link href="/docs/troubleshooting/" className="text-blue-600 dark:text-blue-400 hover:underline">Troubleshooting — common issues</Link></li>
            </ul>
        </div>
    );
}
