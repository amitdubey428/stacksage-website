import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
    title: "Licensing — Free & Pro - StackSage Documentation",
    description: "StackSage Free vs Pro — understand what's included in each tier and how the license key works",
};

export default function LicensingPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Licensing — Free &amp; Pro</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                The Free tier runs on your machine with <code className="text-base">pip install stacksage</code> — no sign-up, no Docker, no secrets.
                Pro unlocks all findings, remediation plans, and scheduled GitHub Actions audits.
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-blue-600 p-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Free</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li>✓ No license key — no sign-up</li>
                        <li>✓ <code className="text-xs">pip install stacksage</code> + your AWS creds</li>
                        <li>✓ Full infrastructure scan (all detectors)</li>
                        <li>✓ Top 50 findings by estimated savings</li>
                        <li>✓ Security &amp; posture checks — always full</li>
                        <li>✓ HTML, JSON, and CSV output</li>
                        <li>✗ Remaining findings hidden (see total count)</li>
                        <li>✗ No remediation plan</li>
                        <li>✗ No per-resource fix commands</li>
                        <li>✗ No scheduled CI audits</li>
                    </ul>
                </div>

                <div className="rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-green-600 p-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">Pro — $99/mo</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                        <li>✓ All findings — no cap</li>
                        <li>✓ Full remediation plan with fix commands</li>
                        <li>✓ Per-resource remediation steps</li>
                        <li>✓ Security posture details</li>
                        <li>✓ Schedule via GitHub Actions (pip-based, 2 secrets)</li>
                        <li>✓ <code className="text-xs">stacksage audit</code> for CI/CD pipelines</li>
                        <li>✓ Email support — 48h response</li>
                        <li>✓ Cancel anytime</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Free Tier</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                The free tier is the fastest way to see what StackSage finds in your AWS account. No account, no Docker, no secrets needed beyond your own AWS credentials.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Getting Started (Free)</h3>
            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Install</strong> — <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">pip install stacksage</code></li>
                <li><strong>Authenticate</strong> — any standard AWS credential method (profile, env vars, IAM role)</li>
                <li><strong>Run</strong> — <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">stacksage scan --profile &lt;profile&gt;</code></li>
                <li><strong>Open report</strong> — HTML report opens automatically in your browser</li>
            </ol>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                See the <Link href="/docs/quick-start/" className="text-blue-600 dark:text-blue-400 hover:underline">Quick Start Guide</Link> for full setup instructions.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Free Tier Limits</h3>
            <div className="not-prose my-6 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-6">
                <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                        <p><strong>What&apos;s capped in the free report:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Top 50 findings shown (ranked by estimated monthly savings)</li>
                            <li>Remaining findings hidden — count and estimated waste shown in the banner</li>
                            <li>No remediation plan or per-resource fix commands</li>
                        </ul>
                        <p className="mt-2">All detectors still run; the gate is only on the output, not the scan itself.</p>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Pro License</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Pro removes the output cap and adds remediation plans. It also enables <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">stacksage audit</code> for scheduled CI/CD runs.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Feature Comparison</h3>
            <div className="not-prose overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">Feature</th>
                            <th className="px-4 py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100">Free</th>
                            <th className="px-4 py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100">Pro</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">All detectors run</td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Security &amp; posture checks</td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">HTML, JSON, CSV output</td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Finding limit</td>
                            <td className="px-4 py-3 text-center"><span className="text-amber-600 dark:text-amber-400">Top 50</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">Unlimited</span></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Savings estimates &amp; ROI</td>
                            <td className="px-4 py-3 text-center"><span className="text-amber-600 dark:text-amber-400">Top 50 only</span></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Remediation plan</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Per-resource fix commands</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">GitHub Actions scheduling</td>
                            <td className="px-4 py-3 text-center"><XCircle className="h-4 w-4 text-red-500 mx-auto" /></td>
                            <td className="px-4 py-3 text-center"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                        </tr>
                        <tr className="bg-white dark:bg-zinc-900/50">
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">Support</td>
                            <td className="px-4 py-3 text-center"><span className="text-zinc-500 dark:text-zinc-500">Community</span></td>
                            <td className="px-4 py-3 text-center"><span className="text-green-600 dark:text-green-400">Email 48h</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">Setting Up Pro</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                After purchase you&apos;ll receive a license key by email. To activate:
            </p>

            <ol className="space-y-3 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Set the env var</strong> — <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">export STACKSAGE_LICENSE=&lt;your-key&gt;</code></li>
                <li><strong>Run audit</strong> — <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">stacksage audit --profile &lt;profile&gt;</code></li>
                <li><strong>For scheduled CI</strong> — add two GitHub secrets: <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code> and <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">AWS_AUDIT_ROLE_ARN</code></li>
            </ol>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                No Docker image, no GHCR credentials, no additional tooling — just pip and your license key.
                See the <Link href="/docs/github-actions/" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub Actions guide</Link> for a complete workflow example.
            </p>

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">How Licensing Works</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                StackSage uses offline-verifiable time-limited licenses:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><strong>Offline verification</strong> — license is validated locally; no phone-home</li>
                <li><strong>Time-limited</strong> — licenses expire after a fixed period; renewal is automatic via Paddle</li>
                <li><strong>Ed25519 signatures</strong> — cryptographically signed to prevent tampering</li>
                <li><strong>Customer-specific</strong> — each license is issued to your organisation</li>
                <li><strong>Single env var</strong> — stored as <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code></li>
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

            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3">License Renewal</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Renewals are handled automatically by Paddle for active subscriptions. If you need to update manually, set the new value in <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">STACKSAGE_LICENSE</code> (env var or GitHub secret).
            </p>

            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                    <strong>Grace Period:</strong> Licenses include a small grace period (60 seconds) to prevent failures at the exact expiration boundary.
                </p>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Privacy Guarantee</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Both Free and Pro respect your privacy:
            </p>

            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />All audits run on <strong>your</strong> machine or CI environment</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />AWS credentials never leave your environment</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />No data transmission to StackSage infrastructure</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />License verification is fully offline (no phone-home)</li>
                <li><CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />Reports stay on your machine or in your GitHub artifacts</li>
            </ul>

            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                See our <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> for complete details.
            </p>

            <div className="not-prose my-8 rounded-lg border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Ready to Get Started?</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                    Run the free tier now — no sign-up. Upgrade to Pro when you need all findings and remediation plans.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/docs/quick-start/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Try Free Now
                    </Link>
                    <Link
                        href="/#pricing"
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
                    >
                        Get Pro
                    </Link>
                </div>
            </div>
        </div>
    );
}
