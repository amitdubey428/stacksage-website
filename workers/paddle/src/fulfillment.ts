/**
 * fulfillment.ts — license signing + onboarding email delivery
 *
 * Copied identically into workers/paddle/src/ and workers/razorpay/src/.
 * Both workers perform Ed25519 signing in-process (no external signing service).
 *
 * Private key setup (run once on your machine):
 *   # If your PEM header is "-----BEGIN PRIVATE KEY-----" (PKCS8):
 *   openssl pkcs8 -in stacksage_license_ed25519_private.pem -topk8 -nocrypt -outform DER \
 *     | base64 | tr -d '\n'
 *   # → paste the result as the STACKSAGE_PRIVATE_KEY_PKCS8_B64 Worker secret
 *
 *   # If your PEM header is "-----BEGIN OPENSSH PRIVATE KEY-----":
 *   ssh-keygen -p -m pkcs8 -f stacksage_license_ed25519_private.pem -N ""
 *   # (converts in-place to PKCS8 PEM), then apply the openssl command above
 */

export interface FulfillmentInput {
    customerName: string;
    customerEmail: string;
    /** Plan identifier that goes into the license payload, e.g. "pro", "pilot" */
    plan: string;
    /** Number of days the license should be valid */
    daysValid: number;
    ghcrImage: string;
    ghcrUsername: string;
    ghcrToken: string;
    /** Base64-encoded PKCS8 DER private key bytes */
    privateKeyPkcs8B64: string;
    resendApiKey: string;
    fromEmail: string;
}

// ── License signing ────────────────────────────────────────────────────────────

function b64urlEncode(bytes: Uint8Array): string {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Signs a license token using the same algorithm as generate_paid_access_bundle.py.
 *
 * Output format:  STACKSAGE1.<payload_b64url>.<sig_b64url>
 * Payload JSON:   {"customer":"...","exp":...,"iat":...,"plan":"..."}  (keys sorted)
 */
export async function signLicense(
    privateKeyPkcs8B64: string,
    customer: string,
    plan: string,
    daysValid: number,
): Promise<string> {
    const pkcs8 = Uint8Array.from(atob(privateKeyPkcs8B64), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
        "pkcs8",
        pkcs8,
        { name: "Ed25519" },
        false,
        ["sign"],
    );

    const now = Math.floor(Date.now() / 1000);
    const exp = now + daysValid * 86400;

    // Reproduce Python's json.dumps(sort_keys=True, separators=(',', ':'))
    const raw: Record<string, string | number> = { customer, exp, iat: now, plan };
    const sortedObj: Record<string, string | number> = {};
    for (const k of Object.keys(raw).sort()) sortedObj[k] = raw[k];
    // JSON.stringify without options produces compact output (no spaces), matching Python separators=(',',':')
    const payloadJson = JSON.stringify(sortedObj);

    const payloadB64 = b64urlEncode(new TextEncoder().encode(payloadJson));
    const signingInput = new TextEncoder().encode(`STACKSAGE1.${payloadB64}`);
    const sig = await crypto.subtle.sign({ name: "Ed25519" }, key, signingInput);

    return `STACKSAGE1.${payloadB64}.${b64urlEncode(new Uint8Array(sig))}`;
}

// ── Orchestration ──────────────────────────────────────────────────────────────

export async function fulfillOrder(input: FulfillmentInput): Promise<void> {
    const licenseToken = await signLicense(
        input.privateKeyPkcs8B64,
        input.customerName,
        input.plan,
        input.daysValid,
    );

    const expiresDate = new Date(Date.now() + input.daysValid * 86400 * 1000)
        .toISOString()
        .split("T")[0];

    await sendOnboardingEmail({
        resendApiKey: input.resendApiKey,
        fromEmail: input.fromEmail,
        toEmail: input.customerEmail,
        customerName: input.customerName,
        licenseToken,
        ghcrImage: input.ghcrImage,
        ghcrUsername: input.ghcrUsername,
        ghcrToken: input.ghcrToken,
        expiresDate,
    });
}

// ── Email ──────────────────────────────────────────────────────────────────────

interface EmailParams {
    resendApiKey: string;
    fromEmail: string;
    toEmail: string;
    customerName: string;
    licenseToken: string;
    ghcrImage: string;
    ghcrUsername: string;
    ghcrToken: string;
    expiresDate: string;
}

function buildEmailHtml(p: EmailParams): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;background:#fff;margin:0;padding:0}
    .wrap{max-width:620px;margin:32px auto;padding:32px 24px}
    h1{font-size:22px;margin:0 0 4px}
    .badge{display:inline-block;background:#dcfce7;color:#166534;font-size:11px;font-weight:700;border-radius:3px;padding:2px 8px;margin-left:8px;vertical-align:middle;letter-spacing:.04em}
    h2{font-size:14px;font-weight:700;color:#374151;margin:28px 0 8px;border-top:1px solid #f0f0f0;padding-top:16px;text-transform:uppercase;letter-spacing:.05em}
    p{margin:8px 0;font-size:15px;line-height:1.6;color:#374151}
    .label{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#9ca3af;margin-bottom:4px;font-weight:600}
    .cred{background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:12px 14px;font-family:'SF Mono',Monaco,Consolas,monospace;font-size:12px;word-break:break-all;color:#1a1a1a;margin-bottom:16px}
    ul{padding-left:20px;margin:8px 0}
    li{font-size:14px;line-height:1.7;color:#374151}
    code{background:#f3f4f6;border-radius:3px;padding:1px 5px;font-size:13px;font-family:monospace}
    a{color:#2563eb}
    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af}
  </style>
</head>
<body>
<div class="wrap">
  <h1>Your StackSage access is ready <span class="badge">ACTIVE</span></h1>
  <p>Hi ${escHtml(p.customerName)},</p>
  <p>Thanks for subscribing to StackSage. Your license is active until <strong>${p.expiresDate}</strong>.
  Add the four secrets below to your GitHub repo and you'll be running your first audit in under 10 minutes.</p>

  <h2>Step 1 — Add secrets to your GitHub repo</h2>
  <p>Go to your repo → <strong>Settings → Secrets and variables → Actions → New repository secret</strong></p>

  <div class="label">STACKSAGE_IMAGE</div>
  <div class="cred">${escHtml(p.ghcrImage)}</div>

  <div class="label">STACKSAGE_GHCR_USERNAME</div>
  <div class="cred">${escHtml(p.ghcrUsername)}</div>

  <div class="label">STACKSAGE_GHCR_TOKEN</div>
  <div class="cred">${escHtml(p.ghcrToken)}</div>

  <div class="label">STACKSAGE_LICENSE</div>
  <div class="cred">${escHtml(p.licenseToken)}</div>

  <h2>Step 2 — Add your AWS credentials</h2>
  <ul>
    <li><code>AWS_ACCESS_KEY_ID</code></li>
    <li><code>AWS_SECRET_ACCESS_KEY</code></li>
    <li><code>AWS_DEFAULT_REGION</code> <span style="color:#9ca3af">(optional; fallback for endpoint discovery)</span></li>
  </ul>
  <p>For least-privilege access, create a read-only role and add <code>CUSTOMER_ROLE_ARN</code> as a secret (see IAM setup below).</p>

  <h2>Step 3 — Install the workflow</h2>
  <p>Create <code>.github/workflows/stacksage_audit.yml</code> in your repo using the template from our docs:</p>
  <p><a href="https://stacksageai.com/docs/github-actions/">stacksageai.com/docs/github-actions</a></p>

  <h2>Step 4 — AWS IAM role setup (recommended)</h2>
  <p>Create a read-only IAM role for least-privilege access. Full instructions including the policy JSON:</p>
  <p><a href="https://stacksageai.com/docs/iam-policy/">stacksageai.com/docs/iam-policy</a></p>

  <h2>Run your first audit</h2>
  <p>Actions → <em>StackSage Audit</em> → <strong>Run workflow</strong>.<br/>
  The audit pack (HTML report + JSON/CSV findings) uploads as a workflow artifact when the run completes.</p>

  <div class="footer">
    Questions? Reply to this email — we'll help you get set up.<br/>
    StackSage · <a href="https://stacksageai.com">stacksageai.com</a><br/>
    License expires ${p.expiresDate}. We'll send a renewal notice before then.
  </div>
</div>
</body>
</html>`;
}

function buildEmailText(p: EmailParams): string {
    return `Hi ${p.customerName},

Your StackSage access is ready. License active until ${p.expiresDate}.

====================================================
STEP 1 — GitHub Actions secrets
====================================================
Add all four to your repo:
Settings → Secrets and variables → Actions → New repository secret

STACKSAGE_IMAGE
${p.ghcrImage}

STACKSAGE_GHCR_USERNAME
${p.ghcrUsername}

STACKSAGE_GHCR_TOKEN
${p.ghcrToken}

STACKSAGE_LICENSE
${p.licenseToken}

====================================================
STEP 2 — Your AWS credentials (add to the same repo)
====================================================
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_DEFAULT_REGION (optional)

For least-privilege: create a read-only role and add CUSTOMER_ROLE_ARN.
IAM setup guide: https://stacksageai.com/docs/iam-policy/

====================================================
STEP 3 — Workflow template
====================================================
https://stacksageai.com/docs/github-actions/

====================================================
STEP 4 — Run your first audit
====================================================
Actions → StackSage Audit → Run workflow
(Results upload as a workflow artifact when the run completes.)

Questions? Reply here — we'll help.
— StackSage · https://stacksageai.com
`;
}

function escHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

async function sendOnboardingEmail(p: EmailParams): Promise<void> {
    const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${p.resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: p.fromEmail,
            to: p.toEmail,
            subject: "Your StackSage access is ready",
            html: buildEmailHtml(p),
            text: buildEmailText(p),
        }),
    });

    if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`Resend API error ${resp.status}: ${body}`);
    }
}
