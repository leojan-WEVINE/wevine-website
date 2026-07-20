import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  formType?: "sample" | "project";
  name?: string;
  company?: string;
  email?: string;
  country?: string;
  projectType?: string;
  message?: string;
  samples?: string[];
  lang?: "en" | "zh";
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
      formType = "sample",
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

    const isProject = formType === "project";

    const safeName = escapeHtml(name.trim() || "-");
    const safeCompany = escapeHtml(company.trim() || "-");
    const safeEmail = escapeHtml(email.trim());
    const safeCountry = escapeHtml(country.trim() || "-");
    const safeProjectType = escapeHtml(projectType.trim() || "-");
    const safeMessage = escapeHtml(message.trim() || "-").replaceAll(
      "\n",
      "<br>"
    );

    const validSamples = Array.isArray(samples)
      ? samples.filter((item): item is string => typeof item === "string")
      : [];

    const selectedSamples =
      validSamples.length > 0
        ? validSamples.map((item) => escapeHtml(item)).join(", ")
        : "No samples selected";

    const senderName = name.replace(/[\r\n]/g, " ").trim();
    const requestTitle = isProject
      ? "WEVINE Project Inquiry"
      : "WEVINE Sample Request";

    // 寄給 WEVINE
    await resend.emails.send({
      from: "WEVINE Website <hello@wevinewallcoverings.com>",
      to: [contactTo],
      replyTo: email,
      subject: `${requestTitle}${senderName ? ` from ${senderName}` : ""}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#2d241c;line-height:1.7">
          <h2>${requestTitle}</h2>

          <hr>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Country:</strong> ${safeCountry}</p>
          <p><strong>Project Type:</strong> ${safeProjectType}</p>

          ${
            isProject
              ? ""
              : `
                <hr>

                <p><strong>Selected Samples</strong></p>
                <p>${selectedSamples}</p>
              `
          }

          <hr>

          <p><strong>Message</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    const confirmationSubject = isProject
      ? lang === "zh"
        ? "我們已收到您的 WEVINE 專案洽詢"
        : "We have received your WEVINE project inquiry"
      : lang === "zh"
        ? "我們已收到您的 WEVINE 樣品申請"
        : "We have received your WEVINE sample request";

    const confirmationMessage = isProject
      ? lang === "zh"
        ? "感謝您與 WEVINE 聯繫。我們已收到您的專案洽詢，將審閱相關資訊並盡快與您聯繫。"
        : "Thank you for contacting WEVINE. We have received your project inquiry and will review the details and contact you shortly."
      : lang === "zh"
        ? "感謝您對 WEVINE 的關注。我們已收到您的樣品申請，將盡快與您聯繫。"
        : "Thank you for your interest in WEVINE. We have received your sample request and will contact you shortly.";

    // 自動回覆客戶
    await resend.emails.send({
      from: "WEVINE <hello@wevinewallcoverings.com>",
      to: [email],
      subject: confirmationSubject,
      html: `
        <div style="font-family:Arial,sans-serif;color:#2d241c;line-height:1.7">
          <h2>WEVINE</h2>

          <p>
            ${
              lang === "zh"
                ? `您好${name.trim() ? `，${safeName}` : ""}：`
                : `Dear ${name.trim() ? safeName : "there"},`
            }
          </p>

          <p>${confirmationMessage}</p>

          ${
            isProject
              ? ""
              : `
                <p>
                  <strong>
                    ${lang === "zh" ? "已選樣品" : "Selected Samples"}
                  </strong>
                </p>

                <p>${selectedSamples}</p>
              `
          }

          <br>

          <p>${lang === "zh" ? "WEVINE 團隊" : "The WEVINE Team"}</p>
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