import { useLayoutEffect, useRef, type CSSProperties } from "react";

import backgroundImage from "../assets/company-what-is-k-me/company-what-is-k-me_BG.svg";
import danceButtonImage from "../assets/company-what-is-k-me/VIEW-KME-DANCE_button.svg";
import visionAiButtonImage from "../assets/company-what-is-k-me/VIEW-KME-VISIONAI_button.svg";
import danceImage from "../assets/company-what-is-k-me/K-me-Dance.webp";
import visionAiImage from "../assets/company-what-is-k-me/K-me-VisionAI.webp";
import footerImage from "../assets/footer/footer.svg";
import headlineImage from "../assets/company-what-is-k-me/whatiskme_headline.webp";
import topButtonImage from "../assets/footer/top_button.svg";
import smartMirrorVideo from "../assets/company-what-is-k-me/스마트미러 모델링.mp4";
import SitePage from "../shared/SitePage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 3788;
const HEADLINE_HEIGHT = 756.11;
const FOOTER_HEIGHT = 150;
const MIDDLE_DESIGN_HEIGHT = DESIGN_HEIGHT - HEADLINE_HEIGHT - FOOTER_HEIGHT;

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
};

type CanvasStageStyle = CSSProperties & {
  "--canvas-design-width": string;
  "--canvas-design-height": string;
  "--canvas-max-width": string;
};

function getTopCenterSizedStyle(top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    top: `${(top / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
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

const videoStyle = getTopCenterSizedStyle(1196 - HEADLINE_HEIGHT, 1067, 600, 2);
const danceStyle = getTopLeftSizedStyle(0, 1403, 900, 550, 2);
const visionAiStyle = getTopLeftSizedStyle(DESIGN_WIDTH - 900, 2073, 900, 545, 2);

const danceButtonStyle = getTopLeftSizedStyle(DESIGN_WIDTH - 175 - 318, 1793, 304, 61, 3);
const visionAiButtonStyle = getTopLeftSizedStyle(190, 2470, 304, 61, 3);
const topButtonStyle = getFooterChildStyle(1375, 72, 35, 35, 3);
const ctaButtonFrameStyle: CSSProperties = {
  borderRadius: 0,
  outline: "1px solid rgba(255, 255, 255, 0.92)",
  outlineOffset: "-1px",
  overflow: "visible",
  boxShadow: "0 0 0 1px rgba(17, 17, 17, 0.08)",
};
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
const fullBleedSectionStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  flex: "0 0 auto",
};
const headlineSectionStyle: CSSProperties = {
  ...fullBleedSectionStyle,
  overflow: "hidden",
  aspectRatio: `${DESIGN_WIDTH} / ${HEADLINE_HEIGHT}`,
};
const fullBleedImageStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
};
const middleSectionStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  flex: "0 0 auto",
  background: "#000000",
};

export default function CompanyWhatIsKMePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.load();

    const attemptPlay = () => {
      const playResult = video.play();

      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {
          // Ignore autoplay rejections on browsers with stricter power-saving policies.
        });
      }
    };

    attemptPlay();
    const timeoutId = window.setTimeout(attemptPlay, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <SitePage
      customMedia={
        <div className="kme-test-page__canvas-shell" style={shellStyle}>
          <div style={headlineSectionStyle}>
            <img src={headlineImage} alt="What is K-me headline" style={{ ...fullBleedImageStyle, height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          </div>

          <div style={middleSectionStyle}>
            <div className="kme-test-page__canvas-stage" style={canvasStageStyle}>
              <div className="kme-test-page__canvas-body">
                <img className="kme-test-page__canvas-background" src={backgroundImage} alt="What is K-me test page background" />

                <div className="kme-test-page__canvas-overlay">
                  <video
                    aria-label="Smart mirror modeling video"
                    autoPlay
                    className="kme-test-page__overlay-item kme-test-page__overlay-video"
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    preload="auto"
                    ref={videoRef}
                    style={videoStyle}
                  >
                    <source src={smartMirrorVideo} type="video/mp4" />
                  </video>

                  <a
                    aria-label="Go to K-me Dance page"
                    className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-scale-soft"
                    href="/k-me-dance/"
                    style={danceStyle}
                  >
                    <img src={danceImage} alt="K-me Dance" style={{ display: "block", width: "100%", height: "100%" }} />
                  </a>

                  <a
                    aria-label="View K-me Dance"
                    className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert"
                    href="/k-me-dance/"
                    style={{ ...danceButtonStyle, ...ctaButtonFrameStyle }}
                  >
                    <img src={danceButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                  </a>

                  <a
                    aria-label="Go to K-me Vision AI page"
                    className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-scale-soft"
                    href="/k-me-visionai/"
                    style={visionAiStyle}
                  >
                    <img src={visionAiImage} alt="K-me Vision AI" style={{ display: "block", width: "100%", height: "100%" }} />
                  </a>

                  <a
                    aria-label="View K-me Vision AI"
                    className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert"
                    href="/k-me-visionai/"
                    style={{ ...visionAiButtonStyle, ...ctaButtonFrameStyle }}
                  >
                    <img src={visionAiButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...fullBleedSectionStyle, background: "#ffffff", overflow: "hidden" }}>
            <img src={footerImage} alt="" aria-hidden="true" style={fullBleedImageStyle} />

            <button
              aria-label="Scroll to top"
              className="kme-test-page__top-button"
              style={topButtonStyle}
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
