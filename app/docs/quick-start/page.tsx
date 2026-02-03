import { Metadata } from "next";
import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Quick Start - StackSage Documentation",
    description: "Get started with StackSage in minutes",
};

export default function QuickStartPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h1>Quick Start</h1>
            <p className="lead">
                Get StackSage running in your GitHub repository in under 5 minutes.
            </p>

            <h2>Prerequisites</h2>
            <ul>
                <li>An AWS account with resources to audit</li>
                <li>A GitHub repository</li>
                <li>AWS IAM permissions to create roles and policies</li>
            </ul>

            <h2>Step 1: Set Up AWS IAM</h2>
            <p>
                Create a read-only IAM role for StackSage to assume. This role needs permissions to describe your AWS resources
                and access CloudWatch metrics.
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`# Create the IAM role using AWS CLI
aws iam create-role \\
  --role-name StackSageAuditor \\
  --assume-role-policy-document file://trust-policy.json

# Attach the read-only policy
aws iam attach-role-policy \\
  --role-name StackSageAuditor \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

# Attach CloudWatch read policy
aws iam attach-role-policy \\
  --role-name StackSageAuditor \\
  --policy-arn arn:aws:iam::aws:policy/CloudWatchReadOnlyAccess`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <p>
                See the <Link href="/docs/iam-policy">IAM Policy Setup</Link> guide for detailed instructions and policy templates.
            </p>

            <h2>Step 2: Add GitHub Secrets</h2>
            <p>
                In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:
            </p>
            <ul>
                <li><code>AWS_ROLE_ARN</code> - The ARN of the IAM role you created (e.g., <code>arn:aws:iam::123456789012:role/StackSageAuditor</code>)</li>
                <li><code>AWS_REGION</code> - Your primary AWS region (e.g., <code>us-east-1</code>)</li>
            </ul>

            <h2>Step 3: Create GitHub Actions Workflow</h2>
            <p>
                Create <code>.github/workflows/stacksage-audit.yml</code> in your repository:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`name: StackSage AWS Audit

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
  workflow_dispatch:  # Manual trigger

permissions:
  id-token: write
  contents: read

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: \${{ secrets.AWS_REGION }}
      
      - name: Run StackSage Audit
        uses: docker://ghcr.io/amitdubey428/stacksage-audit:latest
        with:
          args: --format html --output-dir ./reports
      
      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: stacksage-report
          path: reports/`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Step 4: Run Your First Audit</h2>
            <p>
                Go to your repository's Actions tab, select the "StackSage AWS Audit" workflow, and click "Run workflow".
                After a few minutes, download the report artifact to view your findings.
            </p>

            <div className="not-prose my-8 rounded-lg border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">🎉 Success!</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                    You've completed your first StackSage audit. Your report will show cost optimization opportunities and security findings.
                </p>
                <Link
                    href="/docs/configuration"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                    Next: Configure StackSage <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <h2>What's Next?</h2>
            <ul>
                <li><Link href="/docs/configuration">Configure exclusions and thresholds</Link></li>
                <li><Link href="/docs/detectors">Learn about available detectors</Link></li>
                <li><Link href="/docs/github-actions">Advanced GitHub Actions setup</Link></li>
                <li><Link href="/docs/troubleshooting">Troubleshooting common issues</Link></li>
            </ul>
        </div>
    );
}
