import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  country?: string;
  projectType?: string;
  message?: string;
  samples?: string[];
  lang?: "en" | "zh";
};

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactTo = process.env.CONTACT_TO;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY." },
        { status: 500 }
      );
    }

    if (!contactTo) {
      return NextResponse.json(
        { error: "Missing CONTACT_TO." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = (await request.json()) as ContactPayload;

    const {
      name = "",
      company = "",
      email = "",
      country = "",
      projectType = "",
      message = "",
      samples = [],
      lang = "en",
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const selectedSamples =
      samples.length > 0 ? samples.join(", ") : "No samples selected";

    // 寄給 WEVINE
    await resend.emails.send({
      from: "WEVINE Website <hello@wevinewallcoverings.com>",
      to: [contactTo],
      replyTo: email,
      subject: `WEVINE Sample Request${name ? ` from ${name}` : ""}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#2d241c;line-height:1.7">
          <h2>WEVINE Sample Request</h2>

          <hr>

          <p><strong>Name:</strong> ${name || "-"}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Country:</strong> ${country || "-"}</p>
          <p><strong>Project Type:</strong> ${projectType || "-"}</p>

          <hr>

          <p><strong>Selected Samples</strong></p>
          <p>${selectedSamples}</p>

          <hr>

          <p><strong>Message</strong></p>
          <p>${message || "-"}</p>
        </div>
      `,
    });

    // 自動回覆客戶
    await resend.emails.send({
      from: "WEVINE <hello@wevinewallcoverings.com>",
      to: [email],
      subject:
        lang === "zh"
          ? "我們已收到您的 WEVINE 樣品申請"
          : "We have received your WEVINE sample request",
      html: `
        <div style="font-family:Arial,sans-serif;color:#2d241c;line-height:1.7">
          <h2>WEVINE</h2>

          <p>
            ${
              lang === "zh"
                ? `您好${name ? `，${name}` : ""}：`
                : `Dear ${name || "there"},`
            }
          </p>

          <p>
            ${
              lang === "zh"
                ? "感謝您對 WEVINE 的關注。我們已收到您的樣品申請，將盡快與您聯繫。"
                : "Thank you for your interest in WEVINE. We have received your sample request and will contact you shortly."
            }
          </p>

          <p><strong>${
            lang === "zh" ? "已選樣品" : "Selected Samples"
          }</strong></p>

          <p>${selectedSamples}</p>

          <br>

          <p>${
            lang === "zh"
              ? "WEVINE 團隊"
              : "The WEVINE Team"
          }</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to send request.",
      },
      {
        status: 500,
      }
    );
  }
}