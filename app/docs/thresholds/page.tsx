import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Custom Thresholds — StackSage Docs",
    description: "Tune StackSage detection sensitivity with per-detector thresholds in stacksage.yml.",
};

export default function ThresholdsPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100
        [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4">
            <h1>Custom Thresholds</h1>
            <p className="lead">
                Adjust detection sensitivity for each resource type to match your environment&apos;s
                operational patterns.
            </p>

            <h2>Overview</h2>
            <p>
                Thresholds control when StackSage flags a resource as idle, oversized, or wasteful.
                All thresholds are optional — StackSage ships with sensible defaults that work for most
                AWS environments.
            </p>

            <h2>EBS Volumes</h2>
            <pre><code>{`thresholds:
  ebs:
    unattached_days: 7            # Default: 7 — flag volumes unattached ≥N days
    performance_utilization: 0.20 # Default: 0.20 — flag volumes at <20% of provisioned IOPS`}</code></pre>

            <h2>NAT Gateways</h2>
            <pre><code>{`thresholds:
  nat_gateway:
    idle_threshold_gb_per_day: 1.0  # Default: 1.0 — flag gateways processing <1 GB/day`}</code></pre>

            <h2>Lambda Functions</h2>
            <pre><code>{`thresholds:
  lambda:
    low_invocation_threshold: 10  # Default: 10 — flag functions with <10 invocations/day`}</code></pre>

            <h2>RDS Instances</h2>
            <pre><code>{`thresholds:
  rds:
    low_connection_count: 10  # Default: 10 — flag instances with <10 avg connections`}</code></pre>

            <h2>Load Balancers</h2>
            <pre><code>{`thresholds:
  elb:
    idle_request_threshold_per_day: 10.0  # Default: 10.0 — flag ELBs with <10 requests/day
    min_days_old: 14                      # Only check load balancers >14 days old

  lb:
    min_days_old: 7                       # Default: 7`}</code></pre>

            <h2>Severity Thresholds</h2>
            <p>Control how findings are bucketed into severity levels:</p>
            <pre><code>{`thresholds:
  severity:
    high_cost_threshold: 100    # Findings ≥$100/mo → high severity
    medium_cost_threshold: 25   # Findings ≥$25/mo → medium severity
                                # Below $25/mo → low severity`}</code></pre>

            <h2>Progressive tuning</h2>
            <p>
                Start conservative and tighten thresholds as you address findings — reducing noise
                in early runs and increasing signal over time:
            </p>
            <pre><code>{`# Week 1: Focus on high-impact items only
reporting:
  min_savings_usd: 50
  severity_filter: [critical, high]

# Week 4: Lower threshold as environment improves
reporting:
  min_savings_usd: 10
  severity_filter: [critical, high, medium]

# Month 2: Full audit
reporting:
  min_savings_usd: 0`}</code></pre>

            <h2>Related topics</h2>
            <ul>
                <li><Link className="underline" href="/docs/configuration/">Configuration Reference</Link></li>
                <li><Link className="underline" href="/docs/exclusions/">Exclusions &amp; Filters</Link></li>
                <li><Link className="underline" href="/docs/detectors/">All Detectors</Link></li>
            </ul>
        </div>
    );
}
