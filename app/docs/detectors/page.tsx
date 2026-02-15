import { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Detectors - StackSage Documentation",
    description: "Complete reference of all StackSage cost and security detectors",
};

export default function DetectorsPage() {
    const detectorCategories = [
        {
            category: "Compute",
            icon: "💻",
            detectors: [
                {
                    name: "EC2 Idle Instances",
                    id: "ec2_idle_instances",
                    description: "Identifies EC2 instances with <5% average CPU utilization over the last 7 days",
                    severity: "High",
                    savings: "$50-500/mo per instance",
                },
                {
                    name: "EC2 Generation Upgrade",
                    id: "ec2_generation_upgrade",
                    description: "Detects instances running on older generation types (e.g., m4 → m6i) with potential 20-30% savings",
                    severity: "Medium",
                    savings: "$20-200/mo per instance",
                },
                {
                    name: "Lambda Low Invocations",
                    id: "lambda_low_invocations",
                    description: "Functions invoked <10 times/day that could be consolidated or removed",
                    severity: "Low",
                    savings: "$5-50/mo per function",
                },
                {
                    name: "Lambda Memory Overprovisioning",
                    id: "lambda_memory_overprovisioning",
                    description: "Functions using <30% of allocated memory with high timeout headroom",
                    severity: "Medium",
                    savings: "$10-100/mo per function",
                },
                {
                    name: "Lambda Graviton Migration (arm64)",
                    id: "lambda_graviton_migration",
                    description: "Recommends migrating x86_64 Lambda functions to arm64 (Graviton) for ~20% compute savings (NEW in v0.5.0)",
                    severity: "Low",
                    savings: "$1-50/mo per function",
                },
                {
                    name: "EC2 → Serverless Migration Opportunities",
                    id: "ec2_to_serverless_migration",
                    description: "Flags small always-on EC2 instances with low CPU as candidates for Lambda + API Gateway (NEW in v0.5.0)",
                    severity: "Medium",
                    savings: "$5-200/mo per instance",
                },
            ],
        },
        {
            category: "Containers",
            icon: "📦",
            detectors: [
                {
                    name: "ECS (EC2) → Fargate Migration Opportunities",
                    id: "ecs_to_fargate",
                    description: "Detects low-utilization ECS services on EC2 and estimates savings by moving to Fargate (NEW in v0.6.0)",
                    severity: "Low",
                    savings: "$5-200/mo per service",
                },
                {
                    name: "Fargate Spot Opportunities (Non-Prod)",
                    id: "fargate_spot_opportunity",
                    description: "Recommends Fargate Spot for dev/test/staging services not already using FARGATE_SPOT (NEW in v0.6.0)",
                    severity: "Low",
                    savings: "$5-200/mo per service",
                },
            ],
        },
        {
            category: "Storage",
            icon: "💾",
            detectors: [
                {
                    name: "EBS Unattached Volumes",
                    id: "ebs_unattached_volumes",
                    description: "Volumes detached for >7 days with no recent snapshots (likely forgotten)",
                    severity: "High",
                    savings: "$10-200/mo per volume",
                },
                {
                    name: "EBS Overprovisioned Performance",
                    id: "ebs_overprovisioned_performance",
                    description: "Volumes with <20% IOPS/throughput utilization over 14 days (NEW in v0.3.0)",
                    severity: "Medium",
                    savings: "$20-500/mo per volume",
                },
                {
                    name: "GP2 to GP3 Migration",
                    id: "gp2_to_gp3_migration",
                    description: "Identifies gp2 volumes that can be migrated to gp3 for 20% cost savings",
                    severity: "Medium",
                    savings: "$5-100/mo per volume",
                },
                {
                    name: "Old EBS Snapshots",
                    id: "ebs_old_snapshots",
                    description: "Snapshots older than 90 days with no associated volume",
                    severity: "Low",
                    savings: "$5-50/mo per snapshot",
                },
            ],
        },
        {
            category: "Database",
            icon: "🗄️",
            detectors: [
                {
                    name: "RDS Low Connections",
                    id: "rds_low_connections",
                    description: "RDS instances with <10 average connections (oversized or unused)",
                    severity: "High",
                    savings: "$50-500/mo per instance",
                },
                {
                    name: "RDS Generation Upgrade",
                    id: "rds_generation_upgrade",
                    description: "Databases on older instance families (e.g., db.m4 → db.m6i)",
                    severity: "Medium",
                    savings: "$30-300/mo per instance",
                },
                {
                    name: "DynamoDB Unused Tables",
                    id: "dynamodb_unused_tables",
                    description: "Tables with zero read/write activity for 30+ days (NEW in v0.4.0)",
                    severity: "Medium",
                    savings: "$5-200/mo per table",
                },
                {
                    name: "RDS → Aurora Serverless v2 Candidates",
                    id: "rds_to_aurora_serverless_v2",
                    description: "Detects spiky RDS workloads (high max CPU, low average) that may benefit from Aurora Serverless v2 (NEW in v0.5.0)",
                    severity: "Medium",
                    savings: "$5-200/mo per instance",
                },
            ],
        },
        {
            category: "Caching",
            icon: "⚡",
            detectors: [
                {
                    name: "ElastiCache Idle Clusters",
                    id: "elasticache_idle_clusters",
                    description: "Redis/Memcached clusters with <5% hit rate and <2 connections for 14+ days (NEW in v0.4.0)",
                    severity: "Medium",
                    savings: "$20-300/mo per cluster",
                },
            ],
        },
        {
            category: "Network",
            icon: "🌐",
            detectors: [
                {
                    name: "NAT Gateway Idle",
                    id: "nat_gateway_idle",
                    description: "NAT Gateways processing <1 GB/day (often in unused VPCs)",
                    severity: "High",
                    savings: "$30-45/mo per NAT",
                },
                {
                    name: "Elastic IP Unattached",
                    id: "eip_unattached",
                    description: "Unattached Elastic IPs incurring hourly charges",
                    severity: "Medium",
                    savings: "$3-5/mo per EIP",
                },
                {
                    name: "Classic Load Balancer Idle",
                    id: "elb_idle",
                    description: "Classic ELBs with <10 requests/day",
                    severity: "Medium",
                    savings: "$20-30/mo per ELB",
                },
                {
                    name: "Load Balancer Empty Target Groups",
                    id: "lb_empty_target_groups",
                    description: "ALB/NLB load balancers where all target groups have zero targets for >7 days (NEW in v0.3.0)",
                    severity: "High",
                    savings: "$15-40/mo per load balancer",
                },
            ],
        },
        {
            category: "Content Delivery & DNS",
            icon: "🌍",
            detectors: [
                {
                    name: "CloudFront Unused Distributions",
                    id: "cloudfront_unused_distributions",
                    description: "Distributions with <100 requests over 30 days (forgotten CDNs) (NEW in v0.4.0)",
                    severity: "Low",
                    savings: "$1-10/mo per distribution",
                },
                {
                    name: "Route 53 Unused Hosted Zones",
                    id: "route53_unused_hosted_zones",
                    description: "Hosted zones with zero DNS queries for 90+ days (NEW in v0.4.0)",
                    severity: "Medium",
                    savings: "$0.50-50/mo per zone",
                },
            ],
        },
    ];

    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h1>All Detectors</h1>
            <p className="lead">
                Comprehensive reference of all cost optimization and security detectors in StackSage.
            </p>

            <div className="not-prose mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-900 dark:text-green-100">25 Active Detectors</span>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            Continuously monitoring your AWS environment
                        </p>
                    </div>
                    <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-900 dark:text-blue-100">Privacy First</span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                            All scans run in your GitHub Actions
                        </p>
                    </div>
                    <div className="rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <span className="font-semibold text-orange-900 dark:text-orange-100">Smart Detection</span>
                        </div>
                        <p className="text-sm text-orange-800 dark:text-orange-200 mb-0">
                            Uses CloudWatch metrics for accuracy
                        </p>
                    </div>
                </div>
            </div>

            {detectorCategories.map((cat) => (
                <div key={cat.category} className="mb-12">
                    <h2 className="flex items-center gap-2">
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
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${detector.severity === 'High'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                                        : detector.severity === 'Medium'
                                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
                                        }`}>
                                        {detector.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                                    {detector.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                        {detector.id}
                                    </code>
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                        {detector.savings}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <h2>Disabling Detectors</h2>
            <p>
                You can disable specific detectors using the <code>stacksage.yml</code> configuration:
            </p>

            <div className="not-prose my-6">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                    <pre className="text-sm overflow-x-auto"><code>{`exclusions:
  detectors:
    - ec2_generation_upgrade  # Disable this detector
    - gp2_to_gp3_migration    # And this one`}</code></pre>
                </div>
            </div>

            <h2>Detector Confidence Levels</h2>
            <p>
                Each finding includes a confidence score (0.0-1.0) indicating accuracy:
            </p>
            <ul>
                <li><strong>0.90-1.00:</strong> Very high confidence (e.g., unattached EBS volumes)</li>
                <li><strong>0.75-0.89:</strong> High confidence (e.g., low CloudWatch metrics)</li>
                <li><strong>0.60-0.74:</strong> Medium confidence (requires validation)</li>
            </ul>

            <h2>Related Topics</h2>
            <ul>
                <li><Link href="/docs/configuration">Configure detector thresholds</Link></li>
                <li><Link href="/docs/exclusions">Exclude specific resources from detection</Link></li>
                <li><Link href="/docs/troubleshooting">Why didn't a detector find my resource?</Link></li>
            </ul>
        </div>
    );
}
