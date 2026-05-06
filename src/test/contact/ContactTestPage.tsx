import { useMemo, useState, type CSSProperties } from "react";

import backgroundImage from "../assets/contact_BG.svg";
import footerImage from "../assets/footer/footer.svg";
import topButtonImage from "../assets/footer/top_button.svg";
import submitButtonImage from "../assets/contact/문의하기.svg";
import TestLandingPage from "../shared/TestLandingPage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1559;
const CONTACT_FORM_ID = "kme-test-contact-form";

type Status = "idle" | "sending" | "sent" | "error";

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
  "--overlay-z-index"?: string;
};

function getBottomCenterOverlayStyle(bottom: number, width: number, zIndex: number): OverlayStyle {
  return {
    bottom: `${(bottom / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    "--overlay-z-index": `${zIndex}`,
  };
}

function getBottomLeftSizedStyle(left: number, bottom: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    bottom: `${(bottom / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
    "--overlay-translate-x": "0%",
  };
}

function getTopRightSizedStyle(right: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    right: `${(right / DESIGN_WIDTH) * 100}%`,
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
    "--overlay-translate-x": "0%",
  };
}

const formPanelStyle: OverlayStyle = {
  ...getTopRightSizedStyle(41, 544, 720, 734, 2),
  left: "auto",
};

const submitButtonStyle: OverlayStyle = {
  ...getTopRightSizedStyle(282, 1204, 239, 74, 3),
  zIndex: 8,
  "--overlay-z-index": "8",
  left: "auto",
};

const contactFields = ["이름", "연락처", "이메일", "회사/기관명", "관심 서비스"] as const;

function extractErrorMessage(raw: string, fallback = "전송 실패") {
  const text = (raw ?? "").trim();
  if (!text) return fallback;

  try {
    const parsed = JSON.parse(text) as { error?: string; message?: string; detail?: unknown };
    let message = parsed.error || parsed.message || fallback;

    if (parsed.detail) {
      const detail = typeof parsed.detail === "string" ? parsed.detail : JSON.stringify(parsed.detail);
      message += ` (${detail})`;
    }

    return message;
  } catch {
    return text;
  }
}

export default function ContactTestPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subject = useMemo(
    () => `K-me 문의 | ${serviceInterest || "일반 문의"}`,
    [serviceInterest],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    setShowSuccessModal(false);

    const composedMessage = [
      `[이름] ${name}`,
      `[연락처] ${phone}`,
      `[이메일] ${fromEmail}`,
      `[회사/기관명] ${company || "미입력"}`,
      `[관심 서비스] ${serviceInterest}`,
      "",
      "[문의 내용]",
      message,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          fromEmail,
          message: composedMessage,
        }),
      });

      const raw = await response.text();

      if (!response.ok) {
        throw new Error(extractErrorMessage(raw, `Request failed (${response.status})`));
      }

      setStatus("idle");
      setShowSuccessModal(true);
      setName("");
      setPhone("");
      setFromEmail("");
      setCompany("");
      setServiceInterest("");
      setMessage("");
    } catch (submissionError: unknown) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "문의 전송에 실패했습니다.");
    }
  }

  function closeSuccessModal() {
    setShowSuccessModal(false);
  }

  return (
    <TestLandingPage backgroundImage={backgroundImage} backgroundAlt="Contact test page background">
      <form className="kme-test-contact-form" id={CONTACT_FORM_ID} style={formPanelStyle} onSubmit={handleSubmit}>
        <label className="kme-test-contact-form__field">
          <span className="kme-test-contact-form__label">{contactFields[0]}</span>
          <input
            className="kme-test-contact-form__input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="예) 홍길동"
            required
          />
          <span className="kme-test-contact-form__line" aria-hidden="true" />
        </label>

        <label className="kme-test-contact-form__field">
          <span className="kme-test-contact-form__label">{contactFields[1]}</span>
          <input
            className="kme-test-contact-form__input"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="예) 010-1234-5678"
            required
          />
          <span className="kme-test-contact-form__line" aria-hidden="true" />
        </label>

        <label className="kme-test-contact-form__field">
          <span className="kme-test-contact-form__label">{contactFields[2]}</span>
          <input
            className="kme-test-contact-form__input"
            type="email"
            value={fromEmail}
            onChange={(event) => setFromEmail(event.target.value)}
            placeholder="예) name@company.com"
            required
          />
          <span className="kme-test-contact-form__line" aria-hidden="true" />
        </label>

        <label className="kme-test-contact-form__field">
          <span className="kme-test-contact-form__label">{contactFields[3]}</span>
          <input
            className="kme-test-contact-form__input"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="예) OO회사 / OO기관"
          />
          <span className="kme-test-contact-form__line" aria-hidden="true" />
        </label>

        <label className="kme-test-contact-form__field">
          <span className="kme-test-contact-form__label">{contactFields[4]}</span>
          <input
            className="kme-test-contact-form__input"
            value={serviceInterest}
            onChange={(event) => setServiceInterest(event.target.value)}
            placeholder="예) K-me Dance / K-me VisionAI"
            required
          />
          <span className="kme-test-contact-form__line" aria-hidden="true" />
        </label>

        <label className="kme-test-contact-form__message-group">
          <span className="kme-test-contact-form__label">문의내용</span>
          <textarea
            className="kme-test-contact-form__message-box"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="행사 목적, 희망 서비스, 일정, 규모 등을 자유롭게 남겨주세요."
            required
          />
        </label>

        <div className="kme-test-contact-form__status" aria-live="polite">
          {status === "error" && <span className="kme-test-contact-form__status-text is-error">⚠ {error || "전송 실패"}</span>}
        </div>
      </form>

      <button
        aria-label="문의하기"
        className="kme-test-page__overlay-item kme-test-page__overlay-item--slogan-hover kme-test-contact-form__submit"
        data-cursor="hover"
        disabled={status === "sending"}
        form={CONTACT_FORM_ID}
        style={submitButtonStyle}
        type="submit"
      >
        <img src={submitButtonImage} alt={status === "sending" ? "전송 중" : "문의하기"} />
      </button>

      {showSuccessModal && (
        <div className="kme-test-contact-modal" role="dialog" aria-modal="true" aria-labelledby="kme-test-contact-modal-title" onClick={closeSuccessModal}>
          <div className="kme-test-contact-modal__backdrop" />
          <div className="kme-test-contact-modal__panel" onClick={(event) => event.stopPropagation()}>
            <h2 id="kme-test-contact-modal-title" className="kme-test-contact-modal__title">
              문의가 접수되었습니다.
            </h2>
            <p className="kme-test-contact-modal__description">빠르게 확인 후 연락드릴게요.</p>
            <button className="kme-test-contact-modal__button" type="button" onClick={closeSuccessModal}>
              확인
            </button>
          </div>
        </div>
      )}

      <img
        className="kme-test-page__overlay-item"
        src={footerImage}
        alt=""
        aria-hidden="true"
        style={getBottomCenterOverlayStyle(0, 1440, 1)}
      />

      <button
        aria-label="Scroll to top"
        className="kme-test-page__top-button"
        style={getBottomLeftSizedStyle(1375, 45, 35, 35, 3)}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={topButtonImage} alt="" aria-hidden="true" />
      </button>
    </TestLandingPage>
  );
}
