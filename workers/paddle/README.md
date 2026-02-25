# Paddle Webhook Worker (Cloudflare)

Zero-touch fulfillment: customer pays → license + onboarding email delivered automatically, no human in the loop.

## How the flow works

```
Customer clicks "Buy now" on the pricing page
  → enters work email (captured in customData)
  → Paddle checkout overlay opens (pre-filled with email)
  → customer completes payment
        ↓  Paddle fires transaction.completed webhook
Cloudflare Worker
  1. Verifies HMAC-SHA256 Paddle signature
  2. Extracts email from customData / customer obj / billing_details
  3. Derives license duration from billing_cycle (monthly = 35d, annual = 370d)
  4. Signs Ed25519 license token in-Worker (SubtleCrypto — no external service)
  5. POSTs onboarding email via Resend API containing:
       • STACKSAGE_IMAGE
       • STACKSAGE_GHCR_USERNAME
       • STACKSAGE_GHCR_TOKEN
       • STACKSAGE_LICENSE  (signed token, expires on date shown)
       • Step-by-step setup links
        ↓
Customer adds 4 secrets to their GitHub repo + workflow template → running audits
```

## Required secrets

Set all four via Wrangler before deploying:

```bash
cd workers/paddle

# Paddle webhook HMAC key (Paddle > Developer Tools > Notifications > your endpoint)
wrangler secret put PADDLE_WEBHOOK_SECRET

# Ed25519 private key — PKCS8 DER, base64-encoded (see Key prep below)
wrangler secret put STACKSAGE_PRIVATE_KEY_PKCS8_B64

# stacksage-bot classic PAT — read:packages scope only
wrangler secret put STACKSAGE_GHCR_TOKEN

# Resend API key (https://resend.com — free tier: 3k emails/month)
wrangler secret put RESEND_API_KEY
```

## Vars (wrangler.toml — edit before deploying)

| Var | Default | Notes |
|-----|---------|-------|
| `ALLOWED_ORIGIN` | `https://stacksageai.com` | CORS origin |
| `STACKSAGE_IMAGE` | `ghcr.io/amitdubey428/stacksage-audit:v0.7.1` | Update on each release |
| `STACKSAGE_GHCR_USERNAME` | `stacksage-bot` | |
| `FROM_EMAIL` | `onboarding@stacksageai.com` | Must be verified in Resend |
| `LICENSE_DAYS_DEFAULT` | `365` | Fallback when billing_cycle not present |

## Key prep — convert private key to PKCS8 base64

Your signing key must be in PKCS8 DER format, base64-encoded.

```bash
# If your PEM starts with "-----BEGIN PRIVATE KEY-----" (already PKCS8):
openssl pkcs8 -in stacksage_license_ed25519_private.pem -topk8 -nocrypt -outform DER \
  | base64 | tr -d '\n'
# → paste the output as STACKSAGE_PRIVATE_KEY_PKCS8_B64

# If your PEM starts with "-----BEGIN OPENSSH PRIVATE KEY-----":
# Convert it to PKCS8 first (in-place):
ssh-keygen -p -m pkcs8 -f stacksage_license_ed25519_private.pem -N ""
# Then run the openssl command above
```

## Deploy

```bash
cd workers/paddle
npm install
wrangler deploy
```

After deploying, copy the worker URL shown (e.g. `https://stacksage-paddle.<subdomain>.workers.dev/webhook`) and add it as a **Notification Destination** in Paddle > Developer Tools > Notifications.

Subscribe to these events:
- `transaction.completed`
- `subscription.activated`
- `subscription.canceled`

## Local dev

```bash
npm run dev
# Worker runs at http://localhost:8787
# Test with: curl -X POST http://localhost:8787/webhook ...
```

## Endpoint

`POST /webhook` — Paddle sends all events here. Verifies signature, processes, always returns `200 ok` (to prevent Paddle retries on fulfillment errors — errors are logged to Worker logs).
