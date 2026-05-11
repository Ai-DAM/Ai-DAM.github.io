import { useMemo, useState, type CSSProperties } from "react";

import backgroundImage from "../assets/contact/contact_BG.svg";
import footerImage from "../assets/footer/footer.svg";
import topButtonImage from "../assets/footer/top_button.svg";
import submitButtonImage from "../assets/contact/문의하기.svg";
import SitePage from "../shared/SitePage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1559;
const FOOTER_HEIGHT = 150;
const MIDDLE_DESIGN_HEIGHT = DESIGN_HEIGHT - FOOTER_HEIGHT;
const CONTACT_FORM_ID = "kme-test-contact-form";

type Status = "idle" | "sending" | "sent" | "error";

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
  "--overlay-z-index"?: string;
};

type SocialButton = {
  label: string;
  href: string;
  className: string;
  style: OverlayStyle;
  icon: React.ReactNode;
};

function getTopRightSizedStyle(right: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    right: `${(right / DESIGN_WIDTH) * 100}%`,
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
    "--overlay-translate-x": "0%",
  };
}

function getTopLeftSizedStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
    "--overlay-translate-x": "0%",
  };
}

function getFooterChildStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / 152) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

const formPanelStyle: OverlayStyle = {
  ...getTopRightSizedStyle(50, 564, 720, 611, 2),
  left: "auto",
};

const CONTACT_SOCIAL_TOP = 955;
const CONTACT_SOCIAL_LEFT = 290.18;
const CONTACT_SOCIAL_GAP = 15;
const CONTACT_SOCIAL_YOUTUBE_WIDTH = 40.0;
const CONTACT_SOCIAL_YOUTUBE_HEIGHT = 24.2;
const CONTACT_SOCIAL_YOUTUBE_TOP_OFFSET = 2;
const CONTACT_SOCIAL_ICON_SIZE = 28;

const contactFields = ["이름", "연락처", "이메일", "회사/기관명", "관심 서비스"] as const;

const socialButtons: SocialButton[] = [
  {
    label: "K-me Dance YouTube",
    href: "https://youtube.com/@k-me_dance?si=kpJROehZeop0BqQY",
    className: "kme-test-page__social-button--youtube",
    style: getTopLeftSizedStyle(CONTACT_SOCIAL_LEFT, CONTACT_SOCIAL_TOP + CONTACT_SOCIAL_YOUTUBE_TOP_OFFSET, CONTACT_SOCIAL_YOUTUBE_WIDTH, CONTACT_SOCIAL_YOUTUBE_HEIGHT, 3),
    icon: (
      <svg viewBox="0 0 25 16" aria-hidden="true">
        <rect x="1" y="1" width="23" height="14" rx="4.8" fill="currentColor" />
        <path d="M10.1 4.45L16.6 8L10.1 11.55V4.45Z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    label: "K-me Dance Instagram",
    href: "https://www.instagram.com/kme.dance?igsh=MW85ZnJsYTVrOWxjcg%3D%3D&utm_source=qr",
    className: "kme-test-page__social-button--instagram",
    style: getTopLeftSizedStyle(CONTACT_SOCIAL_LEFT + CONTACT_SOCIAL_YOUTUBE_WIDTH + CONTACT_SOCIAL_GAP, CONTACT_SOCIAL_TOP, CONTACT_SOCIAL_ICON_SIZE, CONTACT_SOCIAL_ICON_SIZE, 3),
    icon: (
      <svg viewBox="0 0 17 17" aria-hidden="true">
        <rect x="1.15" y="1.15" width="14.7" height="14.7" rx="4.5" fill="currentColor" />
        <circle cx="8.5" cy="8.5" r="3.15" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        <circle cx="12.55" cy="4.45" r="1.05" fill="#ffffff" />
      </svg>
    ),
  },
  {
    label: "K-me Dance Blog",
    href: "https://blog.naver.com/k-me_official_kr",
    className: "kme-test-page__social-button--blog",
    style: getTopLeftSizedStyle(CONTACT_SOCIAL_LEFT + CONTACT_SOCIAL_YOUTUBE_WIDTH + CONTACT_SOCIAL_GAP + CONTACT_SOCIAL_ICON_SIZE + CONTACT_SOCIAL_GAP, CONTACT_SOCIAL_TOP, CONTACT_SOCIAL_ICON_SIZE, CONTACT_SOCIAL_ICON_SIZE, 3),
    icon: (
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <rect x="1.15" y="1.15" width="15.7" height="15.7" rx="4.35" fill="currentColor" />
        <path d="M5.2 5.65H12.8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.2 8.95H12.8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.2 12.25H10.35" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subject = useMemo(() => `K-me 문의 | ${serviceInterest || "일반 문의"}`, [serviceInterest]);

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

  const shellStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    background: "#ffffff",
  };
  const middleSectionStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    flex: "0 0 auto",
    background: "#ffffff",
  };
  const canvasStageStyle: CSSProperties = {
    "--canvas-design-width": `${DESIGN_WIDTH}`,
    "--canvas-design-height": `${MIDDLE_DESIGN_HEIGHT}`,
    "--canvas-max-width": "1920",
    background: "#ffffff",
    overflow: "hidden",
  } as CSSProperties;
  const middleBackgroundStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: `${(DESIGN_HEIGHT / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    maxWidth: "none",
    objectFit: "fill",
  };
  const fullBleedSectionStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    flex: "0 0 auto",
    background: "#ffffff",
    overflow: "hidden",
  };
  const fullBleedImageStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "auto",
  };

  return (
    <SitePage
      customMedia={
        <>
          <div className="kme-test-page__canvas-shell" style={shellStyle}>
            <div style={middleSectionStyle}>
              <div className="kme-test-page__canvas-stage" style={canvasStageStyle}>
                <div className="kme-test-page__canvas-body">
                  <img className="kme-test-page__canvas-background" src={backgroundImage} alt="Contact test page background" style={middleBackgroundStyle} />

                  <div className="kme-test-page__canvas-overlay">
                    <div className="kme-test-contact-panel" style={formPanelStyle}>
                      <form className="kme-test-contact-form" id={CONTACT_FORM_ID} onSubmit={handleSubmit}>
                        <label className="kme-test-contact-form__field">
                          <span className="kme-test-contact-form__label">{contactFields[0]}</span>
                          <input className="kme-test-contact-form__input" value={name} onChange={(event) => setName(event.target.value)} placeholder="예) 케임희" required />
                          <span className="kme-test-contact-form__line" aria-hidden="true" />
                        </label>

                        <label className="kme-test-contact-form__field">
                          <span className="kme-test-contact-form__label">{contactFields[1]}</span>
                          <input className="kme-test-contact-form__input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="예) 010-1234-5678" required />
                          <span className="kme-test-contact-form__line" aria-hidden="true" />
                        </label>

                        <label className="kme-test-contact-form__field">
                          <span className="kme-test-contact-form__label">{contactFields[2]}</span>
                          <input className="kme-test-contact-form__input" type="email" value={fromEmail} onChange={(event) => setFromEmail(event.target.value)} placeholder="예) name@company.com" required />
                          <span className="kme-test-contact-form__line" aria-hidden="true" />
                        </label>

                        <label className="kme-test-contact-form__field">
                          <span className="kme-test-contact-form__label">{contactFields[3]}</span>
                          <input className="kme-test-contact-form__input" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="예) OO회사 / OO기관" />
                          <span className="kme-test-contact-form__line" aria-hidden="true" />
                        </label>

                        <label className="kme-test-contact-form__field">
                          <span className="kme-test-contact-form__label">{contactFields[4]}</span>
                          <input className="kme-test-contact-form__input" value={serviceInterest} onChange={(event) => setServiceInterest(event.target.value)} placeholder="예) K-me Dance / K-me VisionAI" required />
                          <span className="kme-test-contact-form__line" aria-hidden="true" />
                        </label>

                        <label className="kme-test-contact-form__message-group">
                          <span className="kme-test-contact-form__label">문의내용</span>
                          <textarea className="kme-test-contact-form__message-box" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="행사 목적, 희망 서비스, 일정, 규모 등을 자유롭게 남겨주세요." required />
                        </label>

                        <div className="kme-test-contact-form__status" aria-live="polite">
                          {status === "error" && <span className="kme-test-contact-form__status-text is-error">⚠ {error || "전송 실패"}</span>}
                        </div>
                      </form>

                      <button aria-label="문의하기" className="kme-test-page__overlay-item kme-test-page__overlay-item--slogan-hover kme-test-contact-form__submit" data-cursor="hover" disabled={status === "sending"} form={CONTACT_FORM_ID} type="submit">
                        <img src={submitButtonImage} alt={status === "sending" ? "전송 중" : "문의하기"} />
                      </button>
                    </div>

                    {socialButtons.map((button) => (
                      <a key={button.label} aria-label={button.label} className={["kme-test-page__social-button", button.className].join(" ")} href={button.href} rel="noreferrer" style={button.style} target="_blank">
                        {button.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={fullBleedSectionStyle}>
              <img src={footerImage} alt="" aria-hidden="true" style={fullBleedImageStyle} />
              <button aria-label="Scroll to top" className="kme-test-page__top-button" style={getFooterChildStyle(1375, 72, 35, 35, 3)} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img src={topButtonImage} alt="" aria-hidden="true" />
              </button>
            </div>
          </div>

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
        </>
      }
    />
  );
}
