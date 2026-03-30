import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const PRODUCT_OPTIONS = ["K-me Dance", "K-me VisionAI"] as const;

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

export default function StickyInquiryBar() {
  const [product, setProduct] = useState<(typeof PRODUCT_OPTIONS)[number]>("K-me VisionAI");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const subject = useMemo(() => `K-me 도입 관련 문의 | ${product}`, [product]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const message = [
      `[문의 유형] 기기 도입 관련 문의`,
      `[관심 서비스] ${product}`,
      `[이름] ${name}`,
      `[연락처] ${phone}`,
      `[이메일] ${fromEmail}`,
      "",
      "[문의 내용]",
      "하단 sticky CTA를 통해 도입 상담 신청이 접수되었습니다.",
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          fromEmail,
          message,
        }),
      });

      const raw = await res.text();

      if (!res.ok) {
        throw new Error(extractErrorMessage(raw, `Request failed (${res.status})`));
      }

      setStatus("sent");
      setMobileOpen(false);
      setName("");
      setPhone("");
      setFromEmail("");
    } catch (submissionError: unknown) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "문의 전송에 실패했습니다.");
    }
  }

  function renderFields(compact = false) {
    return (
      <>
        <label className={`stickyLeadField ${compact ? "isCompact" : ""}`}>
          <span>서비스</span>
          <select value={product} onChange={(e) => setProduct(e.target.value as (typeof PRODUCT_OPTIONS)[number])}>
            {PRODUCT_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={`stickyLeadField ${compact ? "isCompact" : ""}`}>
          <span>이름</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required />
        </label>

        <label className={`stickyLeadField ${compact ? "isCompact" : ""}`}>
          <span>연락처</span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" required />
        </label>

        <label className={`stickyLeadField ${compact ? "isCompact" : ""}`}>
          <span>이메일</span>
          <input type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} placeholder="name@company.com" required />
        </label>
      </>
    );
  }

  const statusMessage =
    status === "sent"
      ? "✅ 도입 상담 신청이 접수되었습니다. 빠르게 연락드릴게요."
      : status === "error"
        ? `⚠ ${error || "전송 실패"}`
        : "빠르게 도입 상담을 연결합니다.";

  return (
    <div className="stickyLead">
      <div className="stickyLeadDesktop">
        <div className="stickyLeadIntro">
          <span className="stickyLeadEyebrow">도입관련문의</span>
          <strong>빠른 도입 상담</strong>
          <p>{statusMessage}</p>
        </div>

        <form className="stickyLeadForm" onSubmit={handleSubmit}>
          {renderFields()}

          <button className="btn btnSm stickyLeadSubmit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "전송 중..." : "상담 신청"}
          </button>
        </form>
      </div>

      <div className="stickyLeadMobile">
        <button className="stickyLeadToggle" type="button" onClick={() => setMobileOpen(true)}>
          <span>도입관련문의</span>
          <strong>빠른 도입 상담</strong>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="stickyLeadSheetOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            >
              <motion.div
                className="stickyLeadSheet"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="stickyLeadSheetHead">
                  <div>
                    <span className="stickyLeadEyebrow">도입관련문의</span>
                    <strong>빠른 도입 상담</strong>
                    <p>{statusMessage}</p>
                  </div>

                  <button className="stickyLeadClose" type="button" onClick={() => setMobileOpen(false)} aria-label="닫기">
                    ×
                  </button>
                </div>

                <form className="stickyLeadSheetForm" onSubmit={handleSubmit}>
                  {renderFields(true)}

                  <button className="btn stickyLeadSubmit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "전송 중..." : "상담 신청"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
