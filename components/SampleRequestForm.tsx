"use client";

import { useEffect, useState } from "react";

type SampleRequestFormProps = {
  lang: "en" | "zh";
};

export default function SampleRequestForm({ lang }: SampleRequestFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const samplesFromUrl = params.get("samples");

  if (samplesFromUrl) {
    setSelectedSamples(
      samplesFromUrl
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );

    return;
  }

  const savedSamples = localStorage.getItem("wevine-sample-cart");

  if (savedSamples) {
    try {
      setSelectedSamples(JSON.parse(savedSamples));
    } catch {
      setSelectedSamples([]);
    }
  }
}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        selectedSamples,
      }),
    });

    setLoading(false);

    if (response.ok) {
      formElement.reset();
      localStorage.removeItem("wevine-sample-cart");
      setSelectedSamples([]);
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center border border-[#d8cec0]/70 bg-[#fbf8f3]/55 px-8 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#8a7965]">
          {lang === "en" ? "Request Received" : "申請已送出"}
        </p>

        <h3 className="text-4xl font-light text-[#2d241c]">
          {lang === "en" ? "Thank You" : "謝謝您"}
        </h3>

        <p className="mt-5 max-w-sm text-base leading-7 text-[#6f6254]">
          {lang === "en"
            ? "We have received your sample request and will be in touch shortly."
            : "我們已收到您的樣品申請，將盡快與您聯繫。"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedSamples.length > 0 && (
        <div className="mb-8 border-b border-[#c7b8a5]/70 pb-6">
  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#8a7965]">
    {lang === "en"
      ? `Selected Samples (${selectedSamples.length})`
      : `已選樣品（${selectedSamples.length}）`}
  </p>

  <div className="flex flex-wrap gap-2">
    {selectedSamples.map((code) => (
      <button
        key={code}
        type="button"
        onClick={() => {
          const updatedSamples = selectedSamples.filter(
            (item) => item !== code
          );

          setSelectedSamples(updatedSamples);

          localStorage.setItem(
            "wevine-sample-cart",
            JSON.stringify(updatedSamples)
          );
        }}
        className="group inline-flex items-center gap-2 border border-[#bcae9b] px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#2d241c] transition hover:border-[#2d241c]"
      >
        <span>{code}</span>

        <span className="text-[11px] font-light opacity-45 transition group-hover:opacity-100">
          ×
        </span>
      </button>
    ))}
  </div>
</div>
      )}

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
        {loading
          ? lang === "en"
            ? "Sending..."
            : "送出中..."
          : lang === "en"
            ? "Request Samples"
            : "申請樣品"}
      </button>
    </form>
  );
}