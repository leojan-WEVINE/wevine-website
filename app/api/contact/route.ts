import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "WEVINE Website <hello@wevinewallcoverings.com>",
      to: ["hello@wevinewallcoverings.com"],
      replyTo: email,
      subject: `WEVINE Sample Request${name ? ` from ${name}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #2d241c; line-height: 1.6;">
          <h2 style="font-weight: 400; letter-spacing: 0.08em;">
            WEVINE Sample Request
          </h2>

          <hr style="border: none; border-top: 1px solid #d8cbbb; margin: 24px 0;" />

          <p><strong>Name:</strong> ${name || "-"}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Country / Region:</strong> ${country || "-"}</p>
          <p><strong>Project Type:</strong> ${projectType || "-"}</p>

          <hr style="border: none; border-top: 1px solid #d8cbbb; margin: 24px 0;" />

          <p><strong>Selected Samples:</strong></p>
          <p>${selectedSamples}</p>

          <hr style="border: none; border-top: 1px solid #d8cbbb; margin: 24px 0;" />

          <p><strong>Message:</strong></p>
          <p>${message || "-"}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "WEVINE <hello@wevinewallcoverings.com>",
      to: [email],
      subject:
        lang === "zh"
          ? "我們已收到您的 WEVINE 樣品申請"
          : "We have received your WEVINE sample request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #2d241c; line-height: 1.7;">
          <h2 style="font-weight: 400; letter-spacing: 0.08em;">
            WEVINE
          </h2>

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

          <p><strong>${lang === "zh" ? "已選樣品" : "Selected Samples"}:</strong></p>
          <p>${selectedSamples}</p>

          <br />

          <p>
            ${
              lang === "zh"
                ? "WEVINE 團隊"
                : "The WEVINE Team"
            }
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { error: "Failed to send request." },
      { status: 500 }
    );
  }
}