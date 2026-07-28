import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
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

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "laodemuhikhsan18@gmail.com",
      subject: `[Portfolio Contact] Pesan Baru dari ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">Pesan Baru dari Halaman Kontak Portfolio</h2>
          <p><strong>Nama Pengirim:</strong> ${name}</p>
          <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #0891b2; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold;">Pesan:</p>
            <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
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
