import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.formData();
    const payload = Object.fromEntries(data.entries());
    console.log("New lead:", payload);
    return NextResponse.json({ ok: true });
}
