import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const INQUIRY_CATEGORIES = ["콘텐츠 협업 문의", "광고 협업 문의", "기기 도입 관련 문의"] as const;
const SERVICE_INTERESTS = ["K-me Dance", "K-me VisionAI", "둘 다 논의하고 싶음"] as const;

function extractErrorMessage(raw: string, fallback = "전송 실패") {
  const text = (raw ?? "").trim();
  if (!text) return fallback;

  try {
    const parsed = JSON.parse(text);
    let msg = parsed?.error || parsed?.message || fallback;

    if (parsed?.detail) {
      const detail = typeof parsed.detail === "string" ? parsed.detail : JSON.stringify(parsed.detail);
      msg += ` (${detail})`;
    }

    return msg;
  } catch {
    return text;
  }
}

export default function ContactForm() {
  const [inquiryCategory, setInquiryCategory] = useState<(typeof INQUIRY_CATEGORIES)[number]>("기기 도입 관련 문의");
  const [serviceInterest, setServiceInterest] = useState<(typeof SERVICE_INTERESTS)[number]>("K-me VisionAI");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const subject = useMemo(
    () => `K-me 홈페이지 문의 | ${inquiryCategory} | ${serviceInterest}`,
    [inquiryCategory, serviceInterest]
  );

  const mailtoHref = useMemo(
    () => `mailto:k-me@ai-dam.ai?subject=${encodeURIComponent(subject)}`,
    [subject]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const composedMessage = [
      `[문의 카테고리] ${inquiryCategory}`,
      `[관심 서비스] ${serviceInterest}`,
      `[이름] ${name}`,
      `[연락처] ${phone}`,
      `[회사/기관] ${company || "미입력"}`,
      "",
      "[문의 내용]",
      message,
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          fromEmail,
          message: composedMessage,
        }),
      });

      const raw = await res.text();

      if (!res.ok) {
        throw new Error(extractErrorMessage(raw, `Request failed (${res.status})`));
      }

      setStatus("sent");
      setInquiryCategory("기기 도입 관련 문의");
      setServiceInterest("K-me VisionAI");
      setName("");
      setPhone("");
      setCompany("");
      setFromEmail("");
      setMessage("");
    } catch (submissionError: unknown) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "문의 전송에 실패했습니다.");
    }
  }

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <div className="fGrid">
        <label className="fLabel">
          <span>문의 카테고리</span>
          <select className="fInput" value={inquiryCategory} onChange={(e) => setInquiryCategory(e.target.value as (typeof INQUIRY_CATEGORIES)[number])}>
            {INQUIRY_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="fLabel">
          <span>관심 서비스</span>
          <select className="fInput" value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value as (typeof SERVICE_INTERESTS)[number])}>
            {SERVICE_INTERESTS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="fLabel">
          <span>이름</span>
          <input className="fInput" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required />
        </label>

        <label className="fLabel">
          <span>연락처</span>
          <input
            className="fInput"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            required
          />
        </label>

        <label className="fLabel">
          <span>회사 / 기관명</span>
          <input
            className="fInput"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="예) OO대학교 / OO브랜드"
          />
        </label>

        <label className="fLabel">
          <span>이메일</span>
          <input
            className="fInput"
            type="email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
        </label>

        <label className="fLabel fLabelFull">
          <span>문의 내용</span>
          <textarea
            className="fTextarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="공간, 목적, 일정 등을 간단히 적어주세요."
          />
        </label>
      </div>

      <div className="fRow contactSubmitRow">
        <div className="fActions">
          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "전송 중..." : "문의 접수하기"}
          </button>

          <a className="btn btnGhost" href={mailtoHref} data-cursor="hover">
            이메일로 직접 문의
          </a>
        </div>

        <div className="fHint" aria-live="polite">
          {status === "sent" && <span className="ok">✅ 문의가 접수되었습니다. 빠르게 연락드릴게요.</span>}
          {status === "error" && <span className="bad">⚠ {error || "전송 실패"}</span>}
        </div>
      </div>
    </form>
  );
}
