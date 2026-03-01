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
    // Strip anything that isn't a valid base64 character.
    // Newlines come from openssl wrapping; '%' appears when zsh's no-newline
    // indicator is accidentally included when copying terminal output.
    const cleanKey = privateKeyPkcs8B64.replace(/[^A-Za-z0-9+/=]/g, "");
    const pkcs8 = Uint8Array.from(atob(cleanKey), (c) => c.charCodeAt(0));
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
    .steps{background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;margin:12px 0}
    .steps code{background:#e5e7eb;border-radius:3px;padding:2px 6px;font-size:13px;font-family:'SF Mono',Monaco,Consolas,monospace;display:block;margin:6px 0;word-break:break-all}
    ul{padding-left:20px;margin:8px 0}
    li{font-size:14px;line-height:1.7;color:#374151}
    code{background:#f3f4f6;border-radius:3px;padding:1px 5px;font-size:13px;font-family:monospace}
    a{color:#2563eb}
    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af}
    .note{background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px 14px;font-size:13px;color:#1e40af;margin:12px 0}
  </style>
</head>
<body>
<div class="wrap">
  <h1>Your StackSage Pro license is ready <span class="badge">ACTIVE</span></h1>
  <p>Hi ${escHtml(p.customerName)},</p>
  <p>Thanks for subscribing. Your license is active until <strong>${p.expiresDate}</strong>. You can run your first full audit in under 2 minutes.</p>

  <h2>Your license key</h2>
  <div class="label">STACKSAGE_LICENSE</div>
  <div class="cred">${escHtml(p.licenseToken)}</div>
  <p style="font-size:13px;color:#6b7280">Keep this private. It\'s tied to your subscription and expires on ${p.expiresDate}.</p>

  <h2>Option A — Run on your machine right now (fastest)</h2>
  <p>Requires Python 3.10+ and AWS credentials already configured (<code>~/.aws/credentials</code>, env vars, or SSO).</p>
  <div class="steps">
    <code>pip install stacksage</code>
    <code>export STACKSAGE_LICENSE=${escHtml(p.licenseToken)}</code>
    <code>stacksage scan</code>
  </div>
  <p>The full HTML report opens in your browser automatically when the scan completes.</p>
  <p>Use <code>--profile my-sso-profile</code> for SSO, or <code>--role-arn arn:aws:iam::123456789012:role/ReadOnly</code> to assume a cross-account role.</p>
  <p><a href="https://stacksageai.com/docs/cli-reference/">Full CLI reference →</a></p>

  <div class="note">
    <strong>Tip:</strong> Add <code>export STACKSAGE_LICENSE=...</code> to your shell profile (<code>~/.zshrc</code> or <code>~/.bashrc</code>) so you don\'t need to set it every time.
  </div>

  <h2>Option B — GitHub Actions (scheduled / automated audits)</h2>
  <p>For automated weekly audits in CI/CD. Add these secrets to your repo under <strong>Settings → Secrets and variables → Actions</strong>:</p>
  <div class="label">STACKSAGE_LICENSE</div>
  <div class="cred">${escHtml(p.licenseToken)}</div>
  <div class="label">STACKSAGE_IMAGE</div>
  <div class="cred">${escHtml(p.ghcrImage)}</div>
  <div class="label">STACKSAGE_GHCR_USERNAME</div>
  <div class="cred">${escHtml(p.ghcrUsername)}</div>
  <div class="label">STACKSAGE_GHCR_TOKEN</div>
  <div class="cred">${escHtml(p.ghcrToken)}</div>
  <p>Then add the workflow file to your repo:</p>
  <p><a href="https://stacksageai.com/docs/github-actions/">GitHub Actions setup guide →</a></p>

  <h2>IAM setup (recommended for least-privilege access)</h2>
  <p>Create a read-only IAM role and pass it via <code>--role-arn</code>. Takes 5 minutes and means StackSage never touches your default credentials.</p>
  <p><a href="https://stacksageai.com/docs/iam-policy/">IAM policy setup guide →</a></p>

  <div class="footer">
    Questions? Reply to this email — we typically respond within 48 hours.<br/>
    StackSage · <a href="https://stacksageai.com">stacksageai.com</a><br/>
    License expires ${p.expiresDate}. We\'ll send a renewal reminder before then.
  </div>
</div>
</body>
</html>`;
}

function buildEmailText(p: EmailParams): string {
    return `Hi ${p.customerName},

Your StackSage Pro license is ready. Active until ${p.expiresDate}.

YOUR LICENSE KEY
${p.licenseToken}

Keep this private — it's tied to your subscription.

====================================================
OPTION A — Run on your machine right now (fastest)
====================================================
Requires Python 3.10+ and AWS credentials configured.

  pip install stacksage
  export STACKSAGE_LICENSE=${p.licenseToken}
  stacksage scan

The full HTML report opens in your browser when the scan completes.
Use --profile for SSO or --role-arn for cross-account access.

Full CLI reference: https://stacksageai.com/docs/cli-reference/

Tip: add the export line to ~/.zshrc or ~/.bashrc to persist it.

====================================================
OPTION B — GitHub Actions (scheduled / automated audits)
====================================================
Add these secrets to your repo:
Settings → Secrets and variables → Actions

STACKSAGE_LICENSE
${p.licenseToken}

STACKSAGE_IMAGE
${p.ghcrImage}

STACKSAGE_GHCR_USERNAME
${p.ghcrUsername}

STACKSAGE_GHCR_TOKEN
${p.ghcrToken}

Workflow setup guide: https://stacksageai.com/docs/github-actions/

====================================================
IAM SETUP (recommended for least-privilege access)
====================================================
https://stacksageai.com/docs/iam-policy/

Questions? Reply here — we typically respond within 48 hours.
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
            reply_to: "hello@stacksageai.com",
            subject: "Your StackSage Pro license is ready",
            tags: [{ name: "category", value: "onboarding" }],
            html: buildEmailHtml(p),
            text: buildEmailText(p),
        }),
    });

    const body = await resp.text();
    console.log(`[stacksage] Resend response status=${resp.status} body=${body}`);

    if (!resp.ok) {
        throw new Error(`Resend API error ${resp.status}: ${body}`);
    }
}
