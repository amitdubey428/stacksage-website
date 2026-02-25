import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Refund Policy — StackSage",
    description: "Refund policy for StackSage services.",
};

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                    ← Back to Home
                </Link>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Refund Policy</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    This refund policy applies to all StackSage subscriptions and licenses.
                </p>

                <div className="mt-8 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
                    <div>
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Try Before You Buy</h2>
                        <p>
                            StackSage offers a free trial so you can evaluate the product before committing to a paid
                            subscription. We encourage all customers to use the trial to verify the tool meets their needs.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">No Refunds</h2>
                        <p>
                            All purchases are final and non-refundable. Because a trial is available prior to purchase,
                            we do not offer refunds on paid subscriptions or licenses once payment has been processed.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Cancellations</h2>
                        <p>
                            You may cancel your subscription at any time. Cancellations take effect at the end of your
                            current billing period and you will retain access until that date. No partial-period refunds
                            will be issued.
                        </p>
                        <p className="mt-2">
                            To cancel, use the Paddle customer portal link sent to your email after purchase, or contact
                            us at{" "}
                            <a className="underline" href="mailto:hello@stacksageai.com">
                                hello@stacksageai.com
                            </a>{" "}
                            and we will cancel it for you promptly.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Exceptional Circumstances</h2>
                        <p>
                            If you believe there has been a billing error or a technical issue on our end, please contact
                            us and we will review your case. We reserve the right to issue refunds at our sole discretion
                            in exceptional circumstances.
                        </p>
                    </div>
                </div>

                <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
                    For billing questions, contact{" "}
                    <a className="underline" href="mailto:hello@stacksageai.com">
                        hello@stacksageai.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
