import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy — StackSage",
    description: "Privacy notes for the StackSage website and product workflow.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                    ← Back to Home
                </Link>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Privacy</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    StackSage is designed to run inside your GitHub Actions runner. We do not provide a hosted dashboard or
                    ingest your AWS credentials into a SaaS.
                </p>

                <div className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Product execution:</span> StackSage
                        runs in your CI environment (GitHub Actions). AWS access is provided via an IAM principal you control
                        (typically a read-only role assumed from the runner).
                    </p>
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Outputs:</span> Reports are produced
                        as workflow artifacts (HTML report + JSON/CSV findings). What’s included depends on the permissions
                        you enable (optional CloudWatch and Cost Explorer enrichments).
                    </p>
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Website data:</span> If you submit our
                        interest form, we receive the information you choose to provide (e.g., contact details and context).
                    </p>
                </div>

                <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
                    Questions? Email <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                </p>
            </div>
        </div>
    );
}
