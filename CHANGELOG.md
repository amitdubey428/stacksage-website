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
- Docs: add cost guardrails explanation (Budgets + Anomaly Detection).

## 2026-02-25
- Payments: replace Razorpay with Paddle as payment processor; checkout handled client-side via Paddle.js.
- Payments: add Cloudflare Worker (`workers/paddle`) for Paddle webhook signature verification and subscription event handling.
- Pricing: update paid tier description to "Monthly subscription", add "Cancel anytime" feature bullet, add "+ taxes" label.
- Legal: rename Terms page to Terms and Conditions; explicitly mention StackSage as legal business name.
- Legal: add Refund Policy page (`/refund-policy/`) — non-refundable with trial-first justification.
- Legal: document cancellation steps in Refund Policy and below pricing cards (Paddle customer portal + email fallback).
- Footer: add Refund Policy link.
- Sitemap: add `/refund-policy` route.
