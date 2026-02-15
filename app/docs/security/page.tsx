import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Security Best Practices — StackSage Docs",
    description:
        "Recommended security practices for running StackSage audits safely in GitHub Actions.",
};

export default function SecurityBestPracticesPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Security Best Practices</h1>
            <p className="lead">
                StackSage is designed to be low-trust overhead by running in your repo. These practices keep it that way.
            </p>

            <h2>Recommended</h2>
            <ul>
                <li><strong>Use OIDC:</strong> avoid long-lived AWS keys where possible.</li>
                <li><strong>Scope trust policy:</strong> restrict to a specific GitHub org/repo and branch/environment if you can.</li>
                <li><strong>Least privilege:</strong> prefer a custom policy over broad managed policies.</li>
                <li><strong>Monitor usage:</strong> review CloudTrail for role assumptions and unusual API activity.</li>
                <li><strong>Artifact hygiene:</strong> restrict repo access and delete old artifacts if needed.</li>
            </ul>

            <h2>Where to configure this</h2>
            <ul>
                <li><Link className="underline" href="/docs/iam-policy/">IAM Policy Setup</Link></li>
                <li><Link className="underline" href="/docs/privacy/">Privacy & Data Handling</Link></li>
                <li><Link className="underline" href="/docs/troubleshooting/">Troubleshooting</Link></li>
            </ul>
        </div>
    );
}
