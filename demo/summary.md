# StackSage Summary

- Account: 123456789012
- Timestamp: 2026-02-03 06:07:00 UTC
- Regions scanned: us-east-1, us-west-2
- Opt-ins: CloudWatch=unknown, CostExplorer=unknown, PricingAPI=unknown

- Estimated monthly cost: $426.25
- Estimated monthly savings opportunities: $280.40

## Security posture scorecard
| Check | Status |
| --- | --- |
| Root MFA + no root keys | Fail |
| Password policy baseline | Fail |
| Access key hygiene | Pass |
| S3 account public access block | Fail |
| S3 default encryption | Pass |
| EBS encryption by default | Pass |
| CloudTrail baseline | Fail |
| AWS Config recorder | Pass |
| GuardDuty enabled | Fail |
| Security Hub enabled | Pass |
| CloudWatch alarms present | Pass |

## Security posture findings
- CRITICAL: iam_root_access_keys_present
- CRITICAL: iam_root_mfa_disabled
- HIGH: cloudtrail_not_configured
- HIGH: s3_account_public_access_block_disabled
- HIGH: sg_open_to_world (us-east-1)

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
