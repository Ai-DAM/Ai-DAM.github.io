import type { CSSProperties, ReactNode } from "react";

import backgroundImage from "../assets/company_introduction/company_Introduction_BG.svg";
import blockOneImage from "../assets/company_introduction/1.svg";
import blockOneSideImage from "../assets/company_introduction/1_img.svg";
import blockTwoImage from "../assets/company_introduction/2.svg";
import blockTwoSideImage from "../assets/company_introduction/2_img.svg";
import blockThreeImage from "../assets/company_introduction/3.svg";
import blockThreeSideImage from "../assets/company_introduction/3_img.svg";
import bgCenterImage from "../assets/company_introduction/bg_center.svg";
import footerImage from "../assets/company_introduction/footer.svg";
import footerTextImage from "../assets/company_introduction/footer_text.svg";
import neonImage from "../assets/company_introduction/neon.svg";
import sloganImage from "../assets/company_introduction/slogan.svg";
import topButtonImage from "../assets/company_introduction/top_button.svg";
import SitePage from "../shared/SitePage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 3497;
const FOOTER_HEIGHT = 557;
const MIDDLE_DESIGN_HEIGHT = DESIGN_HEIGHT - FOOTER_HEIGHT;

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
};

type CanvasStageStyle = CSSProperties & {
  "--canvas-design-width": string;
  "--canvas-design-height": string;
  "--canvas-max-width": string;
};

function getOverlayStyle(top: number, width: number, zIndex: number): OverlayStyle {
  return {
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    zIndex,
  };
}

function getFooterChildStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / 557) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

function getTopLeftSizedStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

type OverlayItem = {
  src: string;
  alt: string;
  ariaHidden?: true;
  className?: string;
  style: CSSProperties;
};

type SocialButton = {
  label: string;
  href: string;
  className: string;
  style: CSSProperties;
  icon: ReactNode;
};

const overlayItems: OverlayItem[] = [
  {
    src: bgCenterImage,
    alt: "",
    ariaHidden: true,
    style: getOverlayStyle(780, 1440, 0),
  },
  {
    src: neonImage,
    alt: "",
    ariaHidden: true,
    className: "kme-test-page__overlay-item--neon kme-test-page__overlay-item--neon-hoverable",
    style: getOverlayStyle(1090, 1364, 1),
  },
  {
    src: sloganImage,
    alt: "Company introduction slogan",
    className: "kme-test-page__overlay-item--slogan-hover",
    style: getOverlayStyle(995, 470, 2),
  },
  {
    src: blockOneImage,
    alt: "Company introduction section 1",
    className: "kme-test-page__overlay-item--soft-neon",
    style: getTopLeftSizedStyle(295, 1639, 360, 195, 2),
  },
  {
    src: blockOneSideImage,
    alt: "Company introduction section 1 visual",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(825, 1596, 320, 300, 2),
  },
  {
    src: blockTwoImage,
    alt: "Company introduction section 2",
    className: "kme-test-page__overlay-item--soft-neon",
    style: getTopLeftSizedStyle(761, 2096, 395, 196, 2),
  },
  {
    src: blockTwoSideImage,
    alt: "Company introduction section 2 visual",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(285, 1996, 286, 300, 2),
  },
  {
    src: blockThreeImage,
    alt: "Company introduction section 3",
    className: "kme-test-page__overlay-item--soft-neon",
    style: getTopLeftSizedStyle(294, 2471, 374, 196, 2),
  },
  {
    src: blockThreeSideImage,
    alt: "Company introduction section 3 visual",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(905, 2396, 219, 298, 2),
  },
] as const;

const socialButtons: SocialButton[] = [
  {
    label: "K-me Dance YouTube",
    href: "https://youtube.com/@k-me_dance?si=kpJROehZeop0BqQY",
    className: "kme-test-page__social-button--youtube",
    style: getFooterChildStyle(996, 359, 24, 16, 3),
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
    style: getFooterChildStyle(1032, 357, 18, 18, 3),
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
    style: getFooterChildStyle(1066, 357, 18, 18, 3),
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

const footerTextStyle = getFooterChildStyle(542, 149, 597, 231, 2);
const canvasStageStyle: CanvasStageStyle = {
  "--canvas-design-width": `${DESIGN_WIDTH}`,
  "--canvas-design-height": `${MIDDLE_DESIGN_HEIGHT}`,
  "--canvas-max-width": "1920",
};
const shellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  width: "100%",
  background: "#000000",
};
const middleSectionStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  flex: "0 0 auto",
  background: "#000000",
};
const fullBleedSectionStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  flex: "0 0 auto",
};
const fullBleedImageStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
};
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

export default function CompanyIntroductionPage() {
  return (
    <SitePage
      customMedia={
        <div className="kme-test-page__canvas-shell" style={shellStyle}>
          <div style={middleSectionStyle}>
            <div className="kme-test-page__canvas-stage" style={canvasStageStyle}>
              <div className="kme-test-page__canvas-body">
                <img className="kme-test-page__canvas-background" src={backgroundImage} alt="Company introduction test page background" style={middleBackgroundStyle} />

                <div className="kme-test-page__canvas-overlay">
                  {overlayItems.map((item) => (
                    <img
                      key={`${item.src}-${item.alt || "decorative"}`}
                      className={["kme-test-page__overlay-item", item.className].filter(Boolean).join(" ")}
                      src={item.src}
                      alt={item.alt}
                      aria-hidden={item.ariaHidden}
                      style={item.style}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...fullBleedSectionStyle, overflow: "hidden" }}>
            <img
              src={footerImage}
              alt=""
              aria-hidden="true"
              style={fullBleedImageStyle}
            />

            <img
              className="kme-test-page__overlay-item"
              src={footerTextImage}
              alt="Footer text"
              style={footerTextStyle}
            />

            {socialButtons.map((button) => (
              <a
                key={button.label}
                aria-label={button.label}
                className={["kme-test-page__social-button", button.className].join(" ")}
                href={button.href}
                rel="noreferrer"
                style={button.style}
                target="_blank"
              >
                {button.icon}
              </a>
            ))}

            <button
              aria-label="Scroll to top"
              className="kme-test-page__top-button"
              style={getFooterChildStyle(1375, 475, 35, 35, 3)}
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src={topButtonImage} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      }
    />
  );
}
