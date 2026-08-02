import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestsByIp = new Map<string, number[]>();

const getClientIp = (req: Request): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const timestamps = (requestsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestsByIp.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  return false;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: "Terlalu banyak pesan. Coba lagi beberapa saat lagi." },
        { status: 429 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }
    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY missing from environment variables.");
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap (RESEND_API_KEY missing)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL ||
      "Portfolio Ikhsan Mbala <onboarding@resend.dev>";

    const data = await resend.emails.send({
      from: fromAddress,
      to: "laodemuhikhsan18@gmail.com",
      subject: `Pesan Baru Portfolio dari ${safeName}`,
      replyTo: safeEmail,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">Pesan Baru dari Halaman Kontak Portfolio</h2>
          <p><strong>Nama Pengirim:</strong> ${safeName}</p>
          <p><strong>Email Pengirim:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #0891b2; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold;">Pesan:</p>
            <p style="white-space: pre-wrap; margin-top: 8px;">${safeMessage}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">Email ini dikirim otomatis dari form kontak portfolio Anda.</p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API error:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Gagal mengirim email." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Internal Server Error in contact API:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat mengirim pesan." },
      { status: 500 }
    );
  }
}
