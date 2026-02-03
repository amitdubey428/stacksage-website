import { Metadata } from "next";
import Link from "next/link";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: "Configuration - StackSage Documentation",
    description: "Customize StackSage behavior with stacksage.yml",
};

export default function ConfigurationPage() {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h1>Configuration</h1>
            <p className="lead">
                Customize StackSage audit behavior with a <code>stacksage.yml</code> file in your repository root.
            </p>

            <h2>Quick Start</h2>
            <p>
                Create a <code>stacksage.yml</code> file in your repository root:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 mt-0.5 text-zinc-600 dark:text-zinc-400" />
                        <div className="flex-1">
                            <pre className="text-sm overflow-x-auto"><code>{`# Download the example configuration
curl -O https://raw.githubusercontent.com/amitdubey428/stacksage-audit/main/stacksage.yml.example

# Rename and customize
mv stacksage.yml.example stacksage.yml`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <p>
                All configuration settings are <strong>optional</strong>. StackSage uses sensible defaults if no config file is present.
            </p>

            <h2>Configuration Sections</h2>

            <h3>Exclusions</h3>
            <p>
                Skip specific resources, regions, or entire detector types:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`exclusions:
  # Skip specific resource IDs
  resources:
    - vol-abc123  # Intentional idle volume for disaster recovery
    - nat-xyz789  # NAT gateway for staging environment
  
  # Skip resources with specific tags
  tags:
    - key: stacksage:ignore
      value: "true"
    - key: environment
      value: development
  
  # Skip entire regions
  regions:
    - us-west-1  # Disaster recovery region
  
  # Disable specific detectors
  detectors:
    - ec2_generation_upgrade  # Hardware roadmap planned
    - gp2_to_gp3_migration    # Migration in Q3`}</code></pre>
                </div>
            </div>

            <div className="not-prose my-6 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                    <strong>Tip:</strong> Use exclusions to suppress known findings that you've consciously decided not to address,
                    reducing noise in your reports.
                </p>
            </div>

            <h3>Thresholds</h3>
            <p>
                Adjust detection sensitivity for your environment:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`thresholds:
  ebs:
    unattached_days: 14           # Default: 7
    performance_utilization: 0.15  # Default: 0.20 (20%)
  
  nat_gateway:
    idle_threshold_gb_per_day: 0.5  # Default: 1.0
  
  lambda:
    low_invocation_threshold: 5  # Default: 10 per day
  
  rds:
    low_connection_count: 5  # Default: 10 connections
  
  elb:
    idle_request_threshold_per_day: 5.0  # Default: 10.0
    min_days_old: 14  # Only check resources >14 days old
  
  lb:
    min_days_old: 14  # Default: 7
  
  severity:
    high_cost_threshold: 100  # Findings ≥$100/mo = high severity
    medium_cost_threshold: 25  # Findings ≥$25/mo = medium`}</code></pre>
                </div>
            </div>

            <h3>Reporting Filters</h3>
            <p>
                Control what appears in final reports:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`reporting:
  # Only show findings with savings ≥ this amount
  min_savings_usd: 10  # Default: 0
  
  # Only show these severity levels (empty = show all)
  severity_filter:
    - critical
    - high
  
  # Finding types to include (empty = show all)
  finding_types:
    - cost_optimization
    - security
    - performance`}</code></pre>
                </div>
            </div>

            <h3>Tag Governance</h3>
            <p>
                Define required tags and cost allocation rules:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`tag_governance:
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
                </div>
            </div>

            <h2>Common Patterns</h2>

            <h3>Progressive Rollout</h3>
            <p>
                Start with high thresholds and gradually tighten as you address findings:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`# Week 1: Focus on high-impact items only
reporting:
  min_savings_usd: 50
  severity_filter: [critical, high]

# Week 4: Lower threshold as you address findings
reporting:
  min_savings_usd: 20
  severity_filter: [critical, high, medium]`}</code></pre>
                </div>
            </div>

            <h3>Team-Specific Audits</h3>
            <p>
                Use tag-based exclusions for different teams:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`# Only audit infrastructure team resources
exclusions:
  tags:
    - key: Team
      value: application
    - key: Team
      value: data-science`}</code></pre>
                </div>
            </div>

            <h3>Environment-Based Rules</h3>
            <p>
                Skip development resources, focus on production:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`exclusions:
  tags:
    - key: Environment
      value: development
    - key: Environment
      value: staging

thresholds:
  # More aggressive for production
  ebs:
    unattached_days: 3
  nat_gateway:
    idle_threshold_gb_per_day: 0.1`}</code></pre>
                </div>
            </div>

            <h2>Related Topics</h2>
            <ul>
                <li><Link href="/docs/exclusions">Exclusions & Filters Deep Dive</Link></li>
                <li><Link href="/docs/thresholds">Custom Thresholds Reference</Link></li>
                <li><Link href="/docs/tag-governance">Tag Governance Guide</Link></li>
                <li><Link href="/docs/troubleshooting">Troubleshooting Configuration</Link></li>
            </ul>
        </div>
    );
}
