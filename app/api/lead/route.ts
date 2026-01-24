import { NextResponse } from "next/server";

const ALLOWED_FIELDS = new Set([
    "name",
    "email",
    "company",
    "role",
    "source",
    "message",
]);

const MAX_MESSAGE_LEN = 2000;

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("form")) {
        return NextResponse.json(
            { ok: false, error: "unsupported_content_type" },
            { status: 415 }
        );
    }

    const data = await req.formData();
    const payload = Object.fromEntries(data.entries());
    const normalized: Record<string, string> = {};

    for (const [key, value] of Object.entries(payload)) {
        if (!ALLOWED_FIELDS.has(key)) {
            continue;
        }
        const strValue = String(value).trim();
        if (key === "message" && strValue.length > MAX_MESSAGE_LEN) {
            return NextResponse.json(
                { ok: false, error: "message_too_long" },
                { status: 400 }
            );
        }
        normalized[key] = strValue;
    }

    if (normalized.email && !isValidEmail(normalized.email)) {
        return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // TODO: persist via secure backend (avoid logging PII in production)
    return NextResponse.json({ ok: true });
}
