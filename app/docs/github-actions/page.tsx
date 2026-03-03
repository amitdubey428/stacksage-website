import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GitHub Actions Setup — StackSage Docs",
    description:
        "Schedule automated AWS audits with StackSage and GitHub Actions. pip install, one workflow file, two secrets — no Docker required.",
};

export default function GitHubActionsPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>GitHub Actions Setup</h1>
            <p className="lead">
                Schedule automated AWS audits that run weekly (or on demand) and upload the full
                report as a CI artifact. Two secrets, one workflow file — no Docker, no container registry.
            </p>

            <div className="not-prose my-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-5">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-0">
                    Running StackSage interactively on your laptop? See the{" "}
                    <Link className="underline" href="/docs/quick-start/">Quick Start guide</Link> instead — GitHub Actions is optional.
                </p>
            </div>

            <h2>How it works</h2>
            <ol>
                <li>GitHub Actions assumes a read-only IAM role in your AWS account via OIDC (no long-lived credentials).</li>
                <li><code>pip install stacksage</code> runs in the runner — no Docker image or container registry needed.</li>
                <li><code>stacksage audit</code> scans your account and writes the report to <code>./results/</code>.</li>
                <li>The report is uploaded as a GitHub Actions artifact and retained for 30 days.</li>
            </ol>

            <h2>Prerequisites</h2>
            <ul>
                <li>A GitHub repo with Actions enabled</li>
                <li>A StackSage Pro license key (<code>STACKSAGE_LICENSE</code>) — <Link className="underline" href="/#pricing">get one here</Link></li>
                <li>AWS account access to create an IAM role + OIDC trust policy (one-time, ~5 minutes)</li>
            </ul>

            <h2>Step 1 — Set up the IAM role</h2>
            <p>
                Create a read-only IAM role that GitHub Actions can assume via OIDC. See the{" "}
                <Link className="underline" href="/docs/iam-policy/">IAM Policy Setup guide</Link> for the exact policy and trust relationship.
                The role ARN will look like: <code>arn:aws:iam::123456789012:role/StackSageReadOnly</code>
            </p>

            <h2>Step 2 — Add secrets to your repo</h2>
            <p>
                Go to <strong>Settings → Secrets and variables → Actions</strong> and add two secrets:
            </p>
            <table>
                <thead>
                    <tr><th>Secret name</th><th>Value</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>STACKSAGE_LICENSE</code></td>
                        <td>Your license key (from your purchase confirmation email)</td>
                    </tr>
                    <tr>
                        <td><code>AWS_AUDIT_ROLE_ARN</code></td>
                        <td>The IAM role ARN from Step 1</td>
                    </tr>
                </tbody>
            </table>

            <h2>Step 3 — Add the workflow file</h2>
            <p>
                Create <code>.github/workflows/stacksage.yml</code> in your repo:
            </p>
            <pre><code>{`name: StackSage Weekly Audit

on:
  schedule:
    - cron: '0 9 * * 1'   # every Monday at 9 am UTC
  workflow_dispatch:        # also allows manual trigger

jobs:
  audit:
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # required for OIDC role assumption
      contents: read

    steps:
      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_AUDIT_ROLE_ARN }}
          aws-region: us-east-1

      - name: Install StackSage
        run: pip install stacksage

      - name: Run audit
        env:
          STACKSAGE_LICENSE: \${{ secrets.STACKSAGE_LICENSE }}
        run: |
          stacksage audit \\
            --use-cloudwatch \\
            --use-cost-explorer \\
            --out ./results

      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: stacksage-report-\${{ github.run_number }}
          path: results/
          retention-days: 30`}</code></pre>

            <p>
                Push this file to your default branch. The audit will run automatically every Monday
                and can be triggered manually from the <strong>Actions</strong> tab at any time.
            </p>

            <h2>scan vs audit — which to use in CI?</h2>
            <p>
                Use <code>stacksage audit</code> in CI/CD pipelines — it explicitly validates the license,
                writes structured artifacts (HTML, JSON, CSV), and has no browser pop. Use{" "}
                <code>stacksage scan</code> for interactive runs on your laptop.
            </p>

            <h2>Viewing the report</h2>
            <p>
                After the workflow completes, go to <strong>Actions → your workflow run → Artifacts</strong> and
                download <code>stacksage-report-N.zip</code>. Open <code>audit_report.html</code> in your browser.
            </p>

            <h2>Optional: scan multiple regions</h2>
            <pre><code>{`stacksage audit \\
  --use-cloudwatch \\
  --use-cost-explorer \\
  --regions us-east-1,eu-west-1,ap-southeast-1 \\
  --out ./results`}</code></pre>

            <h2>Optional: use a stacksage.yml config file</h2>
            <p>
                Add a <code>stacksage.yml</code> to your repo root to set exclusions, thresholds, and
                required tags. StackSage picks it up automatically from the working directory.
                See the <Link className="underline" href="/docs/configuration/">Configuration guide</Link>.
            </p>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/iam-policy/">IAM Policy Setup — least-privilege read-only role</Link></li>
                <li><Link className="underline" href="/docs/cli-reference/">CLI Reference — all flags for stacksage audit</Link></li>
                <li><Link className="underline" href="/docs/configuration/">Configuration — exclusions, thresholds, stacksage.yml</Link></li>
                <li><Link className="underline" href="/docs/troubleshooting/">Troubleshooting — common failures</Link></li>
            </ul>
        </div>
    );
}
