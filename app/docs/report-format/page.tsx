import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Report Format — StackSage Docs",
    description:
        "What files StackSage produces and how to use them (summary, HTML, JSON/CSV, remediation plan).",
};

export default function ReportFormatPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Report Format</h1>
            <p className="lead">
                After one run, StackSage generates an audit pack: a human-readable summary, a shareable HTML report, and machine-readable outputs.
            </p>

            <h2>Artifacts you get</h2>
            <ul>
                <li><code>summary.md</code> — one-page, executive-friendly summary</li>
                <li><code>audit_report.html</code> — shareable report (evidence + remediation)</li>
                <li><code>findings.json</code> — full findings payload for automation</li>
                <li><code>findings.csv</code> — spreadsheet-friendly version</li>
                <li><code>remediation_plan.md</code> / <code>remediation_plan.json</code> — (paid) prioritized action plan</li>
            </ul>

            <h2>Finding fields (high-level)</h2>
            <p>
                Each finding includes a stable <code>type</code>, a <code>resource_type</code>, an <code>id</code>, and structured evidence.
                Many findings also include copyable <code>verification_commands</code> and <code>remediation_commands</code>.
            </p>

            <div className="not-prose my-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-5">
                <pre className="text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200 mb-0"><code>{`{
  "type": "ec2_idle_instances",
  "resource_type": "ec2",
  "id": "i-0abc123...",
  "severity": "high",
  "confidence": 0.9,
  "estimated_monthly_savings_usd": 74.12,
  "evidence": { "cloudwatch": { "cpu_avg": 1.2 } },
  "verification_commands": ["aws ec2 describe-instances ..."],
  "remediation_commands": ["aws ec2 stop-instances ..."]
}`}</code></pre>
            </div>

            <h2>See a real example</h2>
            <p>
                You can browse a sample audit pack here: <Link className="underline" href="/demo-report/">Sample Audit Pack</Link>.
            </p>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/detectors/">All Detectors</Link></li>
                <li><Link className="underline" href="/docs/configuration/">Configuration</Link></li>
                <li><Link className="underline" href="/docs/troubleshooting/">Troubleshooting</Link></li>
            </ul>
        </div>
    );
}
