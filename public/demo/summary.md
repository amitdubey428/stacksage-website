# StackSage Summary

- Account: 123456789012
- Timestamp: 2026-01-19 09:58:06 UTC
- Regions scanned: us-east-1, us-west-2
- Opt-ins: CloudWatch=unknown, CostExplorer=unknown, PricingAPI=unknown

- Estimated monthly cost: $426.25
- Estimated monthly savings opportunities: $280.40

## Top risks (security/exposure/audit logging)
- CRITICAL: idle_ec2 (us-east-1)
- HIGH: idle_elb (us-east-1)
- HIGH: unattached_ebs (us-east-1)
- HIGH: unattached_ebs (us-west-2)
- MEDIUM: cloudwatch_logs_retention (us-east-1)

## Top cost opportunities
- $78.00/mo: underutilized_rds (us-east-1)
- $62.40/mo: idle_ec2 (us-east-1)
- $50.00/mo: unattached_ebs (us-west-2)
- $25.00/mo: old_snapshot (us-west-2)
- $25.00/mo: idle_elb (us-east-1)

## Next actions
- Review any CRITICAL/HIGH findings first and confirm exposure changes with your security owner.
- Apply the top cost savings candidates, then re-run the audit to validate changes.
- If you see many ‘Skipped’ checks, expand the read-only IAM policy (see docs/privacy-access.md).
