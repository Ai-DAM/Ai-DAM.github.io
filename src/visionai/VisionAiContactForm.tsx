import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

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

export default function VisionAiContactForm() {
  const [subject, setSubject] = useState("K-me Vision AI 행사 문의");
  const [inquiryType, setInquiryType] = useState("참여형 콘텐츠 문의");
  const [eventDate, setEventDate] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const mailtoHref = useMemo(
    () =>
      `mailto:k-me@ai-dam.ai?subject=${encodeURIComponent(subject || "K-me Vision AI 문의")}`,
    [subject]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const composedMessage = [
      `[문의 유형] ${inquiryType}`,
      `[행사 일정] ${eventDate || "미입력"}`,
      `[이름] ${name}`,
      `[회사/기관] ${company || "미입력"}`,
      `[연락처] ${phone || "미입력"}`,
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
      setInquiryType("참여형 콘텐츠 문의");
      setEventDate("");
      setName("");
      setCompany("");
      setPhone("");
      setFromEmail("");
      setMessage("");
    } catch (e: unknown) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "문의 전송에 실패했습니다.");
    }
  }

  return (
    <form className="visionai-form" onSubmit={handleSubmit}>
      <div className="visionai-form-grid">
        <label>
          <span>문의 유형</span>
          <select value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
            <option>참여형 콘텐츠 문의</option>
            <option>비참여형 콘텐츠 문의</option>
            <option>맞춤 제작 문의</option>
            <option>설치 가능 일정 문의</option>
          </select>
        </label>

        <label>
          <span>행사 예정일</span>
          <input
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            placeholder="예) 2026-05-20"
          />
        </label>

        <label>
          <span>문의 제목</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="예) 대학 축제 참여형 부스 견적 문의"
            required
            minLength={2}
            maxLength={120}
          />
        </label>

        <label>
          <span>담당자명</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            required
          />
        </label>

        <label>
          <span>회사/기관명</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="예) OO대학교 / OO기업"
          />
        </label>

        <label>
          <span>연락처</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
          />
        </label>

        <label className="visionai-form-full">
          <span>이메일</span>
          <input
            type="email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
        </label>

        <label className="visionai-form-full">
          <span>문의 내용</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="행사 일정, 지역, 참여형/비참여형 여부, 예상 운영 시간 등을 남겨주시면 더 빠르게 견적 안내가 가능합니다."
            required
            minLength={5}
            maxLength={6000}
          />
        </label>
      </div>

      <div className="visionai-form-actions">
        <button className="visionai-btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "전송 중..." : "문의 전송하기"}
        </button>
        <a className="visionai-btn visionai-btn-outline" href={mailtoHref}>
          이메일로 직접 문의
        </a>

        <div className="visionai-form-hint" aria-live="polite">
          {status === "sent" && <span className="ok">✅ 문의가 접수되었습니다. 빠르게 연락드릴게요.</span>}
          {status === "error" && <span className="bad">⚠ {error || "전송 실패"}</span>}
        </div>
      </div>
    </form>
  );
}
