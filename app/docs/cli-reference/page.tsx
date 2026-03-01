import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CLI Reference — StackSage Docs",
    description: "Full reference for the stacksage scan command — options, flags, and examples.",
};

export default function CliReferencePage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>CLI Reference</h1>
            <p className="lead">
                StackSage is installed via pip and runs entirely on your machine. The primary command is{" "}
                <code>stacksage scan</code>.
            </p>

            <h2>Installation</h2>
            <pre><code>{`pip install stacksage`}</code></pre>

            <h2>stacksage scan</h2>
            <p>
                Runs a full AWS audit: scans resources, analyses waste, estimates savings, and opens an HTML report in your browser.
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
                        <td>default</td>
                        <td>AWS named profile or SSO profile to use for credentials.</td>
                    </tr>
                    <tr>
                        <td><code>--role-arn TEXT</code></td>
                        <td>—</td>
                        <td>Assume this read-only IAM role ARN instead of local credentials.</td>
                    </tr>
                    <tr>
                        <td><code>--regions TEXT</code></td>
                        <td>all enabled</td>
                        <td>Comma-separated list of AWS regions to scan, e.g. <code>us-east-1,eu-west-1</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--out DIRECTORY</code></td>
                        <td><code>reports/</code></td>
                        <td>Directory to write report files into.</td>
                    </tr>
                    <tr>
                        <td><code>--format [html|json]</code></td>
                        <td><code>html</code></td>
                        <td>Output format. <code>html</code> opens automatically in your browser.</td>
                    </tr>
                    <tr>
                        <td><code>--cw-days INTEGER</code></td>
                        <td><code>14</code></td>
                        <td>CloudWatch metrics lookback window in days.</td>
                    </tr>
                    <tr>
                        <td><code>--cw-max-queries INTEGER</code></td>
                        <td><code>200</code></td>
                        <td>Maximum CloudWatch API calls per run. Limits cost and time. Findings that hit the cap are flagged as <code>skipped-budget</code>.</td>
                    </tr>
                    <tr>
                        <td><code>--log-level TEXT</code></td>
                        <td><code>INFO</code></td>
                        <td>Structured JSON log verbosity: <code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>, <code>ERROR</code>.</td>
                    </tr>
                </tbody>
            </table>

            <h2>Examples</h2>

            <h3>Default credentials</h3>
            <pre><code>{`stacksage scan`}</code></pre>

            <h3>Named AWS profile or SSO</h3>
            <pre><code>{`stacksage scan --profile my-sso-profile`}</code></pre>

            <h3>Cross-account read-only role</h3>
            <pre><code>{`stacksage scan --role-arn arn:aws:iam::123456789012:role/StackSageReadOnly`}</code></pre>

            <h3>Specific regions only</h3>
            <pre><code>{`stacksage scan --regions us-east-1,eu-west-1`}</code></pre>

            <h3>Save JSON output</h3>
            <pre><code>{`stacksage scan --format json --out ./audit-results`}</code></pre>

            <h3>Unlock all findings with a license</h3>
            <pre><code>{`export STACKSAGE_LICENSE=your-license-key
stacksage scan`}</code></pre>

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
                        <td>License key to unlock all findings (free tier shows top 50).</td>
                    </tr>
                    <tr>
                        <td><code>STACKSAGE_PRICING_MODE</code></td>
                        <td>Set to <code>api</code> to use the live AWS Pricing API for EC2 (default: static).</td>
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

            <h2>GitHub Actions</h2>
            <p>
                For automated audits in CI/CD pipelines, StackSage also ships as a GitHub Actions Docker action.
                See the <Link className="underline" href="/docs/github-actions/">GitHub Actions guide</Link>.
            </p>

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
