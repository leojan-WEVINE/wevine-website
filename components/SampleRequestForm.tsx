"use client";

import { useEffect, useState } from "react";

type SampleRequestFormProps = {
  lang: "en" | "zh";
  mode?: "sample" | "project";
};

export default function SampleRequestForm({
  lang,
  mode = "sample",
}: SampleRequestFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  useEffect(() => {
  if (mode !== "sample") {
    setSelectedSamples([]);
    return;
  }

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
}, [mode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    setLoading(true);

    const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    formType: mode,
    name: form.get("name"),
    email: form.get("email"),
    company: form.get("company"),
    country: form.get("country"),
    projectType: form.get("projectType"),
    message: form.get("message"),
    samples: selectedSamples,
    lang,
  }),
});

    setLoading(false);

if (!response.ok) {
  alert(
    lang === "en"
      ? "Something went wrong. Please try again."
      : "送出時發生錯誤，請稍後再試。"
  );
  return;
}

formElement.reset();

if (mode === "sample") {
  localStorage.removeItem("wevine-sample-cart");
  setSelectedSamples([]);
  window.dispatchEvent(new Event("sample-cart-updated"));
}

setSuccess(true);
  };

  if (success) {
  const isProject = mode === "project";

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center border border-[#d8cec0]/70 bg-[#fbf8f3]/55 px-8 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#8a7965]">
        {isProject
          ? lang === "en"
            ? "Inquiry Received"
            : "洽詢已送出"
          : lang === "en"
            ? "Request Received"
            : "申請已送出"}
      </p>

      <h3 className="text-4xl font-light text-[#2d241c]">
        {lang === "en" ? "Thank You" : "謝謝您"}
      </h3>

      <p className="mt-5 max-w-sm text-base leading-7 text-[#6f6254]">
        {isProject
          ? lang === "en"
            ? "We have received your project inquiry and will be in touch shortly."
            : "我們已收到您的專案洽詢，將盡快與您聯繫。"
          : lang === "en"
            ? "We have received your sample request and will be in touch shortly."
            : "我們已收到您的樣品申請，將盡快與您聯繫。"}
      </p>
    </div>
  );
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "sample" && selectedSamples.length > 0 && (
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
          const updatedSamples = selectedSamples.filter((item) => item !== code);

setSelectedSamples(updatedSamples);

localStorage.setItem(
  "wevine-sample-cart",
  JSON.stringify(updatedSamples)
);

window.dispatchEvent(new Event("sample-cart-updated"));
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
    autoComplete="name"
    placeholder={lang === "en" ? "Name *" : "姓名 *"}
    required
    className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
  />

  <input
    name="email"
    type="email"
    autoComplete="email"
    placeholder={lang === "en" ? "Email *" : "電子郵件 *"}
    required
    className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
  />
</div>

<div className="grid gap-4 md:grid-cols-2">
  <input
    name="company"
    autoComplete="organization"
    placeholder={lang === "en" ? "Company" : "公司名稱"}
    className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
  />

  <input
    name="country"
    autoComplete="country-name"
    placeholder={lang === "en" ? "Country / Region" : "國家／地區"}
    className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#2d241c] outline-none transition placeholder:text-[#9a8b78] focus:border-[#2d241c]"
  />
</div>

<select
  name="projectType"
  className="h-13 w-full border border-[#d8cec0]/80 bg-[#fbf8f3] px-4 text-sm text-[#6f6254] outline-none transition focus:border-[#2d241c]"
  defaultValue=""
>
  <option value="" disabled>
    {lang === "en" ? "Project Type" : "專案類型"}
  </option>

  <option value="Residential">
    {lang === "en" ? "Residential" : "住宅空間"}
  </option>

  <option value="Hospitality">
    {lang === "en" ? "Hospitality" : "旅宿空間"}
  </option>

  <option value="Commercial">
    {lang === "en" ? "Commercial" : "商業空間"}
  </option>

  <option value="Retail">
    {lang === "en" ? "Retail" : "零售空間"}
  </option>

  <option value="Other">
    {lang === "en" ? "Other" : "其他"}
  </option>
</select>

<textarea
  name="message"
  placeholder={
    mode === "project"
      ? lang === "en"
        ? "Tell us about your project *"
        : "請告訴我們您的專案需求 *"
      : lang === "en"
        ? "Tell us about your project and sample requirements *"
        : "請簡述您的專案與樣品需求 *"
  }
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
  : mode === "project"
    ? lang === "en"
      ? "Submit Inquiry"
      : "送出專案洽詢"
    : lang === "en"
      ? "Request Samples"
      : "申請樣品"}
      </button>
    </form>
  );
}