import { Metadata } from "next";
import Link from "next/link";
import { Terminal, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Troubleshooting - StackSage Documentation",
    description: "Common issues and solutions for StackSage",
};

export default function TroubleshootingPage() {
    return (
        <div
            className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
            [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4"
        >
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Troubleshooting</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                Solutions to common issues when running StackSage audits.
            </p>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Authentication Issues</h2>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Error: "User is not authorized to perform: sts:AssumeRoleWithWebIdentity"</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                <strong className="text-zinc-900 dark:text-zinc-100">Cause:</strong> The OIDC provider is not configured or the trust policy is incorrect.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                <strong className="text-zinc-900 dark:text-zinc-100">Solution:</strong>
            </p>
            <ol className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li>Verify the OIDC provider exists in IAM Console → Identity providers</li>
                <li>Check the trust policy references the correct GitHub org/repo</li>
                <li>Ensure the audience is set to <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">sts.amazonaws.com</code></li>
            </ol>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`# Verify trust policy
aws iam get-role --role-name StackSageAuditor --query 'Role.AssumeRolePolicyDocument'`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Error: "Access Denied" on specific API calls</h3>
            <p>
                <strong>Cause:</strong> Missing IAM permissions for specific AWS services.
            </p>
            <p>
                <strong>Solution:</strong> Compare your policy against the <Link href="/docs/iam-policy">reference policy</Link> and add missing permissions.
            </p>

            <h2>Detector Issues</h2>

            <h3>Why didn't a detector find my idle resource?</h3>
            <p>
                Detectors use CloudWatch metrics and configurable thresholds. Possible reasons:
            </p>
            <ul>
                <li><strong>Resource too new:</strong> Most detectors skip resources &lt;7 days old</li>
                <li><strong>Metrics not available:</strong> CloudWatch metrics may lag or be incomplete</li>
                <li><strong>Threshold not met:</strong> Resource may be slightly above idle threshold</li>
                <li><strong>Excluded by config:</strong> Check your <code>stacksage.yml</code> exclusions</li>
            </ul>

            <h3>Too many false positives</h3>
            <p>
                <strong>Solution:</strong> Adjust thresholds in <code>stacksage.yml</code>:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`thresholds:
  ebs:
    unattached_days: 14  # More conservative
  nat_gateway:
    idle_threshold_gb_per_day: 0.1  # Stricter threshold
  
reporting:
  min_savings_usd: 25  # Filter out small findings`}</code></pre>
                </div>
            </div>

            <h3>Detector disabled but still showing findings</h3>
            <p>
                <strong>Cause:</strong> Configuration file not loaded or typo in detector name.
            </p>
            <p>
                <strong>Solution:</strong>
            </p>
            <ol>
                <li>Verify <code>stacksage.yml</code> is in repository root</li>
                <li>Check detector ID matches exactly (case-sensitive)</li>
                <li>Look for "Configuration applied" in provenance section of report</li>
            </ol>

            <h2>Report Issues</h2>

            <h3>No report artifact generated</h3>
            <p>
                <strong>Cause:</strong> Workflow failed before upload step.
            </p>
            <p>
                <strong>Solution:</strong>
            </p>
            <ol>
                <li>Check GitHub Actions logs for errors</li>
                <li>Verify AWS credentials are valid</li>
                <li>Ensure output directory matches upload artifact path</li>
            </ol>

            <h3>Report shows "No findings"</h3>
            <p>
                This may be legitimate if your AWS environment is well-optimized! However, verify:
            </p>
            <ul>
                <li><strong>Correct region:</strong> Ensure you're scanning the right AWS region</li>
                <li><strong>Permissions:</strong> Check for "Access Denied" in logs</li>
                <li><strong>Filters too strict:</strong> Review <code>reporting.min_savings_usd</code> and <code>severity_filter</code></li>
            </ul>

            <h2>Configuration Issues</h2>

            <h3>Configuration file not being loaded</h3>
            <p>
                <strong>Symptoms:</strong> No "Configuration applied" in provenance section.
            </p>
            <p>
                <strong>Solution:</strong>
            </p>
            <ol>
                <li>Confirm file is named exactly <code>stacksage.yml</code> (not <code>.yaml</code>)</li>
                <li>Place in repository root (same level as <code>.github/</code>)</li>
                <li>Check YAML syntax with a validator</li>
            </ol>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`# Validate YAML syntax
python -c "import yaml; yaml.safe_load(open('stacksage.yml'))"`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Tag-based exclusion not working</h3>
            <p>
                <strong>Cause:</strong> Resource doesn't have the specified tag, or tag value doesn't match.
            </p>
            <p>
                <strong>Solution:</strong>
            </p>
            <ul>
                <li>Verify tag exists on resource in AWS Console</li>
                <li>Tag matching is case-sensitive (key and value)</li>
                <li>Check report's "Resource Details" section to see actual tags</li>
            </ul>

            <h2>Performance Issues</h2>

            <h3>Workflow takes too long ({">"}15 minutes)</h3>
            <p>
                <strong>Causes:</strong> Large AWS environment, many regions, or API throttling.
            </p>
            <p>
                <strong>Solutions:</strong>
            </p>
            <ul>
                <li><strong>Limit regions:</strong> Only scan regions with resources</li>
                <li><strong>Split workflows:</strong> Create separate workflows per account/region</li>
                <li><strong>Adjust concurrency:</strong> CloudWatch queries run with budget limits</li>
            </ul>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`# Limit to specific regions
exclusions:
  regions:
    - us-west-1
    - eu-central-1
    - ap-northeast-1  # Exclude unused regions`}</code></pre>
                </div>
            </div>

            <h3>CloudWatch API throttling errors</h3>
            <p>
                StackSage automatically handles throttling with exponential backoff. If errors persist:
            </p>
            <ul>
                <li>Consider requesting a CloudWatch API limit increase</li>
                <li>Run audits less frequently (e.g., weekly instead of daily)</li>
                <li>The budget system will skip metrics if quota is exhausted</li>
            </ul>

            <h2>Cost Estimation Issues</h2>

            <h3>Cost estimates seem incorrect</h3>
            <p>
                Cost estimates are approximations based on:
            </p>
            <ul>
                <li>AWS public pricing API (updated quarterly)</li>
                <li>Resource configurations at scan time</li>
                <li>Standard on-demand pricing (no RIs or SPs)</li>
            </ul>
            <p>
                For precise costs, use AWS Cost Explorer or your billing console.
            </p>

            <h2>Getting Help</h2>

            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Still stuck?</h3>
                <div className="space-y-2">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Contact Support:</strong> Email us at <a href="mailto:hello@stacksageai.com" className="underline">hello@stacksageai.com</a>
                    </div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Include Details:</strong> Provide workflow logs, stacksage.yml, and error messages
                    </div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Enable Debug Logging:</strong> Add <code>STACKSAGE_DEBUG=1</code> environment variable
                    </div>
                </div>
            </div>

            <h2>Related Topics</h2>
            <ul>
                <li><Link href="/docs/quick-start">Quick Start Guide</Link></li>
                <li><Link href="/docs/iam-policy">IAM Policy Setup</Link></li>
                <li><Link href="/docs/configuration">Configuration Guide</Link></li>
                <li><Link href="/docs/detectors">All Detectors</Link></li>
            </ul>
        </div>
    );
}
