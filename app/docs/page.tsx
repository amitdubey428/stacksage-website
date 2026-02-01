import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "./CodeBlock";

export const metadata: Metadata = {
    title: "Documentation — StackSage",
    description:
        "How StackSage works, what it reads, what it outputs, and how to get started running audits in GitHub Actions.",
};

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
    return (
        <section className="mt-10" id={id}>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
        </section>
    );
}

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        ← Back to Home
                    </Link>
                    <span className="text-sm text-zinc-400">/</span>
                    <Link
                        href="/demo-report"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Sample Report
                    </Link>
                    <span className="text-sm text-zinc-400">/</span>
                    <Link
                        href="/privacy-access"
                        className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Privacy &amp; Access
                    </Link>
                </div>

                <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">Documentation</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    StackSage runs AWS audits in your environment (typically GitHub Actions) using a customer‑controlled read‑only role.
                    It produces a shareable audit pack: a one‑page summary, an HTML report, and machine‑readable findings.
                </p>

                <Section title="What StackSage does">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Finds <span className="font-semibold text-zinc-900 dark:text-zinc-100">cost waste</span> and concrete
                            savings opportunities.
                        </li>
                        <li>
                            Surfaces <span className="font-semibold text-zinc-900 dark:text-zinc-100">spend movers</span> (period-over-period deltas)
                            by service and region when Cost Explorer is enabled.
                        </li>
                        <li>
                            Checks <span className="font-semibold text-zinc-900 dark:text-zinc-100">cost guardrails</span>
                            (Budgets and Anomaly Detection) so you catch spikes early.
                        </li>
                        <li>
                            Flags <span className="font-semibold text-zinc-900 dark:text-zinc-100">security posture signals</span>
                            (IAM hygiene, exposure basics, audit logging, and encryption baselines).
                        </li>
                        <li>
                            Includes <span className="font-semibold text-zinc-900 dark:text-zinc-100">verification CLI commands</span>
                            so teams can independently confirm findings.
                        </li>
                        <li>
                            Makes findings explainable via evidence/provenance (e.g. measured vs heuristic vs skipped due to permissions).
                        </li>
                    </ul>
                </Section>

                <Section title="Cost guardrails (Budgets + Anomaly Detection)">
                    <p>
                        Guardrails are preventative checks that reduce surprise bills. We only report aggregate counts
                        (for example, whether budgets or anomaly alerts exist), never line-item billing exports.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Budgets present? (count only)</li>
                        <li>Anomaly Detection monitors + subscriptions configured? (counts only)</li>
                    </ul>
                </Section>

                <Section title="Spend movers (Cost Explorer) — how to interpret">
                    <p>
                        Spend movers show period-over-period changes by service and region. Read the guide for how to
                        interpret spikes and validate expected vs. unexpected deltas.
                    </p>
                    <p>
                        <Link className="underline" href="/spend-movers">Read the Spend Movers Guide →</Link>
                    </p>
                </Section>

                <Section id="trial" title="Trial mode (self-serve)">
                    <p>
                        StackSage Trial is designed to run without dependency on us: you can set it up in your own repo, run it on demand,
                        and download artifacts. Trial uses a <span className="font-semibold text-zinc-900 dark:text-zinc-100">public</span> GHCR
                        image and does <span className="font-semibold text-zinc-900 dark:text-zinc-100">not</span> require a license.
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Trial is intentionally limited: it caps findings and does not compute exact savings.
                    </p>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">What you need</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>A GitHub repo with Actions enabled</li>
                        <li>AWS credentials (owned by you) stored as GitHub secrets</li>
                        <li>
                            A read-only IAM role ARN that the workflow can assume (recommended). Example:
                            <span className="font-mono"> arn:aws:iam::123456789012:role/StackSageAuditReadOnly</span>
                        </li>
                    </ul>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Step 1 — Create the IAM role (AWS)</h3>
                    <p>
                        Create an IAM role in your AWS account and allow the GitHub runner to assume it (STS AssumeRole). Attach this minimal
                        trial policy to that role. Copy the Role ARN (you will add it as a secret or workflow input).
                    </p>
                    <CodeBlock>{`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "StackSageTrialReadOnly",
            "Effect": "Allow",
            "Action": [
                "sts:GetCallerIdentity",
                "ec2:DescribeRegions",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeAddresses",
                "ec2:DescribeVolumes",
                "iam:GetAccountSummary",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetTrailStatus",
                "s3:GetAccountPublicAccessBlock"
            ],
            "Resource": "*"
        }
    ]
}`}</CodeBlock>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Step 2 — Add GitHub secrets</h3>
                    <p>In your repo: Settings → Secrets and variables → Actions</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Required: <span className="font-mono">AWS_ACCESS_KEY_ID</span>, <span className="font-mono">AWS_SECRET_ACCESS_KEY</span>
                        </li>
                        <li>
                            Recommended: <span className="font-mono">AWS_DEFAULT_REGION</span> (example: <span className="font-mono">us-east-1</span>)
                        </li>
                        <li>
                            Recommended: <span className="font-mono">CUSTOMER_ROLE_ARN</span> (Role ARN to assume)
                        </li>
                        <li>
                            Optional: <span className="font-mono">AWS_SESSION_TOKEN</span>, <span className="font-mono">CUSTOMER_EXTERNAL_ID</span>
                        </li>
                    </ul>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        If you don’t want to assume a role, omit <span className="font-mono">CUSTOMER_ROLE_ARN</span> and the workflow will
                        use the provided AWS credentials directly. Role assumption is recommended for least privilege.
                    </p>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Step 3 — Add the workflow file</h3>
                    <p>
                        Create <span className="font-mono">.github/workflows/stacksage_trial.yml</span> with the workflow below.
                        Run it from GitHub → Actions → “StackSage Audit (Trial)”.
                    </p>
                    <CodeBlock>{`name: StackSage Audit (Trial)

on:
    workflow_dispatch:
        inputs:
            customer_role_arn:
                description: "Customer role ARN to assume"
                required: false
                type: string
            regions:
                description: "Comma-separated AWS regions (optional; default: 1 region for trial)"
                required: false
                type: string
            log_level:
                description: "Log level (INFO/DEBUG)"
                required: false
                default: "INFO"
                type: choice
                options: ["INFO", "DEBUG"]

jobs:
    audit:
        runs-on: ubuntu-latest
        env:
            STACKSAGE_TRIAL_IMAGE: ghcr.io/amitdubey428/stacksage-trial:latest
            AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
            AWS_SESSION_TOKEN: \${{ secrets.AWS_SESSION_TOKEN }}
            AWS_DEFAULT_REGION: \${{ secrets.AWS_DEFAULT_REGION }}
            CUSTOMER_EXTERNAL_ID: \${{ secrets.CUSTOMER_EXTERNAL_ID }}

        steps:
            - name: Pull StackSage trial image
              run: docker pull "\${STACKSAGE_TRIAL_IMAGE}"

            - name: Run audit (trial mode)
              shell: bash
              run: |
                  set -euo pipefail

                  : "\${AWS_ACCESS_KEY_ID:?Missing secret AWS_ACCESS_KEY_ID}"
                  : "\${AWS_SECRET_ACCESS_KEY:?Missing secret AWS_SECRET_ACCESS_KEY}"

                  if [[ -z "\${AWS_DEFAULT_REGION:-}" ]]; then
                      export AWS_DEFAULT_REGION="us-east-1"
                  fi

                  ROLE_ARN="\${{ inputs.customer_role_arn || secrets.CUSTOMER_ROLE_ARN }}"
                  ROLE_ARG=""
                  if [[ -n "\${ROLE_ARN}" ]]; then
                      ROLE_ARG="--role-arn \${ROLE_ARN}"
                  fi

                  REGIONS_ARG=""
                  if [[ -n "\${{ inputs.regions }}" ]]; then
                      REGIONS_ARG="--regions \${{ inputs.regions }}"
                  fi

                  EXT_ID_ARG=""
                  if [[ -n "\${CUSTOMER_EXTERNAL_ID:-}" ]]; then
                      EXT_ID_ARG="--external-id \${CUSTOMER_EXTERNAL_ID}"
                  fi

                  mkdir -p reports

                  docker run --rm \
                      -e AWS_ACCESS_KEY_ID="\${AWS_ACCESS_KEY_ID}" \
                      -e AWS_SECRET_ACCESS_KEY="\${AWS_SECRET_ACCESS_KEY}" \
                      -e AWS_SESSION_TOKEN="\${AWS_SESSION_TOKEN:-}" \
                      -e AWS_DEFAULT_REGION="\${AWS_DEFAULT_REGION:-}" \
                      -v "$PWD":/work -w /app \
                      "\${STACKSAGE_TRIAL_IMAGE}" \
                      bash -lc "python -m stacksage_trial.cli audit \${ROLE_ARG} \${EXT_ID_ARG} \${REGIONS_ARG} --out /work/reports --log-level \${{ inputs.log_level }}"

            - name: Upload reports artifact
              uses: actions/upload-artifact@v4
              with:
                  name: stacksage-reports
                  path: reports/
                  if-no-files-found: error
              env:
                  AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
                  AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  AWS_SESSION_TOKEN: \${{ secrets.AWS_SESSION_TOKEN }}
                  AWS_DEFAULT_REGION: \${{ secrets.AWS_DEFAULT_REGION }}
                  CUSTOMER_EXTERNAL_ID: \${{ secrets.CUSTOMER_EXTERNAL_ID }}
`}</CodeBlock>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Outputs</h3>
                    <p>The workflow uploads an artifact named <span className="font-mono">stacksage-reports</span> containing:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-mono">audit_report.html</span> — includes Security Findings + a limited Cost/Waste Preview
                        </li>
                        <li><span className="font-mono">summary.md</span></li>
                        <li><span className="font-mono">findings.json</span> / <span className="font-mono">findings.csv</span></li>
                        <li><span className="font-mono">run_provenance.json</span></li>
                    </ul>

                    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-100">Troubleshooting</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">AccessDenied</span>: ensure the trial policy is
                            attached to the assumed role and the trust policy allows your GitHub principal.
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">No regions</span>: set <span className="font-mono">AWS_DEFAULT_REGION</span>
                            or provide <span className="font-mono">regions</span> input.
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Missing artifact</span>: confirm the workflow step
                            writes to <span className="font-mono">reports/</span> before upload.
                        </li>
                    </ul>
                </Section>

                <Section title="How it works (high level)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Run StackSage on a schedule (GitHub Actions) or locally.</li>
                        <li>Assume a customer-controlled read-only role (STS AssumeRole).</li>
                        <li>Read resource metadata and (optional) aggregate utilization/spend totals.</li>
                        <li>Generate local artifacts as workflow outputs under your control.</li>
                    </ol>
                </Section>

                <Section title="Outputs">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-mono">summary.md</span> — one-page account brief (top savings, security posture,
                            skipped checks, next actions)
                        </li>
                        <li>
                            <span className="font-mono">audit_report.html</span> — full interactive report (financial findings vs
                            security posture findings, plus complete appendix)
                        </li>
                        <li>
                            <span className="font-mono">findings.json</span> / <span className="font-mono">findings.csv</span> —
                            machine-readable exports
                        </li>
                        <li>
                            Cost Explorer enrichments (optional): historical spend totals and spend movers (period-over-period deltas)
                        </li>
                        <li>
                            <span className="font-mono">remediation_plan.md</span> / <span className="font-mono">remediation_plan.json</span> —
                            prioritized fix plan with safe verification steps (paid runs)
                        </li>
                    </ul>
                    <p>
                        See a real example at <Link className="underline" href="/demo-report">/demo-report</Link>.
                    </p>
                </Section>

                <Section id="paid" title="Paid GitHub workflow ($99/mo)">
                    <p>
                        The paid workflow is the “full” StackSage experience: deeper coverage, richer evidence, and a license secret. Trial is
                        the fastest way to validate the report format and baseline posture.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Runs in your GitHub Actions runner, using a customer-controlled read-only role</li>
                        <li>Private GHCR image + time-limited license secret</li>
                        <li>Includes remediation plan generation (prioritized actions + safe verification steps)</li>
                        <li>Intended for recurring audits (weekly/daily)</li>
                    </ul>
                    <p>
                        For permissions and opt-ins, see <Link className="underline" href="/privacy-access">Privacy &amp; Access</Link>.
                    </p>
                </Section>

                <Section title="Security posture signals (what we check)">
                    <p>
                        StackSage includes baseline posture checks intended to surface obvious risks early and reduce audit blind spots.
                        These checks are designed to be privacy-first: we prefer aggregate evidence and avoid raw sensitive policy contents.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">IAM hygiene</span>: root MFA, root keys,
                            password policy baseline, access key rotation signals
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Exposure basics</span>: public security
                            group ingress on sensitive ports, S3 public access block posture, RDS public/encryption/backup baselines
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Data protection</span>: S3 default encryption
                            and EBS encryption-by-default (region-level)
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Audit logging</span>: CloudTrail baseline,
                            AWS Config recorder status, high-level enablement checks
                        </li>
                        <li>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Detection readiness</span>: CloudWatch alarms
                            presence (counts only) and an incident response readiness signal
                        </li>
                    </ul>
                </Section>

                <Section title="Privacy & permissions">
                    <p>
                        StackSage is privacy-first by default. It runs inside your environment and produces local artifacts; it does not
                        require exporting AWS inventory to a hosted SaaS.
                    </p>
                    <p>
                        Read the detailed permissions matrix and opt-ins here: <Link className="underline" href="/privacy-access">/privacy-access</Link>.
                    </p>
                </Section>

                <Section title="Support">
                    <p>
                        If you get stuck, email <a className="underline" href="mailto:hello@stacksageai.com">hello@stacksageai.com</a>.
                    </p>
                </Section>
            </div>
        </div>
    );
}
