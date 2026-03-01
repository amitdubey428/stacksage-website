import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Exclusions & Filters — StackSage Docs",
    description: "Skip specific resources, regions, tags, or detectors from StackSage audits.",
};

export default function ExclusionsPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Exclusions &amp; Filters</h1>
            <p className="lead">
                Suppress known findings you&apos;ve consciously decided not to address — keeping your reports
                focused on actionable waste.
            </p>

            <h2>Overview</h2>
            <p>
                Exclusions are defined in <code>stacksage.yml</code> and applied before findings are surfaced
                in the report. Four types of exclusion are supported: by resource ID, by tag, by region, and
                by detector type.
            </p>

            <h2>Exclude by Resource ID</h2>
            <p>Skip specific AWS resources by their ID:</p>
            <pre><code>{`exclusions:
  resources:
    - vol-abc123        # Intentional idle volume for disaster recovery
    - nat-xyz789        # NAT gateway for staging environment
    - i-0123456789abcd  # Bastion host — always on by design`}</code></pre>

            <h2>Exclude by Tag</h2>
            <p>
                Skip any resource that has a matching tag key/value pair. Useful for excluding entire
                environments or teams:
            </p>
            <pre><code>{`exclusions:
  tags:
    - key: stacksage:ignore
      value: "true"           # Opt-out tag on individual resources
    - key: Environment
      value: development      # Ignore all dev resources
    - key: Environment
      value: staging`}</code></pre>
            <div className="not-prose my-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                    <strong>Tip:</strong> Add a <code>stacksage:ignore: &quot;true&quot;</code> tag directly on
                    any AWS resource to permanently exclude it without touching <code>stacksage.yml</code>.
                </p>
            </div>

            <h2>Exclude by Region</h2>
            <p>Skip entire AWS regions — useful for DR regions or regions with no active workloads:</p>
            <pre><code>{`exclusions:
  regions:
    - us-west-1       # Disaster recovery region
    - ap-northeast-2  # Unused region`}</code></pre>

            <h2>Disable Specific Detectors</h2>
            <p>Turn off an entire detection category when it doesn&apos;t apply to your environment:</p>
            <pre><code>{`exclusions:
  detectors:
    - ec2_generation_upgrade   # Hardware roadmap already planned
    - gp2_to_gp3_migration     # Migration scheduled for Q3
    - nat_gateway              # NAT gateways are required by policy`}</code></pre>

            <h2>Reporting Filters</h2>
            <p>
                In addition to exclusions, you can filter what appears in the final report without
                suppressing the underlying finding:
            </p>
            <pre><code>{`reporting:
  min_savings_usd: 10       # Only show findings with ≥$10/mo savings
  severity_filter:
    - critical
    - high                  # Omit medium/low from report
  finding_types:
    - cost_optimization     # Only show cost findings (omit security)`}</code></pre>

            <h2>Full example</h2>
            <pre><code>{`exclusions:
  resources:
    - vol-abc123
  tags:
    - key: stacksage:ignore
      value: "true"
    - key: Environment
      value: development
  regions:
    - us-west-1
  detectors:
    - gp2_to_gp3_migration

reporting:
  min_savings_usd: 10
  severity_filter: [critical, high, medium]`}</code></pre>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/configuration/">Configuration Reference</Link></li>
                <li><Link className="underline" href="/docs/thresholds/">Custom Thresholds</Link></li>
                <li><Link className="underline" href="/docs/detectors/">All Detectors</Link></li>
                <li><Link className="underline" href="/docs/tag-governance/">Tag Governance</Link></li>
            </ul>
        </div>
    );
}
