import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tag Governance — StackSage Docs",
    description: "Surface untagged resources in your AWS audit with StackSage's opt-in tagging compliance check.",
};

export default function TagGovernancePage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Tag Governance</h1>
            <p className="lead">
                Surface untagged resources in every audit. Useful for tracking ownership, preventing
                accidental deletion, and enabling accurate AWS Cost Explorer cost allocation.
            </p>

            <h2>Overview</h2>
            <p>
                StackSage includes an opt-in untagged resource detector. It flags EC2 instances,
                EBS volumes (≥ 50 GB), and RDS instances that have <em>zero</em> user-defined tags
                (AWS-managed <code>aws:*</code> tags are ignored). Each finding includes the
                resource&apos;s estimated monthly cost so you can prioritise which resources to tag first.
            </p>

            <div className="not-prose my-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                    <strong>Opt-in only.</strong> The tagging check is disabled by default to keep
                    reports focused. Enable it per the instructions below when you want tagging
                    compliance findings included.
                </p>
            </div>

            <h2>Enable the check</h2>
            <p>
                Add the following to your <code>stacksage.yml</code>:
            </p>
            <pre><code>{`detectors:
  check_tagging_compliance: true`}</code></pre>
            <p>
                When enabled, any resource with no user-defined tags appears as an{" "}
                <code>untagged_resource</code> finding with severity <code>low</code> and a
                copy-paste <code>aws … create-tags</code> remediation command.
            </p>

            <h2>Example finding</h2>
            <pre><code>{`{
  "type": "untagged_resource",
  "resource_type": "ec2",
  "id": "i-0abc123def456",
  "region": "us-east-1",
  "instance_type": "t3.medium",
  "estimated_monthly_cost_usd": 30.37,
  "severity": "low",
  "recommended_action": "add-basic-tags",
  "remediation_commands": [
    "aws ec2 create-tags --resources i-0abc123def456 --tags Key=Name,Value=<name> Key=Environment,Value=<prod|dev|test> Key=Owner,Value=<team>"
  ]
}`}</code></pre>

            <h2>Suppress noisy resources</h2>
            <p>
                Use <Link className="underline" href="/docs/exclusions/">exclusions</Link> to skip
                specific resources or entire regions from the tagging check:
            </p>
            <pre><code>{`exclude:
  resource_ids:
    - i-0abc123def456   # intentionally untagged (legacy)
  tags:
    - key: ManagedBy
      value: terraform  # terraform-managed resources tagged by IaC`}</code></pre>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/configuration/">Configuration Reference</Link></li>
                <li><Link className="underline" href="/docs/exclusions/">Exclusions &amp; Filters</Link></li>
                <li><Link className="underline" href="/docs/detectors/">All Detectors</Link></li>
            </ul>
        </div>
    );
}
