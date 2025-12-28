import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

function extractErrorMessage(raw: string, fallback = "전송 실패") {
  const text = (raw ?? "").trim();
  if (!text) return fallback;

  try {
    const j = JSON.parse(text);
    let msg = j?.error || j?.message || fallback;

    if (j?.detail) {
      const d = typeof j.detail === "string" ? j.detail : JSON.stringify(j.detail);
      msg += ` (${d})`;
    }
    return msg;
  } catch {
    return text;
  }
}

export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState<string>("");

  const mailtoHref = "mailto:k-me@ai-dam.ai?subject=ADAM%20Demo%20Request";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, fromEmail, message }),
      });

      const raw = await res.text();

      if (!res.ok) {
        const msg = extractErrorMessage(raw, `Request failed (${res.status})`);
        throw new Error(msg);
      }

      setStatus("sent");
      setSubject("");
      setFromEmail("");
      setMessage("");
    } catch (e: unknown) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Failed to send");
    }
  }

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <label className="fLabel">
        <span>제목</span>
        <input
          className="fInput"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="예) K-Me 데모/설치 문의"
        />
      </label>

      <label className="fLabel">
        <span>보내는 사람 이메일</span>
        <input
          className="fInput"
          type="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          required
          placeholder="name@company.com"
        />
      </label>

      <label className="fLabel">
        <span>내용</span>
        <textarea
          className="fTextarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="문의 내용을 적어주세요."
        />
      </label>

      <div className="fRow">
        {/* ✅ 버튼들은 한 줄 */}
        <div className="fActions">
          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "전송 중..." : "문의 전송"}
          </button>

          <a className="btn btnGhost" href={mailtoHref} data-cursor="hover">
            E-mail
          </a>
        </div>

        <div className="fHint">
          {status === "sent" && <span className="ok">✅ 전송 완료</span>}
          {status === "error" && <span className="bad">⚠ {err || "전송 실패"}</span>}
        </div>
      </div>
    </form>
  );
}
