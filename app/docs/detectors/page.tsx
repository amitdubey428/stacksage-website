import { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Detectors - StackSage Documentation",
    description: "Complete reference of all StackSage cost optimization and security posture checks",
};

export default function DetectorsPage() {
    const costCategories = [
        {
            category: "Compute",
            icon: "💻",
            detectors: [
                {
                    name: "EC2 Idle Instances",
                    id: "idle_ec2",
                    description: "Instances with <5% average CPU utilization over 14 days. Likely candidates for downsizing or termination.",
                    severity: "High",
                    savings: "$50–500/mo per instance",
                },
                {
                    name: "EC2 Generation Upgrade",
                    id: "ec2_generation_upgrade",
                    description: "Old-generation instance types (t2→t3, m4→m5/m6i, c4→c5/c6i, r4→r5/r6i). Newer generations are 5–15% cheaper with better performance.",
                    severity: "Medium",
                    savings: "$10–100/mo per instance",
                },
                {
                    name: "Stopped EC2 Instances",
                    id: "stopped_ec2",
                    description: "EC2 instances in stopped state for >14 days. Stopped instances still incur EBS storage costs and block Elastic IP allocations.",
                    severity: "Medium",
                    savings: "$5–50/mo per instance",
                },
                {
                    name: "Lambda Memory Overprovisioning",
                    id: "overprovisioned_lambda",
                    description: "Lambda functions using <30% of their timeout duration while configured with >256 MB memory. Reducing memory allocation saves ~20% in compute costs.",
                    severity: "Medium",
                    savings: "$10–100/mo per function",
                },
                {
                    name: "Lambda Graviton Migration (arm64)",
                    id: "lambda_graviton_migration",
                    description: "x86_64 Lambda functions that can migrate to arm64 (Graviton2) for ~20% compute savings with no code changes in most runtimes.",
                    severity: "Low",
                    savings: "$1–50/mo per function",
                },
                {
                    name: "EC2 → Serverless Migration Opportunities",
                    id: "architecture_opportunity",
                    description: "Always-on small EC2 instances (<2 vCPU, <4 GB RAM) with sustained low CPU — candidates for Lambda + API Gateway migration.",
                    severity: "Medium",
                    savings: "$5–200/mo per instance",
                },
            ],
        },
        {
            category: "Containers",
            icon: "📦",
            detectors: [
                {
                    name: "ECS (EC2) → Fargate Migration",
                    id: "ecs_to_fargate",
                    description: "ECS services on the EC2 launch type with low task utilization. Moving to Fargate eliminates idle EC2 capacity costs.",
                    severity: "Low",
                    savings: "$5–200/mo per service",
                },
                {
                    name: "Fargate Spot Opportunities",
                    id: "fargate_spot_opportunity",
                    description: "Fargate services running on standard capacity in environments tagged dev/test/staging. Fargate Spot cuts costs up to 70% for fault-tolerant workloads.",
                    severity: "Low",
                    savings: "$5–200/mo per service",
                },
            ],
        },
        {
            category: "Storage",
            icon: "💾",
            detectors: [
                {
                    name: "EBS Unattached Volumes",
                    id: "unattached_ebs",
                    description: "Volumes not attached to any running instance for >7 days. Likely forgotten after instance termination.",
                    severity: "High",
                    savings: "$10–200/mo per volume",
                },
                {
                    name: "EBS Overprovisioned Performance",
                    id: "ebs_overprovisioned_performance",
                    description: "io1/io2 or gp3 volumes with <20% IOPS or throughput utilization over 14 days. Lowering provisioned IOPS reduces cost without affecting performance.",
                    severity: "Medium",
                    savings: "$20–500/mo per volume",
                },
                {
                    name: "GP2 to GP3 Migration",
                    id: "gp2_to_gp3_migration",
                    description: "gp2 volumes that can be migrated to gp3 for a straight 20% savings at equivalent baseline IOPS, with the option to provision more IOPS/throughput separately.",
                    severity: "Medium",
                    savings: "$5–100/mo per volume",
                },
                {
                    name: "Old EBS Snapshots",
                    id: "old_snapshot",
                    description: "Snapshots older than 90 days with no associated volume. Often leftover from deleted instances or manual backup workflows.",
                    severity: "Low",
                    savings: "$5–50/mo per snapshot",
                },
                {
                    name: "EBS Snapshot Consolidation",
                    id: "snapshot_consolidation",
                    description: "Multiple recent snapshots of the same volume in a short window — suggests redundant manual backups that could be replaced with a lifecycle policy.",
                    severity: "Low",
                    savings: "$5–30/mo per volume",
                },
            ],
        },
        {
            category: "Database",
            icon: "🗄️",
            detectors: [
                {
                    name: "RDS Underutilized (CPU + Storage)",
                    id: "underutilized_rds",
                    description: "RDS instances with <10% average CPU and >70% free storage over 14 days. Suggests the instance is significantly oversized and can be downsized.",
                    severity: "High",
                    savings: "$50–500/mo per instance",
                },
                {
                    name: "RDS Low Connections",
                    id: "rds_low_connections",
                    description: "RDS instances averaging <10 connections over 14 days — may indicate an orphaned or forgotten database.",
                    severity: "Medium",
                    savings: "$50–500/mo per instance",
                },
                {
                    name: "DynamoDB Unused Tables",
                    id: "dynamodb_unused_table",
                    description: "Tables with zero consumed read/write capacity for 30+ days. Likely test or abandoned tables still incurring provisioned capacity costs.",
                    severity: "Medium",
                    savings: "$5–200/mo per table",
                },
                {
                    name: "RDS → Aurora Serverless v2 Candidates",
                    id: "rds_to_aurora_serverless_v2",
                    description: "Spiky RDS workloads (high peak CPU, low average CPU) that may benefit from Aurora Serverless v2's auto-scaling capacity units rather than a fixed instance size.",
                    severity: "Medium",
                    savings: "$5–200/mo per instance",
                },
            ],
        },
        {
            category: "Caching",
            icon: "⚡",
            detectors: [
                {
                    name: "ElastiCache Idle Clusters",
                    id: "elasticache_idle_cluster",
                    description: "Redis/Memcached clusters with <5% cache hit rate and <2 active connections over 14 days. Likely unused or orphaned.",
                    severity: "Medium",
                    savings: "$20–300/mo per cluster",
                },
            ],
        },
        {
            category: "Network",
            icon: "🌐",
            detectors: [
                {
                    name: "NAT Gateway Advisory",
                    id: "nat_gateway",
                    description: "All active NAT gateways are reported as a cost-awareness advisory. NAT gateways incur a fixed hourly charge (~$32/mo) plus per-GB data processing fees.",
                    severity: "Low",
                    savings: "Varies by data volume",
                },
                {
                    name: "NAT Gateway Idle",
                    id: "idle_nat_gateway",
                    description: "NAT gateways processing <1 GB/day over 14 days — likely serving no active traffic and can be deleted.",
                    severity: "High",
                    savings: "$30–45/mo per NAT",
                },
                {
                    name: "Missing S3 VPC Endpoint",
                    id: "missing_s3_vpc_endpoint",
                    description: "No S3 gateway VPC endpoint detected. Private instances accessing S3 through NAT incur unnecessary data processing charges. Gateway endpoints are free.",
                    severity: "Low",
                    savings: "$5–50/mo",
                },
                {
                    name: "Elastic IP Unattached",
                    id: "unused_eip",
                    description: "Elastic IPs not associated with any running instance. AWS charges $0.005/hr (~$3.60/mo) per idle EIP.",
                    severity: "Low",
                    savings: "$3–5/mo per EIP",
                },
                {
                    name: "Load Balancer Idle",
                    id: "idle_elb",
                    description: "Classic ELBs, ALBs, and NLBs with <10 requests/day over 14 days. Likely leftover from old deployments.",
                    severity: "Medium",
                    savings: "$20–30/mo per LB",
                },
                {
                    name: "Load Balancer Empty Target Groups",
                    id: "lb_empty_target_groups",
                    description: "ALB/NLB load balancers where all target groups have zero healthy targets for >7 days — the load balancer is running but serving no traffic.",
                    severity: "High",
                    savings: "$15–40/mo per load balancer",
                },
            ],
        },
        {
            category: "Content Delivery & DNS",
            icon: "🌍",
            detectors: [
                {
                    name: "CloudFront Unused Distributions",
                    id: "cloudfront_unused_distribution",
                    description: "Distributions receiving <100 total requests over the last 30 days. Often forgotten CDN endpoints from old deployments.",
                    severity: "Low",
                    savings: "$1–10/mo per distribution",
                },
                {
                    name: "Route 53 Unused Hosted Zones",
                    id: "route53_unused_hosted_zone",
                    description: "Hosted zones with zero DNS queries over the last 90 days. AWS charges $0.50/mo per zone plus per-query fees.",
                    severity: "Medium",
                    savings: "$0.50–50/mo per zone",
                },
            ],
        },
        {
            category: "CloudWatch Logs",
            icon: "📋",
            detectors: [
                {
                    name: "Log Group Retention Not Set",
                    id: "cloudwatch_logs_retention",
                    description: "CloudWatch Log Groups with 'Never Expire' retention that are storing significant data. Setting a 30/90/365-day retention policy typically saves ~60% of log storage costs.",
                    severity: "Medium",
                    savings: "Varies by log volume",
                },
            ],
        },
        {
            category: "S3",
            icon: "🪣",
            detectors: [
                {
                    name: "S3 Lifecycle Suggestions",
                    id: "s3_lifecycle_suggestion",
                    description: "S3 buckets with no lifecycle configuration. Adding tiering rules (Standard → Infrequent Access → Glacier) reduces storage costs for buckets with older objects.",
                    severity: "Low",
                    savings: "Varies by bucket size",
                },
            ],
        },
        {
            category: "Cost Guardrails",
            icon: "🛡️",
            detectors: [
                {
                    name: "AWS Budgets Not Configured",
                    id: "cost_guardrail_missing_budgets",
                    description: "No AWS Budgets found in the account. Budgets alert you when spend approaches or exceeds a threshold, preventing surprise bills.",
                    severity: "Medium",
                    savings: "Prevents cost overruns",
                },
                {
                    name: "Cost Anomaly Detection Not Enabled",
                    id: "cost_guardrail_missing_anomaly_detection",
                    description: "No AWS Cost Anomaly Detection monitors configured. Anomaly detection uses ML to alert on unexpected spend spikes within hours of them occurring.",
                    severity: "Medium",
                    savings: "Prevents cost overruns",
                },
            ],
        },
    ];

    const postureChecks = [
        {
            name: "IAM Root MFA & Access Keys",
            id: "iam_root_mfa_disabled / iam_root_access_keys_present",
            description: "Checks that root MFA is enabled and root access keys do not exist. Root account compromise is catastrophic — these two checks are non-negotiable baselines.",
            severity: "Critical",
        },
        {
            name: "IAM Password Policy",
            id: "iam_password_policy_missing / iam_password_policy_weak",
            description: "Verifies a password policy exists and meets baseline requirements: minimum length ≥14, complexity enabled, reuse prevention ≥24, max age ≤90 days.",
            severity: "Medium",
        },
        {
            name: "IAM Access Key Hygiene",
            id: "iam_access_key_hygiene",
            description: "Detects IAM access keys that are active and older than 90 days (should be rotated) or that have never been used (should be deleted).",
            severity: "Medium",
        },
        {
            name: "Security Groups Open to Internet",
            id: "sg_open_to_world",
            description: "Identifies security groups with inbound rules allowing 0.0.0.0/0 or ::/0 on sensitive ports (SSH 22, RDP 3389, database ports, Redis 6379, etc.).",
            severity: "High",
        },
        {
            name: "RDS Security Basics",
            id: "rds_publicly_accessible / rds_storage_not_encrypted / rds_backup_retention_low",
            description: "Checks each RDS instance for three issues: publicly accessible flag enabled, storage encryption disabled, and backup retention period below 7 days.",
            severity: "High",
        },
        {
            name: "S3 Block Public Access",
            id: "s3_account_public_access_block_disabled / s3_buckets_public",
            description: "Verifies all four S3 account-level Block Public Access settings are enabled, and checks individual bucket policy status for any buckets that appear publicly accessible.",
            severity: "High",
        },
        {
            name: "S3 Default Encryption",
            id: "s3_bucket_default_encryption_missing",
            description: "Identifies S3 buckets missing a default encryption configuration (SSE-S3 or SSE-KMS). Older buckets created before AWS made encryption the default may still be missing it.",
            severity: "Medium",
        },
        {
            name: "CloudTrail Audit Logging",
            id: "cloudtrail_not_configured",
            description: "Confirms a CloudTrail trail exists, is configured as multi-region, and is actively logging. Without CloudTrail there is no audit record of AWS API calls.",
            severity: "High",
        },
        {
            name: "EBS Encryption by Default",
            id: "ebs_encryption_by_default_disabled",
            description: "Checks that the EBS encryption-by-default setting is enabled in the scanned region, ensuring all new volumes and snapshots are automatically encrypted with KMS.",
            severity: "Medium",
        },
        {
            name: "AWS Config",
            id: "aws_config_not_enabled / aws_config_not_recording",
            description: "Verifies AWS Config is enabled and its recorder is actively recording. Config provides a continuous record of resource configuration changes and is foundational for compliance.",
            severity: "Medium",
        },
        {
            name: "Amazon GuardDuty",
            id: "guardduty_not_enabled",
            description: "Checks GuardDuty is enabled in all scanned regions. GuardDuty provides continuous threat detection using ML on CloudTrail logs, VPC Flow Logs, and DNS query logs.",
            severity: "Medium",
        },
        {
            name: "CloudWatch Alarms Presence",
            id: "cloudwatch_alarms_missing",
            description: "Flags accounts with no CloudWatch alarms found in any scanned region. Alarms on billing thresholds, error rates, and CPU are basic operational hygiene.",
            severity: "Low",
        },
        {
            name: "AWS Security Hub",
            id: "securityhub_not_enabled",
            description: "Checks Security Hub is enabled in scanned regions. Security Hub aggregates findings from GuardDuty, Inspector, Macie, and third-party tools into a single dashboard.",
            severity: "Low",
        },
        {
            name: "IAM Access Analyzer External Access",
            id: "iam_access_analyzer_external_access",
            description: "If IAM Access Analyzer is enabled, reports the count of active external access findings (resources shared outside the account). Only the count is recorded — no policy details.",
            severity: "High",
        },
        {
            name: "Incident Response Readiness",
            id: "incident_response_readiness_low",
            description: "Meta-check: if CloudTrail, GuardDuty, AWS Config, or Security Hub findings are detected above, this finding summarises the combined incident response gap.",
            severity: "Medium",
        },
    ];

    const severityClass = (severity: string) => {
        switch (severity) {
            case "Critical": return "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-100";
            case "High": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
            case "Medium": return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200";
            default: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200";
        }
    };

    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h1>All Detectors</h1>
            <p className="lead">
                Complete reference for all 40+ cost optimization and security posture checks in StackSage.
                Every check runs entirely on your machine or in CI — no data leaves your environment.
            </p>

            <div className="not-prose mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-900 dark:text-green-100">40+ Checks</span>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            Cost optimization and security posture, in one scan
                        </p>
                    </div>
                    <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-900 dark:text-blue-100">Privacy First</span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                            Runs on your machine or in CI — data never leaves your environment
                        </p>
                    </div>
                    <div className="rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <span className="font-semibold text-orange-900 dark:text-orange-100">CloudWatch-Backed</span>
                        </div>
                        <p className="text-sm text-orange-800 dark:text-orange-200 mb-0">
                            Uses real CloudWatch metrics — not just inventory snapshots
                        </p>
                    </div>
                </div>
            </div>

            {costCategories.map((cat) => (
                <div key={cat.category} className="mb-12">
                    <h2 className="flex items-center gap-2 mt-10">
                        <span>{cat.icon}</span>
                        <span>{cat.category}</span>
                    </h2>

                    <div className="not-prose space-y-4">
                        {cat.detectors.map((detector) => (
                            <div
                                key={detector.id}
                                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {detector.name}
                                    </h3>
                                    <span className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ml-4 ${severityClass(detector.severity)}`}>
                                        {detector.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                                    {detector.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">
                                        {detector.id}
                                    </code>
                                    <span className="text-green-600 dark:text-green-400 font-medium text-xs">
                                        {detector.savings}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <h2 className="mt-10 flex items-center gap-2">
                <span>🔒</span>
                <span>Security &amp; Posture</span>
            </h2>
            <p>
                Security posture checks run automatically alongside cost checks when a live AWS session is
                available. They are privacy-first: only aggregate counts and boolean flags are recorded —
                never raw resource lists or policy documents.
            </p>

            <div className="not-prose space-y-4 mb-12">
                {postureChecks.map((check) => (
                    <div
                        key={check.id}
                        className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {check.name}
                            </h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ml-4 ${severityClass(check.severity)}`}>
                                {check.severity}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                            {check.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">
                                {check.id}
                            </code>
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                                Security posture
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-10 flex items-center gap-2">
                <span>🏷️</span>
                <span>Tagging Compliance</span>
            </h2>
            <p>
                The tagging check is <strong>opt-in</strong> and must be explicitly enabled in{" "}
                <code>stacksage.yml</code>:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`detectors:
  check_tagging_compliance: true`}</code></pre>
                </div>
            </div>

            <div className="not-prose space-y-4 mb-12">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Untagged Resources
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 rounded flex-shrink-0 ml-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                            Low
                        </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                        EC2 instances, EBS volumes (≥50 GB), and RDS instances with zero user-defined tags.
                        Detects complete absence of tags rather than checking for specific required keys —
                        less opinionated and universally applicable.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                        <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">
                            untagged_resource
                        </code>
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium text-xs">
                            Opt-in
                        </span>
                    </div>
                </div>
            </div>

            <h2 className="mt-10">Disabling Detectors</h2>
            <p>
                You can suppress specific finding types using the <code>exclusions.detectors</code> key
                in <code>stacksage.yml</code>. The list accepts the finding <em>type</em> strings shown
                in each card above:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`exclusions:
  detectors:
    - ec2_generation_upgrade    # skip generation upgrade suggestions
    - gp2_to_gp3_migration      # skip gp2→gp3 migration hints
    - nat_gateway               # skip NAT advisory findings`}</code></pre>
                </div>
            </div>

            <h2 className="mt-10">Detector Confidence Levels</h2>
            <p>
                Each finding includes a <code>confidence</code> score (0.0–1.0) indicating estimated accuracy:
            </p>
            <ul>
                <li><strong>0.90–1.00:</strong> Very high — deterministic checks (e.g., unattached EBS, unused EIP)</li>
                <li><strong>0.75–0.89:</strong> High — metric-based with clear signal (e.g., low CloudWatch utilization)</li>
                <li><strong>0.60–0.74:</strong> Medium — heuristic or indirect evidence; verify before acting</li>
            </ul>

            <h2 className="mt-10">Related Topics</h2>
            <ul>
                <li><Link href="/docs/configuration">Configure detector thresholds</Link></li>
                <li><Link href="/docs/exclusions">Exclude specific resources from detection</Link></li>
                <li><Link href="/docs/troubleshooting">Why didn&apos;t a detector find my resource?</Link></li>
            </ul>
        </div>
    );
}
