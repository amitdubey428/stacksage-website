# Paddle Webhook Worker (Cloudflare)

Handles Paddle webhook events and verifies signatures.

## Endpoints

- `POST /webhook` — validates Paddle webhook signature and processes events

## Required secrets (set via Wrangler)

```bash
wrangler secret put PADDLE_WEBHOOK_SECRET
```

- `PADDLE_WEBHOOK_SECRET` — the secret key shown when creating a notification destination in Paddle > Developer Tools > Notifications

## Vars (wrangler.toml)

- `ALLOWED_ORIGIN` — your site URL (default: `https://stacksageai.com`)

## Quick deploy

```bash
cd workers/paddle
wrangler deploy
```

After deploying, copy the worker URL (e.g. `https://stacksage-paddle.<subdomain>.workers.dev/webhook`)
and add it as a notification destination in Paddle > Developer Tools > Notifications.

## Events handled

- `transaction.completed` — one-time purchase completed
- `subscription.activated` — new subscription activated
- `subscription.canceled` — subscription cancelled

Add license provisioning logic in the `TODO` sections of `src/index.ts`.
