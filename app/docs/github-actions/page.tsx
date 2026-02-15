import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GitHub Actions Setup — StackSage Docs",
    description:
        "How to run StackSage inside GitHub Actions using a customer-controlled read-only role.",
};

export default function GitHubActionsPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>GitHub Actions Setup</h1>
            <p className="lead">
                StackSage runs inside your GitHub Actions runner. You grant access via a customer‑controlled read‑only IAM role.
            </p>

            <h2>High-level flow</h2>
            <ol>
                <li>Create an IAM role in AWS that GitHub Actions can assume (OIDC).</li>
                <li>Add the role ARN (and any required secrets) to your GitHub repo.</li>
                <li>Run the workflow to generate an audit pack (summary + HTML + JSON/CSV).</li>
            </ol>

            <div className="not-prose my-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-5">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-0">
                    Want to see the output first? Open the <Link className="underline" href="/demo-report/">Sample Audit Pack</Link>.
                </p>
            </div>

            <h2>Prerequisites</h2>
            <ul>
                <li>A GitHub repo with Actions enabled</li>
                <li>AWS account access to create an IAM role + policy</li>
                <li>OIDC provider configured for GitHub (first-time only)</li>
            </ul>

            <h2>Next steps</h2>
            <ul>
                <li>
                    IAM role + policy: <Link className="underline" href="/docs/iam-policy/">IAM Policy Setup</Link>
                </li>
                <li>
                    Trial vs paid workflow: <Link className="underline" href="/docs/licensing/">Licensing & Trial</Link>
                </li>
                <li>
                    Common failures: <Link className="underline" href="/docs/troubleshooting/">Troubleshooting</Link>
                </li>
            </ul>
        </div>
    );
}
