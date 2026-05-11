import { useState, type CSSProperties } from "react";

import backgroundImage from "../assets/experience/experience_BG.png";
import hankyungNewsImage from "../assets/experience/news/한경기사 1.svg";
import haedongNewsImage from "../assets/experience/news/해동우승 1.webp";
import asdfImage from "../assets/experience/k-me vision ai/asdf.png";
import footerImage from "../assets/footer/footer.svg";
import houseTrainImage from "../assets/experience/k-me vision ai/housetrain.png";
import leftArrowImage from "../assets/experience/k-me vision ai/L.svg";
import oneMinuteImage from "../assets/experience/k-me vision ai/1m.png";
import redImage from "../assets/experience/k-me vision ai/red.png";
import rightArrowImage from "../assets/experience/k-me vision ai/R.svg";
import ceraViImage from "../assets/experience/k-me dance/세라비연습실건대.webp";
import nuvoNonhyeonImage from "../assets/experience/k-me dance/누보연습실논현.webp";
import nuvoHongdaeImage from "../assets/experience/k-me dance/누보연습실홍대.webp";
import topButtonImage from "../assets/footer/top_button.svg";
import SitePage from "../shared/SitePage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 2576;
const FOOTER_HEIGHT = 150;
const MIDDLE_DESIGN_HEIGHT = DESIGN_HEIGHT - FOOTER_HEIGHT;

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
};

type CanvasStageStyle = CSSProperties & {
  "--canvas-design-width": string;
  "--canvas-design-height": string;
  "--canvas-max-width": string;
};

type ExperienceCard = {
  src: string;
  alt: string;
  href: string;
  imageStyle: OverlayStyle;
};

type NewsCard = {
  src: string;
  alt: string;
  href: string;
  imageStyle: OverlayStyle;
  source: string;
  title: string[];
};

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

function getTopRightSizedStyle(right: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    right: `${(right / DESIGN_WIDTH) * 100}%`,
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    left: "auto",
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

const cards: ExperienceCard[] = [
  {
    src: ceraViImage,
    alt: "세라비연습실 건대",
    href: "https://www.spacecloud.kr/space/26026",
    imageStyle: getTopLeftSizedStyle(75, 500, 410, 310, 2),
  },
  {
    src: nuvoHongdaeImage,
    alt: "누보연습실 홍대",
    href: "https://www.spacecloud.kr/space/32327",
    imageStyle: getTopLeftSizedStyle(515, 500, 410, 310, 2),
  },
  {
    src: nuvoNonhyeonImage,
    alt: "누보연습실 논현",
    href: "https://www.spacecloud.kr/space/52091",
    imageStyle: getTopLeftSizedStyle(955, 500, 410, 310, 2),
  },
];

const newsCards: NewsCard[] = [
  {
    src: hankyungNewsImage,
    alt: "한경 기사 K-me",
    href: "https://magazine.hankyung.com/job-joy/article/202603152387d",
    imageStyle: getTopLeftSizedStyle(41, 1680, 410, 310, 2),
    source: "한경JOB&JOY",
    title: ["AI 스마트미러 기반", "댄스 플랫폼 ‘K-me’ 개발"],
  },
  {
    src: haedongNewsImage,
    alt: "해동창업경진대회 수상 기사",
    href: "https://www.pointdaily.co.kr/news/articleView.html?idxno=227597",
    imageStyle: getTopLeftSizedStyle(481, 1680, 410, 310, 2),
    source: "포인트데일리",
    title: ["2024 ERICA", "해동창업경진대회 대상 수상"],
  },
] as const;

const EXPERIENCE_VISIONAI_CARD_WIDTH = 410;
const EXPERIENCE_VISIONAI_CARD_HEIGHT = 310;
const EXPERIENCE_VISIONAI_ROW_LEFT = 75;
const EXPERIENCE_VISIONAI_ROW_TOP = 950;
const EXPERIENCE_VISIONAI_GAP = 30;
const EXPERIENCE_VISIONAI_VIEWPORT_WIDTH = EXPERIENCE_VISIONAI_CARD_WIDTH * 3 + EXPERIENCE_VISIONAI_GAP * 2;
const EXPERIENCE_VISIONAI_TRACK_SHIFT = EXPERIENCE_VISIONAI_CARD_WIDTH + EXPERIENCE_VISIONAI_GAP;
const EXPERIENCE_VISIONAI_TRACK_WIDTH = EXPERIENCE_VISIONAI_CARD_WIDTH * 4 + EXPERIENCE_VISIONAI_GAP * 3;
const topButtonStyle = getFooterChildStyle(1375, 72, 35, 35, 3);
const canvasStageStyle: CanvasStageStyle = {
  "--canvas-design-width": `${DESIGN_WIDTH}`,
  "--canvas-design-height": `${MIDDLE_DESIGN_HEIGHT}`,
  "--canvas-max-width": "1920",
};
const whiteCanvasStyle: CSSProperties = {
  background: "#ffffff",
};
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

const visionAiImages = [
  { src: oneMinuteImage, alt: "Experience VisionAI image 1m" },
  { src: asdfImage, alt: "Experience VisionAI image asdf" },
  { src: houseTrainImage, alt: "Experience VisionAI image housetrain" },
  { src: redImage, alt: "Experience VisionAI image red" },
] as const;

export default function ExperiencePage() {
  const [visionAiShifted, setVisionAiShifted] = useState(false);

  return (
    <SitePage
      customMedia={
        <div className="kme-test-page__canvas-shell" style={shellStyle}>
          <div style={middleSectionStyle}>
            <div className="kme-test-page__canvas-stage" style={{ ...canvasStageStyle, ...whiteCanvasStyle, overflow: "hidden" }}>
              <div className="kme-test-page__canvas-body" style={whiteCanvasStyle}>
                <img className="kme-test-page__canvas-background" src={backgroundImage} alt="Experience test page background" style={middleBackgroundStyle} />

                <div className="kme-test-page__canvas-overlay">
                  {cards.map((card) => (
                    <a key={card.href} aria-label={card.alt} className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" href={card.href} rel="noreferrer" style={card.imageStyle} target="_blank">
                      <img src={card.src} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                    </a>
                  ))}

                  <div
                    className="kme-test-page__overlay-item"
                    aria-hidden="true"
                    style={{
                      ...getTopLeftSizedStyle(EXPERIENCE_VISIONAI_ROW_LEFT, EXPERIENCE_VISIONAI_ROW_TOP, EXPERIENCE_VISIONAI_VIEWPORT_WIDTH, EXPERIENCE_VISIONAI_CARD_HEIGHT, 2),
                      overflow: "hidden",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="kme-test-page__experience-slider-track"
                      style={{
                        width: `${((EXPERIENCE_VISIONAI_CARD_WIDTH * visionAiImages.length + EXPERIENCE_VISIONAI_GAP * (visionAiImages.length - 1)) / EXPERIENCE_VISIONAI_VIEWPORT_WIDTH) * 100}%`,
                        gap: `${(EXPERIENCE_VISIONAI_GAP / EXPERIENCE_VISIONAI_TRACK_WIDTH) * 100}%`,
                        transform: `translateX(-${visionAiShifted ? (EXPERIENCE_VISIONAI_TRACK_SHIFT / EXPERIENCE_VISIONAI_TRACK_WIDTH) * 100 : 0}%)`,
                      }}
                    >
                      {visionAiImages.map((image) => (
                        <div key={image.alt} className="kme-test-page__experience-slider-card kme-test-page__experience-slider-card--hover-grow" style={{ width: `${(EXPERIENCE_VISIONAI_CARD_WIDTH / EXPERIENCE_VISIONAI_TRACK_WIDTH) * 100}%` }}>
                          <img src={image.src} alt={image.alt} style={{ display: "block", width: "100%", height: "100%" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {!visionAiShifted ? (
                    <button aria-label="Show next VisionAI experience image" className="kme-test-page__overlay-item kme-test-page__experience-slider-nav" style={getTopRightSizedStyle(24, 1087, 35, 35, 3)} type="button" onClick={() => setVisionAiShifted(true)}>
                      <img src={rightArrowImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                    </button>
                  ) : null}

                  {visionAiShifted ? (
                    <button aria-label="Show previous VisionAI experience images" className="kme-test-page__overlay-item kme-test-page__experience-slider-nav" style={getTopLeftSizedStyle(24, 1087, 35, 35, 3)} type="button" onClick={() => setVisionAiShifted(false)}>
                      <img src={leftArrowImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                    </button>
                  ) : null}

                  {newsCards.map((card) => (
                    <a key={card.href} aria-label={card.alt} className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" href={card.href} rel="noreferrer" style={{ ...card.imageStyle, overflow: "hidden" }} target="_blank">
                      <img src={card.src} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          gap: "0.25vw",
                          padding: "1.25vw 1.319444vw 1.111111vw",
                          background: "linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.76) 58%, rgba(17, 17, 17, 0.92) 100%)",
                          color: "#ffffff",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            marginBottom: "0.24vw",
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: "0.833333vw",
                            fontWeight: 600,
                            lineHeight: 1.15,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {card.source}
                        </span>
                        {card.title.map((line) => (
                          <span
                            key={line}
                            style={{
                              display: "block",
                              fontSize: "1.319444vw",
                              fontWeight: 700,
                              lineHeight: 1.18,
                              letterSpacing: "-0.035em",
                            }}
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...fullBleedSectionStyle, background: "#ffffff", overflow: "hidden" }}>
            <img src={footerImage} alt="" aria-hidden="true" style={fullBleedImageStyle} />
            <button aria-label="Scroll to top" className="kme-test-page__top-button" style={topButtonStyle} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={topButtonImage} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      }
    />
  );
}
