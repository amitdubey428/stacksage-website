import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CLI Reference — StackSage Docs",
    description: "Common StackSage CLI / workflow knobs and troubleshooting tips.",
};

export default function CliReferencePage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>CLI Reference</h1>
            <p className="lead">
                StackSage is typically run via GitHub Actions. This page captures common knobs you may see in workflows and configs.
            </p>

            <h2>Common inputs</h2>
            <ul>
                <li><code>regions</code> — restrict scanning to active regions</li>
                <li><code>use_cloudwatch</code> — enable utilization enrichments</li>
                <li><code>cw_max_queries</code> — cap CloudWatch query spend + time</li>
                <li><code>config_path</code> — point to <code>stacksage.yml</code></li>
            </ul>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/quick-start/">Quick Start</Link></li>
                <li><Link className="underline" href="/docs/configuration/">Configuration</Link></li>
                <li><Link className="underline" href="/docs/troubleshooting/">Troubleshooting</Link></li>
            </ul>
        </div>
    );
}
