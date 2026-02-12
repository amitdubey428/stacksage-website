import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
    title: "Licensing & Trial - StackSage Documentation",
    description: "Understanding StackSage trial and full license options",
};

export default function LicensingPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Licensing & Trial</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                StackSage offers both a free trial version and full licensed version. Both run entirely in your GitHub Actions—no external data transmission.
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-blue-600 p-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Trial Version</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li>✓ No license required</li>
                        <li>✓ Runs in your GitHub Actions</li>
                        <li>✓ Basic security & compliance checks</li>
                        <li>✓ Minimal IAM permissions</li>
                        <li>✓ Real findings with capped results</li>
                        <li>✗ Limited detector coverage</li>
                        <li>✗ No cost optimization analysis</li>
                        <li>✗ No remediation plans</li>
                        <li>✗ No multi-account support</li>
                    </ul>
                </div>

                <div className="rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-green-600 p-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">Full License</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                        <li>✓ Complete detector suite (50+ checks)</li>
                        <li>✓ Cost optimization & savings estimates</li>
                        <li>✓ Detailed remediation plans</li>
                        <li>✓ Multi-account rollup reporting</li>
                        <li>✓ Unlimited findings</li>
                        <li>✓ Extended CloudWatch metrics analysis</li>
                        <li>✓ Priority support</li>
                        <li>✓ Quarterly license renewal included</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Trial Version Setup</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                The trial version is perfect for evaluating StackSage before committing to a full license. It runs entirely within your GitHub Actions with no external dependencies.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">What You Get</h3>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Security posture checks</strong> - Basic security and compliance detectors</li>
                <li><strong>Real audit reports</strong> - HTML, JSON, CSV, and Markdown formats</li>
                <li><strong>Finding previews</strong> - See actual issues in your AWS environment (capped results)</li>
                <li><strong>No license key required</strong> - Use the public trial image immediately</li>
            </ul>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Trial Limitations</h3>
            <div className="not-prose my-6 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-6">
                <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                        <p><strong>Intentional Restrictions:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Runs a subset of detectors (security focus only)</li>
                            <li>Findings are capped per detector</li>
                            <li>No cost optimization or waste detection</li>
                            <li>No savings estimates or ROI calculations</li>
                            <li>No remediation plans or automation scripts</li>
                            <li>Single-account only (no multi-account rollups)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Setting Up Trial</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Trial setup uses a minimal IAM policy and a simplified workflow:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Create minimal IAM role</strong> - Uses <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">trial-read-only-policy.json</code> (fewer permissions than full version)</li>
                <li><strong>Add GitHub secrets</strong> - Only AWS credentials required (no license key)</li>
                <li><strong>Install trial workflow</strong> - Copy <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">customer_run_audit_trial.yml</code></li>
                <li><strong>Run audit</strong> - Get results in minutes</li>
            </ol>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                See the <Link href="/docs/quick-start" className="text-blue-600 dark:text-blue-400 hover:underline">Quick Start Guide</Link> for step-by-step trial setup instructions.
            </p>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Full License</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                The full license unlocks all StackSage features, including cost optimization analysis, detailed remediation plans, and multi-account support.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">What's Included</h3>
            <div className="not-prose overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">Feature</th>
                            <th className="px-4 py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100">Trial</th>
                            <th className="px-4 py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100">Full License</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Security & compliance detectors</td>
                            <td className="px-4 py-3 text-center"><span className="text-blue-600 dark:text-blue-400">Basic</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">50+ checks</span></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Cost optimization analysis</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Savings estimates & ROI</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Remediation plans</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Multi-account rollup</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Finding limits</td>
                            <td className="px-4 py-3 text-center"><span className="text-amber-600 dark:text-amber-400">Capped</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">Unlimited</span></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">CloudWatch metrics analysis</td>
                            <td className="px-4 py-3 text-center"><span className="text-blue-600 dark:text-blue-400">Basic</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">Extended</span></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Report formats</td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">All</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">All</span></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Support</td>
                            <td className="px-4 py-3 text-center"><span className="text-zinc-500 dark:text-zinc-500">Community</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">Priority</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">How Licensing Works</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                StackSage uses offline-verifiable time-limited licenses:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Offline verification</strong> - License is validated locally in your GitHub Actions runner (no phone-home)</li>
                <li><strong>Time-limited</strong> - Licenses expire after a fixed period (typically quarterly)</li>
                <li><strong>Ed25519 signatures</strong> - Cryptographically signed to prevent tampering</li>
                <li><strong>Customer-specific</strong> - Each license is issued to your organization</li>
                <li><strong>Environment variable</strong> - Stored as <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code> GitHub secret</li>
            </ul>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">License Format</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Licenses are encoded strings in the format:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <code className="text-sm text-zinc-700 dark:text-zinc-300">STACKSAGE1.&lt;payload&gt;.&lt;signature&gt;</code>
                </div>
            </div>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                The payload contains:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">customer</code> - Your organization name</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">plan</code> - License tier (e.g., "standard", "enterprise")</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">expires_at</code> - Expiration timestamp (ISO 8601)</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">issued_at</code> - Issue date</li>
            </ul>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Setting Up Full License</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                When you purchase a StackSage license, you'll receive:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Private Docker image access</strong> - GHCR credentials for pulling the full version</li>
                <li><strong>License key</strong> - Time-limited license string</li>
                <li><strong>Full IAM policy</strong> - Complete permissions for all detectors</li>
                <li><strong>Production workflow</strong> - Enhanced workflow with all features enabled</li>
            </ol>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Store these as GitHub secrets:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_IMAGE</code> - Full version Docker image URL</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_GHCR_USERNAME</code> - GHCR username</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_GHCR_TOKEN</code> - GHCR access token</li>
                <li><code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code> - Your license key</li>
            </ul>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">License Renewal</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Licenses are typically issued quarterly. Before expiration, you'll receive a new license key via email. Update the <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code> secret in your GitHub repository to continue using the full version.
            </p>

            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                    <strong>Grace Period:</strong> Licenses include a small grace period (60 seconds) to prevent failures at the exact expiration boundary.
                </p>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Upgrading from Trial</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Transitioning from trial to full license is straightforward:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Update IAM policy</strong> - Replace trial policy with full <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">read-only-policy.json</code></li>
                <li><strong>Switch workflow</strong> - Replace trial workflow with <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">customer_run_audit_ghcr.yml</code></li>
                <li><strong>Add license secrets</strong> - Add the four GHCR/license secrets from your welcome email</li>
                <li><strong>Run full audit</strong> - Unlock all detectors and features</li>
            </ol>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Your trial reports and configurations are compatible with the full version—no data migration needed.
            </p>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Privacy Guarantee</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Both trial and licensed versions respect your privacy:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />All audits run in <strong>your</strong> GitHub Actions runners</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />AWS credentials never leave your environment</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />No data transmission to StackSage infrastructure</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />License verification is offline (no phone-home)</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />Reports stored as GitHub artifacts in your account</li>
            </ul>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                See our <Link href="/docs/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy & Data Handling</Link> guide for complete details.
            </p>

            <div className="not-prose my-8 rounded-lg border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Ready to Get Started?</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                    Start with the trial to see StackSage in action, then upgrade to the full license when you're ready to unlock cost optimization and advanced features.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/docs/quick-start"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Start Trial
                    </Link>
                    <a
                        href="mailto:hello@stacksageai.com"
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
                    >
                        Request License
                    </a>
                </div>
            </div>
        </div>
    );
}
