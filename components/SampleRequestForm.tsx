"use client";

import { useState } from "react";

export default function SampleRequestForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const formElement = e.currentTarget;
  const form = new FormData(formElement);

  setLoading(true);

  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      country: form.get("country"),
      projectType: form.get("projectType"),
      message: form.get("message"),
    }),
  });

  setLoading(false);

  if (response.ok) {
    formElement.reset();
    setSuccess(true);
  }
};

  if (success) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center border border-[#d8cec0]/70 bg-[#fbf8f3]/55 px-8 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#8a7965]">
        Request Received
      </p>

      <h3 className="text-4xl font-light text-[#2d241c]">
        Thank You
      </h3>

      <p className="mt-5 max-w-sm text-base leading-7 text-[#6f6254]">
        We have received your sample request and will be in touch shortly.
      </p>
    </div>
  );
}

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2">
      <input
        name="name"
        placeholder="Name *"
        required
        className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
      />

      <input
        name="email"
        type="email"
        placeholder="Email *"
        required
        className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <input
        name="company"
        placeholder="Company"
        className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
      />

      <input
        name="country"
        placeholder="Country"
        className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
      />
    </div>

    <select
      name="projectType"
      className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#6f6254] outline-none transition focus:border-[#2d241c]"
      defaultValue=""
    >
      <option value="" disabled>
        Project Type
      </option>
      <option>Residential</option>
      <option>Hospitality</option>
      <option>Commercial</option>
      <option>Retail</option>
      <option>Other</option>
    </select>

    <textarea
      name="message"
      placeholder="Tell us about your project *"
      required
      rows={5}
      className="w-full resize-none border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 py-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
    />

    <button
      type="submit"
      disabled={loading}
      className="mt-2 inline-flex h-14 w-full items-center justify-center bg-[#2d241c] text-xs uppercase tracking-[0.24em] text-[#f6f2ec] transition hover:bg-[#6b5744] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Sending..." : "Request Samples"}
    </button>
  </form>
);
}