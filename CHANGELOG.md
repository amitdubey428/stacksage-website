# Changelog

All notable changes to this project will be documented in this file.

## Unreleased
- Docs: update demo report page to include remediation plan downloads (paid runs).
- Docs: clarify paid outputs include `remediation_plan.md` / `remediation_plan.json`.
- Demo artifacts: add remediation plan files to the public demo bundle.
- Docs: mention Cost Explorer spend movers in demo report, docs, and privacy/access pages.
- Demo artifacts: refresh demo bundle with spend movers content.
- Docs: add Spend Movers interpretation guide and link it from docs/demo.
- Docs: expand security posture coverage (S3 default encryption, EBS encryption by default, CloudWatch alarms presence).
- Messaging: reposition to “audit pack” (cost + security posture) across hero, features, demo, and docs.
- Pricing: support Stripe Payment Link CTA for paid checkout (optional env var).
- Docs: fix trial IAM policy action for S3 account public access block.
- Docs: align trial policy action with actual AccessDenied (s3:GetAccountPublicAccessBlock).
- Docs: expand trial setup guidance (role ARN, optional assume role) and improve workflow snippet.
- Checkout: add Razorpay Worker integration and checkout CTA.
- Docs: add cost guardrails explanation (Budgets + Anomaly Detection).
