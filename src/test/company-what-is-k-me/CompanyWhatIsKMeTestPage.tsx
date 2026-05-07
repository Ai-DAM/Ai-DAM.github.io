import type { CSSProperties } from "react";

import backgroundImage from "../assets/company-what-is-k-me/company-what-is-k-me_BG.svg";
import danceButtonImage from "../assets/company-what-is-k-me/VIEW-KME-DANCE_button.svg";
import visionAiButtonImage from "../assets/company-what-is-k-me/VIEW-KME-VISIONAI_button.svg";
import danceImage from "../assets/company-what-is-k-me/K-me-Dance.png";
import visionAiImage from "../assets/company-what-is-k-me/K-me-VisionAI.png";
import footerImage from "../assets/footer/footer.svg";
import headlineImage from "../assets/company-what-is-k-me/whatiskme_headline.svg";
import topButtonImage from "../assets/footer/top_button.svg";
import smartMirrorVideo from "../assets/company-what-is-k-me/스마트미러 모델링.mp4";
import TestLandingPage from "../shared/TestLandingPage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 3788;

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
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
  };
}

function getTopLeftSizedStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

function getTopCenterOffsetSizedStyle(
  centerX: number,
  top: number,
  width: number,
  height: number,
  zIndex: number,
): OverlayStyle {
  return getTopLeftSizedStyle(centerX - width / 2, top, width, height, zIndex);
}

function getTopFullBleedStyle(top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: "50%",
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: "100vw",
    maxWidth: "none",
    aspectRatio: `${width} / ${height}`,
    zIndex,
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

const headlineStyle = getTopCenterSizedStyle(0, 1440, 756.11, 1);
const videoStyle = getTopCenterSizedStyle(1196, 1067, 600, 2);
const danceStyle = getTopLeftSizedStyle(0, 2213, 900, 500, 2);
const visionAiStyle = getTopLeftSizedStyle(DESIGN_WIDTH - 900, 2913, 900, 545, 2);

const danceButtonStyle = getTopCenterOffsetSizedStyle(DESIGN_WIDTH / 2 + 389, 2624, 304, 61, 3);
const visionAiButtonStyle = getTopCenterOffsetSizedStyle(DESIGN_WIDTH / 2 - 392, 3319, 304, 61, 3);
const footerStyle = getTopFullBleedStyle(3638, 1440, 150, 1);
const topButtonStyle = getFooterChildStyle(1375, 72, 35, 35, 3);
const canvasStageStyle: CanvasStageStyle = {
  "--canvas-design-width": `${DESIGN_WIDTH}`,
  "--canvas-design-height": `${DESIGN_HEIGHT}`,
  "--canvas-max-width": "1920",
};

export default function CompanyWhatIsKMeTestPage() {
  return (
    <TestLandingPage
      customMedia={
        <div className="kme-test-page__canvas-shell">
          <div className="kme-test-page__canvas-stage" style={canvasStageStyle}>
            <img className="kme-test-page__overlay-item" src={headlineImage} alt="What is K-me headline" style={headlineStyle} />

            <div className="kme-test-page__canvas-body">
              <img className="kme-test-page__canvas-background" src={backgroundImage} alt="What is K-me test page background" />

              <div className="kme-test-page__canvas-overlay">
                <video
                  aria-label="Smart mirror modeling video"
                  autoPlay
                  className="kme-test-page__overlay-item"
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={videoStyle}
                >
                  <source src={smartMirrorVideo} type="video/mp4" />
                </video>

                <img
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow"
                  src={danceImage}
                  alt="K-me Dance"
                  style={danceStyle}
                />

                <a
                  aria-label="View K-me Dance"
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert kme-test-page__overlay-item--cta-outline"
                  href="/test/k-me-dance/"
                  style={danceButtonStyle}
                >
                  <img src={danceButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                </a>

                <img
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow"
                  src={visionAiImage}
                  alt="K-me Vision AI"
                  style={visionAiStyle}
                />

                <a
                  aria-label="View K-me Vision AI"
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert kme-test-page__overlay-item--cta-outline"
                  href="/test/k-me-visionai/"
                  style={visionAiButtonStyle}
                >
                  <img src={visionAiButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                </a>
              </div>
            </div>

            <div className="kme-test-page__overlay-item" aria-hidden="true" style={footerStyle}>
              <img
                src={footerImage}
                alt=""
                aria-hidden="true"
                style={{ display: "block", width: "100%", height: "100%" }}
              />

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
        </div>
      }
    />
  );
}
