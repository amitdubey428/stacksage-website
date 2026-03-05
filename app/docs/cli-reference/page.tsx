import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CLI Reference — StackSage Docs",
    description: "Full CLI reference for stacksage scan and stacksage audit — all options, flags, and examples.",
};

export default function CliReferencePage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>CLI Reference</h1>
            <p className="lead">
                StackSage is installed via pip and runs entirely on your machine. It has two commands:
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Command</th>
                        <th>Requires license?</th>
                        <th>Use case</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>stacksage scan</code></td>
                        <td>No</td>
                        <td>Self-serve: run locally or in CI. Free tier shows top 50 findings by savings.</td>
                    </tr>
                    <tr>
                        <td><code>stacksage audit</code></td>
                        <td>Yes (<code>STACKSAGE_LICENSE</code>)</td>
                        <td>Licensed: all findings + remediation plan. Designed for CI/CD pipelines.</td>
                    </tr>
                </tbody>
            </table>

            <h2>Installation</h2>
            <pre><code>{`pip install stacksage`}</code></pre>

            {/* ── stacksage scan ── */}
            <h2>stacksage scan</h2>
            <p>
                Scans your AWS account, analyses waste, estimates savings, and opens an HTML report in your browser.
                No license required — free tier shows your top 50 findings ranked by estimated monthly savings.
                Security &amp; posture checks are always shown in full.
            </p>
            <pre><code>{`stacksage scan [OPTIONS]`}</code></pre>

            <h3>Options</h3>
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>--profile TEXT</code></td>
                        <td>—</td>
                        <td>AWS named profile or SSO profile (e.g. <code>my-sso-profile</code>). Uses default credentials if omitted.</td>
                    </tr>
                    <tr>
                        <td><code>--role-arn TEXT</code></td>
                        <td>—</td>
                        <td>Assume this read-only IAM role ARN. Takes precedence over <code>--profile</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--external-id TEXT</code></td>
                        <td>—</td>
                        <td>ExternalId to pass when assuming the role (optional).</td>
                    </tr>
                    <tr>
                        <td><code>--regions TEXT</code></td>
                        <td>all enabled</td>
                        <td>Comma-separated AWS regions to scan, e.g. <code>us-east-1,eu-west-1</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--out DIRECTORY</code></td>
                        <td><code>reports/</code></td>
                        <td>Directory to write report files into.</td>
                    </tr>
                    <tr>
                        <td><code>--use-cloudwatch</code></td>
                        <td>off</td>
                        <td>Enable CloudWatch utilisation metrics for more accurate findings (recommended).</td>
                    </tr>
                    <tr>
                        <td><code>--use-cost-explorer</code></td>
                        <td>off</td>
                        <td>Include historical spend summary from Cost Explorer.</td>
                    </tr>
                    <tr>
                        <td><code>--check-tagging</code></td>
                        <td>off</td>
                        <td>Flag resources missing required tags (opt-in to reduce noise).</td>
                    </tr>
                    <tr>
                        <td><code>--cw-days INTEGER</code></td>
                        <td><code>14</code></td>
                        <td>CloudWatch metrics lookback window in days.</td>
                    </tr>
                    <tr>
                        <td><code>--cw-max-queries INTEGER</code></td>
                        <td><code>500</code></td>
                        <td>Maximum CloudWatch API calls per run. Findings that hit the cap are flagged as <code>skipped-budget</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--no-browser</code></td>
                        <td>off</td>
                        <td>Do not auto-open the HTML report in a browser after the scan.</td>
                    </tr>
                    <tr>
                        <td><code>--demo</code></td>
                        <td>off</td>
                        <td>Run with synthetic data — no AWS calls or credentials needed.</td>
                    </tr>
                    <tr>
                        <td><code>--log-level TEXT</code></td>
                        <td><code>INFO</code></td>
                        <td>Structured JSON log verbosity: <code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>, <code>ERROR</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--quiet</code></td>
                        <td>off</td>
                        <td>Suppress progress output.</td>
                    </tr>
                </tbody>
            </table>

            <h3>Examples</h3>

            <h4>Default credentials</h4>
            <pre><code>{`stacksage scan`}</code></pre>

            <h4>Named AWS profile or SSO</h4>
            <pre><code>{`stacksage scan --profile my-sso-profile`}</code></pre>

            <h4>Cross-account read-only role</h4>
            <pre><code>{`stacksage scan --role-arn arn:aws:iam::123456789012:role/StackSageReadOnly`}</code></pre>

            <h4>Recommended flags for a thorough scan</h4>
            <pre><code>{`stacksage scan --use-cloudwatch --use-cost-explorer --check-tagging`}</code></pre>

            <h4>Specific regions, no browser</h4>
            <pre><code>{`stacksage scan --regions us-east-1,eu-west-1 --no-browser`}</code></pre>

            <h4>Unlock all findings with a license</h4>
            <pre><code>{`export STACKSAGE_LICENSE=your-license-key
stacksage scan`}</code></pre>

            {/* ── stacksage audit ── */}
            <h2>stacksage audit</h2>
            <p>
                Runs a full licensed audit. Requires a valid license key in the{" "}
                <code>STACKSAGE_LICENSE</code> environment variable. Unlocks all findings, the full
                remediation plan, and every report section. Designed for CI/CD pipelines and
                scheduled audits.
            </p>
            <pre><code>{`STACKSAGE_LICENSE=your-key stacksage audit [OPTIONS]`}</code></pre>

            <h3>Options</h3>
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>--profile TEXT</code></td>
                        <td>—</td>
                        <td>AWS named profile or SSO profile. Uses default credentials if omitted.</td>
                    </tr>
                    <tr>
                        <td><code>--role-arn TEXT</code></td>
                        <td>—</td>
                        <td>Assume this read-only IAM role ARN. Takes precedence over <code>--profile</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--external-id TEXT</code></td>
                        <td>—</td>
                        <td>ExternalId to pass when assuming the role (optional).</td>
                    </tr>
                    <tr>
                        <td><code>--regions TEXT</code></td>
                        <td>all enabled</td>
                        <td>Comma-separated AWS regions to scan.</td>
                    </tr>
                    <tr>
                        <td><code>--out DIRECTORY</code></td>
                        <td><code>reports/</code></td>
                        <td>Directory to write report files into.</td>
                    </tr>
                    <tr>
                        <td><code>--format [html|json]</code></td>
                        <td><code>html</code></td>
                        <td>Output format. <code>json</code> prints the raw findings object.</td>
                    </tr>
                    <tr>
                        <td><code>--use-cloudwatch</code></td>
                        <td>off</td>
                        <td>Enable CloudWatch utilisation metrics (recommended).</td>
                    </tr>
                    <tr>
                        <td><code>--use-cost-explorer</code></td>
                        <td>off</td>
                        <td>Include historical spend summary from Cost Explorer.</td>
                    </tr>
                    <tr>
                        <td><code>--live</code></td>
                        <td>off</td>
                        <td>Convenience flag: enables <code>--use-cloudwatch</code>, <code>--use-cost-explorer</code>, and <code>--live-pricing</code> in one flag.</td>
                    </tr>
                    <tr>
                        <td><code>--check-tagging</code></td>
                        <td>off</td>
                        <td>Flag resources missing required tags (opt-in).</td>
                    </tr>
                    <tr>
                        <td><code>--cw-days INTEGER</code></td>
                        <td><code>14</code></td>
                        <td>CloudWatch metrics lookback window in days.</td>
                    </tr>
                    <tr>
                        <td><code>--cw-max-queries INTEGER</code></td>
                        <td><code>500</code></td>
                        <td>Maximum CloudWatch API calls per run.</td>
                    </tr>
                    <tr>
                        <td><code>--live-pricing</code></td>
                        <td>off</td>
                        <td>Use the live AWS Pricing API for EC2 rates (default: static prices).</td>
                    </tr>
                    <tr>
                        <td><code>--demo</code></td>
                        <td>off</td>
                        <td>Run with synthetic data — useful for testing the pipeline.</td>
                    </tr>
                    <tr>
                        <td><code>--log-level TEXT</code></td>
                        <td><code>INFO</code></td>
                        <td><code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>, <code>ERROR</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--quiet</code></td>
                        <td>off</td>
                        <td>Suppress progress output (errors only).</td>
                    </tr>
                </tbody>
            </table>

            <h3>Examples</h3>

            <h4>Basic licensed audit</h4>
            <pre><code>{`export STACKSAGE_LICENSE=your-license-key
stacksage audit --profile my-sso-profile --use-cloudwatch --use-cost-explorer`}</code></pre>

            <h4>Cross-account role in CI</h4>
            <pre><code>{`STACKSAGE_LICENSE=$LICENSE stacksage audit \\
  --role-arn arn:aws:iam::123456789012:role/StackSageReadOnly \\
  --use-cloudwatch --use-cost-explorer \\
  --out ./results`}</code></pre>

            <h4>Full live mode (CloudWatch + Cost Explorer + live pricing)</h4>
            <pre><code>{`STACKSAGE_LICENSE=$LICENSE stacksage audit --live --out ./results`}</code></pre>

            <h4>GitHub Actions workflow snippet</h4>
            <pre><code>{`- name: Run StackSage audit
  env:
    STACKSAGE_LICENSE: $\{{ secrets.STACKSAGE_LICENSE }}
  run: |
    stacksage audit \\
      --role-arn arn:aws:iam::123456789012:role/StackSageReadOnly \\
      --use-cloudwatch --use-cost-explorer \\
      --out ./results

- name: Upload report
  uses: actions/upload-artifact@v4
  with:
    name: stacksage-report-$\{{ github.run_number }}
    path: results/
    retention-days: 30`}</code></pre>
            <p>See the <Link className="underline" href="/docs/github-actions/">GitHub Actions setup guide</Link> for the full workflow including OIDC role assumption.</p>

            <h4>JSON output for downstream processing</h4>
            <pre><code>{`STACKSAGE_LICENSE=$LICENSE stacksage audit --format json --out ./results`}</code></pre>

            {/* ── Environment variables ── */}
            <h2>Environment variables</h2>
            <table>
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>STACKSAGE_LICENSE</code></td>
                        <td>License key. Required for <code>stacksage audit</code>. Also unlocks all findings in <code>stacksage scan</code>.</td>
                    </tr>
                    <tr>
                        <td><code>STACKSAGE_PRICING_MODE</code></td>
                        <td>Set to <code>api</code> to use the live AWS Pricing API for EC2 rates (default: <code>static</code>).</td>
                    </tr>
                    <tr>
                        <td><code>AWS_PROFILE</code></td>
                        <td>Standard AWS profile env var — respected by StackSage.</td>
                    </tr>
                    <tr>
                        <td><code>AWS_DEFAULT_REGION</code></td>
                        <td>Standard AWS region env var — respected by StackSage.</td>
                    </tr>
                </tbody>
            </table>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/quick-start/">Quick Start</Link></li>
                <li><Link className="underline" href="/docs/iam-policy/">IAM Policy Setup</Link></li>
                <li><Link className="underline" href="/docs/configuration/">Configuration</Link></li>
                <li><Link className="underline" href="/docs/troubleshooting/">Troubleshooting</Link></li>
            </ul>
        </div>
    );
}
