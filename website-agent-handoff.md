# Website Agent Handoff (Truth-Aligned Copy + Demo Report)

This doc is a handoff for the website-building agent. It captures what StackSage *actually does today* in this repo and what the website should (and should not) claim.

## Product truth (what we ship)
- StackSage runs **inside the customer’s GitHub Actions runner**.
- Customers pull StackSage as a **private Docker image from GHCR** (closed-source distribution).
- Customers provide AWS access via **an IAM principal they control** (typically an IAM user in GitHub secrets that can assume a read-only role).
- Outputs are generated as **workflow artifacts** (HTML report + JSON + CSV).
- Optional enrichments:
  - CloudWatch utilization (requires extra permissions)
  - Cost Explorer historical spend (requires `ce:*` read permissions)
- The workflow supports both:
  - `workflow_dispatch` (manual runs with inputs)
  - `schedule` (scheduled runs; requires `CUSTOMER_ROLE_ARN` secret because scheduled runs can’t prompt for inputs)

## What the website should say (and not say)

### Positioning (recommended)
Keep it evidence-first and privacy-first:
- “Run an AWS waste & hygiene audit in your GitHub Actions runner.”
- “No SaaS ingestion of AWS credentials.”
- “You get an HTML report + machine-readable findings (JSON/CSV).”

Avoid claims that imply we host/operate inside the customer’s AWS account (we don’t) or that we provide a managed dashboard today (we don’t).

### Claims to remove or soften
If currently present on the site, remove or tone these down unless/ until you can back them up with product + data:
- “Watch your AWS bill drop 10–50%” / “10–50% avg savings”
  - Replace with: “Find common cost and waste opportunities (e.g., idle resources, storage waste, mis-sizing signals when available).”
- “Dashboards & recurring reports” (unless you actually host dashboards)
  - Replace with: “Recurring scheduled audits in GitHub Actions (reports as artifacts).”
- “SSO/SAML” (unless implemented)
  - Remove.

### Pricing section
If you keep a pricing section, ensure it doesn’t imply SaaS hosting features we don’t have.
A safe minimal alternative is:
- “Pilot pricing: contact us” or “Early access pricing (email us)”

(If you do keep tiers, remove claims like dashboards/SSO and describe what the customer actually receives: private image access + workflow template + report artifacts + support.)

## Demo report update (required)
The site currently links to a hosted demo report. We now have an updated demo report artifact in this repo that reflects the current product output (including Cost Explorer “Historical Spend Breakdown (Top)” tables).

Use these files from this repo:
- `reports/mock-demo/audit_report.html` (primary demo HTML)
- `reports/mock-demo/findings.json` (machine-readable findings payload)
- `reports/mock-demo/findings.csv` (CSV export)

Website action:
- Replace the hosted demo report at `/demo/audit_report.html` with `reports/mock-demo/audit_report.html`.
- Ensure the “View Sample Report” link points to that file.

## Workflow + privacy notes (safe, accurate copy)
Recommended bullets for the site:
- “Runs in your GitHub Actions runner.”
- “Reads your AWS account using a customer-controlled read-only IAM role.”
- “Produces a report you can download as a workflow artifact.”
- “Optional: include CloudWatch and Cost Explorer data if you enable permissions.”

Important nuance for scheduled runs:
- Manual runs can accept an input `customer_role_arn`.
- Scheduled runs **cannot** accept manual inputs, so scheduled runs must use a repo secret `CUSTOMER_ROLE_ARN`.

## Fix broken legal links
During validation, `/privacy` and `/terms` returned 404.
Website action:
- Either create these pages, or remove the links until pages exist.
