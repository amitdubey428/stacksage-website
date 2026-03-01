# Razorpay Worker (Cloudflare)

> ⚠️ **NOT IN USE** — as of 2026-03 StackSage processes payments exclusively through Paddle.
> This worker is kept for reference and is **not deployed**. Active payment worker: `workers/paddle/`

Endpoints:
- `POST /create-order` — creates a Razorpay order
- `POST /webhook` — validates Razorpay webhook signature

## Required secrets (Cloudflare Workers)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `RAZORPAY_AMOUNT_INR_PAISE` (e.g., 909900 for ₹9,099)

## Vars
- `ALLOWED_ORIGIN` (e.g., https://stacksageai.com)
- `RAZORPAY_CURRENCY` (default: INR)
- `RECEIPT_PREFIX` (default: stacksage)

## Quick deploy
```bash
wrangler deploy
```
