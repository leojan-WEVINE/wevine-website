import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, country, projectType, message } =
      await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "WEVINE Website <hello@wevinewallcoverings.com>",
      to: process.env.CONTACT_TO || "hello@wevinewallcoverings.com",
      replyTo: email,
      subject: `New Sample Request — ${name}`,
      html: `
        <h2>New Sample Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Country:</strong> ${country || "-"}</p>
        <p><strong>Project Type:</strong> ${projectType || "-"}</p>
        <hr />
        <p>${message || "-"}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}