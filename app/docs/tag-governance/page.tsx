import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tag Governance — StackSage Docs",
    description: "Enforce required tags, cost allocation tags, and audit tag filters with StackSage.",
};

export default function TagGovernancePage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Tag Governance</h1>
            <p className="lead">
                Enforce tagging standards across your AWS environment and surface untagged or
                incorrectly tagged resources in every audit.
            </p>

            <h2>Overview</h2>
            <p>
                StackSage&apos;s tag governance feature audits resources against your organisation&apos;s
                tagging policy. Resources missing required tags are surfaced as findings with their
                estimated monthly cost, so you can prioritise which untagged resources to fix first.
            </p>

            <h2>Required Tags</h2>
            <p>
                Define which tags every resource must have. Any resource missing one or more of these
                will appear as an <code>untagged_resource</code> finding:
            </p>
            <pre><code>{`tag_governance:
  required_tags:
    - Name
    - Environment
    - Owner
    - CostCenter`}</code></pre>

            <h2>Cost Allocation Tags</h2>
            <p>
                Identify which tags are used for cost allocation in AWS Cost Explorer. StackSage uses
                these to group and attribute spend in its reports:
            </p>
            <pre><code>{`tag_governance:
  cost_allocation_tags:
    - CostCenter
    - Project
    - Team`}</code></pre>

            <h2>Audit Tag Filters</h2>
            <p>
                Restrict the audit scope to resources matching specific tag values — useful for
                compliance-scoped audits:
            </p>
            <pre><code>{`tag_governance:
  audit_tag_filters:
    - key: Compliance
      values:
        - SOC2
        - HIPAA`}</code></pre>

            <h2>Full example</h2>
            <pre><code>{`tag_governance:
  required_tags:
    - Name
    - Environment
    - Owner
    - CostCenter

  cost_allocation_tags:
    - CostCenter
    - Project
    - Team

  audit_tag_filters:
    - key: Compliance
      values:
        - SOC2
        - HIPAA`}</code></pre>

            <div className="not-prose my-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950 p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-0">
                    <strong>Note:</strong> Tag matching is case-sensitive for both key and value.
                    Ensure your tagging standards are consistently applied across teams.
                </p>
            </div>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/configuration/">Configuration Reference</Link></li>
                <li><Link className="underline" href="/docs/exclusions/">Exclusions &amp; Filters</Link></li>
                <li><Link className="underline" href="/docs/detectors/">All Detectors</Link></li>
            </ul>
        </div>
    );
}
