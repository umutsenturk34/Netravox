import { NextResponse } from "next/server";

export async function POST(request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const slug = process.env.NEXT_PUBLIC_TENANT_SLUG || "netravox";

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Geçersiz istek" }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiUrl}/api/public/${slug}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Sunucuya ulaşılamadı" }, { status: 502 });
  }
}
