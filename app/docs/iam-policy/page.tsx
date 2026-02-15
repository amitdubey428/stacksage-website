import { Metadata } from "next";
import Link from "next/link";
import { Shield, Terminal, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "IAM Policy Setup - StackSage Documentation",
    description: "Configure AWS IAM permissions for StackSage audits",
};

export default function IAMPolicyPage() {
    return (
        <div
            className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
            [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4"
        >
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">IAM Policy Setup</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                Configure AWS IAM roles and policies to grant StackSage read-only access to your AWS resources.
            </p>

            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Privacy-First Architecture
                        </p>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                            StackSage runs entirely in your GitHub Actions environment. Your AWS credentials never leave your infrastructure.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Overview</h2>
            <p>
                StackSage requires an IAM role in your AWS account with read-only permissions. This role will be assumed by GitHub Actions using OIDC (OpenID Connect) - no long-lived credentials needed.
            </p>

            <h2>Step 1: Create Trust Policy</h2>
            <p>
                Create a file <code>trust-policy.json</code> that allows GitHub Actions to assume the role:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_ORG/YOUR_REPO:*"
        }
      }
    }
  ]
}`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="not-prose my-6 rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5 text-orange-600 dark:text-orange-400" />
                    <div>
                        <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-1">
                            First-Time Setup
                        </p>
                        <p className="text-sm text-orange-800 dark:text-orange-200 mb-0">
                            If you haven't set up GitHub OIDC before, you'll need to create the OIDC provider first. See{" "}
                            <a href="https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services" target="_blank" rel="noopener noreferrer" className="underline">
                                GitHub's documentation
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>

            <h2>Step 2: Create IAM Role</h2>
            <p>
                Create the IAM role using the trust policy:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`aws iam create-role \\
  --role-name StackSageAuditor \\
  --assume-role-policy-document file://trust-policy.json \\
  --description "Read-only role for StackSage AWS audits"`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Step 3: Create Custom Policy</h2>
            <p>
                Create a file <code>stacksage-policy.json</code> with the required permissions:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "StackSageReadOnly",
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "ec2:Get*",
        "s3:ListAllMyBuckets",
        "s3:GetBucket*",
        "s3control:GetPublicAccessBlock",
        "rds:Describe*",
        "rds:ListTagsForResource",
        "iam:GetAccountSummary",
        "iam:GetAccountPasswordPolicy",
        "iam:ListUsers",
        "iam:ListAccessKeys",
        "iam:GetAccessKeyLastUsed",
        "cloudtrail:DescribeTrails",
        "cloudtrail:GetTrailStatus",
        "config:DescribeConfigurationRecorderStatus",
        "guardduty:ListDetectors",
        "securityhub:DescribeHub",
        "access-analyzer:ListAnalyzers",
        "access-analyzer:ListFindings",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:DescribeAlarms",
        "cloudwatch:ListMetrics",
        "elasticloadbalancing:Describe*",
        "lambda:ListFunctions",
        "lambda:GetFunction",
        "lambda:ListTags",
        "ce:GetCostAndUsage",
        "ce:GetDimensionValues",
        "pricing:GetProducts",
        "tag:GetResources",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Resource": "*"
    }
  ]
}`}</code></pre>
                </div>
            </div>

            <h2>Step 4: Attach Policy</h2>
            <p>
                Create and attach the custom policy to the role:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`# Create the policy
aws iam create-policy \\
  --policy-name StackSageAuditPolicy \\
  --policy-document file://stacksage-policy.json

# Attach to role
aws iam attach-role-policy \\
  --role-name StackSageAuditor \\
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/StackSageAuditPolicy`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Step 5: Configure GitHub Secrets</h2>
            <p>
                Add the role ARN to your GitHub repository secrets:
            </p>
            <ol>
                <li>Go to your repository → Settings → Secrets and variables → Actions</li>
                <li>Click "New repository secret"</li>
                <li>Name: <code>AWS_ROLE_ARN</code></li>
                <li>Value: <code>arn:aws:iam::YOUR_ACCOUNT_ID:role/StackSageAuditor</code></li>
            </ol>

            <h2>Alternative: Using AWS Managed Policies</h2>
            <p>
                For quick setup, you can use AWS managed policies (though custom policies are more restrictive):
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`aws iam attach-role-policy \\
  --role-name StackSageAuditor \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

aws iam attach-role-policy \\
  --role-name StackSageAuditor \\
  --policy-arn arn:aws:iam::aws:policy/CloudWatchReadOnlyAccess`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Verification</h2>
            <p>
                Test your IAM setup by running the workflow manually:
            </p>
            <ol>
                <li>Go to your repository's Actions tab</li>
                <li>Select "StackSage AWS Audit"</li>
                <li>Click "Run workflow"</li>
                <li>Check for authentication errors in the logs</li>
            </ol>

            <h2>Multi-Account Setup</h2>
            <p>
                To audit multiple AWS accounts, create the role in each account with the same name, then configure your workflow to loop through accounts:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`strategy:
  matrix:
    account:
      - name: Production
        role: arn:aws:iam::111111111111:role/StackSageAuditor
      - name: Staging
        role: arn:aws:iam::222222222222:role/StackSageAuditor
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: \${{ matrix.account.role }}`}</code></pre>
                </div>
            </div>

            <h2>Security Best Practices</h2>
            <ul>
                <li><strong>Use OIDC:</strong> Avoid long-lived access keys</li>
                <li><strong>Scope trust policy:</strong> Limit to specific repositories</li>
                <li><strong>Custom policies:</strong> Use least-privilege custom policies over managed policies</li>
                <li><strong>Regular audits:</strong> Review role permissions quarterly</li>
                <li><strong>CloudTrail:</strong> Monitor AssumeRole API calls for the StackSage role</li>
            </ul>

            <h2>Troubleshooting</h2>

            <h3>Error: "User is not authorized to perform: sts:AssumeRoleWithWebIdentity"</h3>
            <p>
                The OIDC provider is not configured or the trust policy is incorrect. Verify:
            </p>
            <ul>
                <li>OIDC provider exists in IAM console</li>
                <li>Trust policy references correct GitHub org/repo</li>
                <li>Trust policy condition matches <code>sts.amazonaws.com</code></li>
            </ul>

            <h3>Error: "Access Denied" on specific API calls</h3>
            <p>
                The attached policy is missing required permissions. Compare against the custom policy above.
            </p>

            <h2>Related Topics</h2>
            <ul>
                <li><Link href="/docs/quick-start">Quick Start Guide</Link></li>
                <li><Link href="/docs/privacy">Privacy & Data Handling</Link></li>
                <li><Link href="/docs/troubleshooting">Troubleshooting</Link></li>
            </ul>
        </div>
    );
}
