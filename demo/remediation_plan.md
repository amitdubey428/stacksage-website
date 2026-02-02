# StackSage Remediation Plan (v1)

- Account: 123456789012
- Generated: 2026-02-02 04:28:33 UTC
- Estimated savings (actions in this plan): $43.00/mo

This plan is generated from a read-only audit. Treat it as a checklist: verify ownership, blast radius, and compliance/retention before applying.

## Cost optimization actions

### High risk

#### Delete old snapshot after verification (snap-old123456789abc)
- Owner: finops/devops
- Estimated savings: $25.00/mo
- Resource: snapshot snap-old123456789abc
- Region: us-west-2
- Requires approval: yes

Commands:
```bash
# Verify snapshot is not needed (retention/compliance):
aws ec2 describe-snapshots --snapshot-ids snap-old123456789abc --region us-west-2
# Delete only after verification:
aws ec2 delete-snapshot --snapshot-id snap-old123456789abc
```

Rollback:
- Snapshot deletion is irreversible. Before deleting, confirm retention/compliance needs and consider creating a fresh snapshot or copying to a backup vault/account.

#### Delete old snapshot after verification (snap-0123456789abcdef)
- Owner: finops/devops
- Estimated savings: $5.00/mo
- Resource: snapshot snap-0123456789abcdef
- Region: us-east-1
- Requires approval: yes

Commands:
```bash
# Verify snapshot is not needed (retention/compliance):
aws ec2 describe-snapshots --snapshot-ids snap-0123456789abcdef --region us-east-1
# Delete only after verification:
aws ec2 delete-snapshot --snapshot-id snap-0123456789abcdef
```

Rollback:
- Snapshot deletion is irreversible. Before deleting, confirm retention/compliance needs and consider creating a fresh snapshot or copying to a backup vault/account.

### Medium risk

#### Migrate EBS volume gp2 → gp3 (vol-1111222233334444)
- Owner: finops/devops
- Estimated savings: $5.00/mo
- Resource: ebs vol-1111222233334444
- Region: us-east-1
- Requires approval: yes

Commands:
```bash
# Test in non-prod first, then migrate:
aws ec2 modify-volume --volume-id vol-1111222233334444 --volume-type gp3
# Monitor performance after migration:
aws cloudwatch get-metric-statistics --namespace AWS/EBS --metric-name VolumeReadOps --dimensions Name=VolumeId,Value=vol-1111222233334444 --start-time $(date -u -v-1d '+%Y-%m-%dT%H:%M:%S') --end-time $(date -u '+%Y-%m-%dT%H:%M:%S') --period 300 --statistics Average
```

Rollback:
- You can usually revert by modifying the volume type back to gp2 (note: performance characteristics may differ).

#### Release unused Elastic IP (34.210.98.76)
- Owner: finops/devops
- Estimated savings: $4.00/mo
- Resource: eip 34.210.98.76
- Region: us-west-2
- Requires approval: yes

Commands:
```bash
# Verify EIP is truly unused (no association):
aws ec2 describe-addresses --public-ips 34.210.98.76 --region us-west-2
# If unassociated, release:
aws ec2 release-address --public-ip 34.210.98.76
```

Rollback:
- Allocate a new Elastic IP and update any DNS / allowlists if you later need a static IP.

#### Release unused Elastic IP (54.123.45.67)
- Owner: finops/devops
- Estimated savings: $4.00/mo
- Resource: eip 54.123.45.67
- Region: us-east-1
- Requires approval: yes

Commands:
```bash
# Verify EIP is truly unused (no association):
aws ec2 describe-addresses --public-ips 54.123.45.67 --region us-east-1
# If unassociated, release:
aws ec2 release-address --public-ip 54.123.45.67
```

Rollback:
- Allocate a new Elastic IP and update any DNS / allowlists if you later need a static IP.