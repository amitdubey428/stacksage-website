import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, Server } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy & Data Handling - StackSage Documentation",
    description: "How StackSage protects your AWS data and maintains privacy",
};

export default function PrivacyPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Privacy & Data Handling</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                StackSage is designed with privacy as a core principle. Your AWS data never leaves your infrastructure.
            </p>

            <div className="not-prose mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-0">
                                Zero External Transmission
                            </h3>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            All scans run in your GitHub Actions runner. No data is sent to external servers or third parties.
                        </p>
                    </div>
                    <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-0">
                                No Credentials Storage
                            </h3>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                            Uses GitHub OIDC for authentication. No long-lived AWS credentials required.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Architecture Overview</h2>
            <p>
                StackSage runs entirely within your GitHub Actions environment using a privacy-first architecture:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
                    <ol className="space-y-3 mb-0 text-sm text-zinc-700 dark:text-zinc-300">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">1</span>
                            <span>GitHub Actions requests temporary credentials via OIDC</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">2</span>
                            <span>AWS STS issues short-lived credentials (1 hour)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">3</span>
                            <span>StackSage scans your AWS resources using read-only IAM permissions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">4</span>
                            <span>Report is generated and saved as GitHub Actions artifact in your repository</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold">5</span>
                            <span>Credentials expire automatically after workflow completes</span>
                        </li>
                    </ol>
                </div>
            </div>

            <h2>What Data is Collected?</h2>
            <p>
                StackSage collects only the metadata necessary for cost and security analysis:
            </p>

            <h3>Resource Metadata</h3>
            <ul>
                <li>Resource IDs (e.g., <code>i-abc123</code>, <code>vol-xyz789</code>)</li>
                <li>Resource types and configurations</li>
                <li>Creation timestamps and region information</li>
                <li>Tags attached to resources</li>
                <li>Cost estimates from AWS Pricing API</li>
            </ul>

            <h3>CloudWatch Metrics</h3>
            <ul>
                <li>CPU utilization percentages</li>
                <li>Network transfer volumes</li>
                <li>Storage IOPS and throughput</li>
                <li>Database connections and query counts</li>
            </ul>

            <h3>What is NOT Collected</h3>
            <div className="not-prose my-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4">
                <ul className="space-y-1 mb-0 text-sm text-red-800 dark:text-red-200">
                    <li>❌ Application data or file contents</li>
                    <li>❌ Database records or S3 object contents</li>
                    <li>❌ Environment variables or secrets</li>
                    <li>❌ Network packet contents</li>
                    <li>❌ User credentials or access keys</li>
                    <li>❌ Personal Identifiable Information (PII)</li>
                </ul>
            </div>

            <h2>Data Storage</h2>

            <h3>GitHub Actions Artifacts</h3>
            <p>
                Reports are stored as GitHub Actions artifacts, which are:
            </p>
            <ul>
                <li><strong>Encrypted at rest:</strong> GitHub encrypts artifacts with AES-256</li>
                <li><strong>Access controlled:</strong> Only repository collaborators can download</li>
                <li><strong>Temporary:</strong> Artifacts expire after 90 days (configurable)</li>
                <li><strong>Deletable:</strong> You can manually delete artifacts anytime</li>
            </ul>

            <h3>No External Databases</h3>
            <p>
                StackSage does not:
            </p>
            <ul>
                <li>Maintain external databases or storage</li>
                <li>Send telemetry or usage analytics</li>
                <li>Store logs on external servers</li>
                <li>Share data with third parties</li>
            </ul>

            <h2>Docker Image Security</h2>
            <p>
                The StackSage Docker image (<code>ghcr.io/amitdubey428/stacksage-audit</code>) is:
            </p>
            <ul>
                <li><strong>Reproducible:</strong> Built from Dockerfile with version control</li>
                <li><strong>Scanned:</strong> Automated vulnerability scanning</li>
                <li><strong>Minimal:</strong> Based on Python slim image with minimal dependencies</li>
                <li><strong>Verified:</strong> Signed container images for authenticity</li>
            </ul>

            <h2>Compliance Considerations</h2>

            <h3>SOC 2 / ISO 27001</h3>
            <p>
                StackSage's architecture supports compliance requirements:
            </p>
            <ul>
                <li><strong>Data locality:</strong> All processing occurs in your environment</li>
                <li><strong>Audit trail:</strong> GitHub Actions logs provide complete audit trail</li>
                <li><strong>Access control:</strong> Leverages GitHub's existing access controls</li>
                <li><strong>Encryption:</strong> Reports encrypted at rest by GitHub</li>
            </ul>

            <h3>GDPR / Data Residency</h3>
            <p>
                Since StackSage runs in your GitHub Actions:
            </p>
            <ul>
                <li>You control where data is processed (GitHub's data centers)</li>
                <li>No data transfer to third parties</li>
                <li>You maintain data controller status</li>
                <li>Data retention policies are under your control</li>
            </ul>

            <h2>Network Communication</h2>
            <p>
                During execution, StackSage communicates only with:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="text-left py-2">Service</th>
                                <th className="text-left py-2">Purpose</th>
                                <th className="text-left py-2">Data Sent</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-700 dark:text-zinc-300">
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <td className="py-2">AWS STS</td>
                                <td className="py-2">Authentication</td>
                                <td className="py-2">OIDC token (GitHub-issued)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <td className="py-2">AWS API</td>
                                <td className="py-2">Resource discovery</td>
                                <td className="py-2">API requests (describe/list)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <td className="py-2">CloudWatch</td>
                                <td className="py-2">Metric queries</td>
                                <td className="py-2">Resource IDs, time ranges</td>
                            </tr>
                            <tr>
                                <td className="py-2">AWS Pricing API</td>
                                <td className="py-2">Cost estimation</td>
                                <td className="py-2">Region, instance types</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2>Sensitive Data Handling</h2>

            <h3>Resource Tags</h3>
            <p>
                Tags may contain sensitive information. StackSage includes them in reports for context. If you have sensitive tags:
            </p>
            <ul>
                <li>Restrict who can download GitHub Actions artifacts</li>
                <li>Use tag exclusions to filter sensitive tags from reports</li>
                <li>Consider using GitHub's private repositories</li>
            </ul>

            <h3>Cost Information</h3>
            <p>
                Cost estimates in reports may be considered confidential. Protect reports by:
            </p>
            <ul>
                <li>Limiting repository access to authorized personnel</li>
                <li>Using GitHub's role-based access controls</li>
                <li>Enabling branch protection for workflow files</li>
            </ul>

            <h2>Security Best Practices</h2>
            <ol>
                <li><strong>Use OIDC:</strong> Avoid storing AWS access keys in GitHub Secrets</li>
                <li><strong>Read-only IAM:</strong> Use least-privilege IAM policies</li>
                <li><strong>Private repos:</strong> Store workflows in private repositories</li>
                <li><strong>Branch protection:</strong> Require reviews for workflow changes</li>
                <li><strong>Regular audits:</strong> Review GitHub Actions logs periodically</li>
                <li><strong>Artifact cleanup:</strong> Delete old artifacts to reduce data retention</li>
            </ol>

            <h2>Incident Response</h2>
            <p>
                If you suspect a security issue:
            </p>
            <ol>
                <li>Revoke GitHub OIDC provider trust immediately</li>
                <li>Delete the IAM role in AWS</li>
                <li>Review CloudTrail logs for unauthorized API calls</li>
                <li>Report security vulnerabilities to: <a href="mailto:security@stacksageai.com">security@stacksageai.com</a></li>
            </ol>

            <h2>Questions?</h2>
            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Have privacy or security questions? We're here to help:
                </p>
                <ul className="space-y-1 mb-0 text-sm text-blue-800 dark:text-blue-200">
                    <li>📧 Email: <a href="mailto:privacy@stacksageai.com" className="underline">privacy@stacksageai.com</a></li>
                    <li>🔒 Security: <a href="mailto:security@stacksageai.com" className="underline">security@stacksageai.com</a></li>
                    <li>💬 Support: <a href="mailto:hello@stacksageai.com" className="underline">hello@stacksageai.com</a></li>
                </ul>
            </div>

            <h2>Related Topics</h2>
            <ul>
                <li><Link href="/docs/iam-policy">IAM Policy Setup</Link></li>
                <li><Link href="/docs/security">Security Best Practices</Link></li>
                <li><Link href="/docs/github-actions">GitHub Actions Configuration</Link></li>
            </ul>
        </div>
    );
}
