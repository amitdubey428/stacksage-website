import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms and Conditions — StackSage",
    description: "Terms and conditions for use of StackSage services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                    ← Back to Home
                </Link>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Terms and Conditions</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    These terms govern your use of StackSage services provided by <strong>StackSage</strong> (the "Company").
                    StackSage is currently offered as early access. Access to the private image and support details are
                    provided case-by-case.
                </p>

                <div className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">No guarantees:</span> Findings are
                        informational and depend on your environment, usage, and permissions granted. Outcomes vary.
                    </p>
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Customer-controlled access:</span>
                        You control the AWS IAM principals and permissions used by your workflow.
                    </p>
                    <p>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Support:</span> For pricing, access,
                        and support terms, contact us.
                    </p>
                </div>

                <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
                    Contact <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                </p>
            </div>
        </div>
    );
}
