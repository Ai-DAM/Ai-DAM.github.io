import type { CSSProperties } from "react";

import featureOneImage from "../assets/k-me-dance/1.svg";
import collageTwoOneImage from "../assets/k-me-dance/2-1.png";
import collageTwoTwoImage from "../assets/k-me-dance/2-2.png";
import collageTwoThreeImage from "../assets/k-me-dance/2-3.png";
import collageTwoFourImage from "../assets/k-me-dance/2-4.png";
import collageTwoFiveImage from "../assets/k-me-dance/2-5.png";
import collageTwoSixImage from "../assets/k-me-dance/2-6.png";
import collageTwoSevenImage from "../assets/k-me-dance/2-7.png";
import collageThreeOneImage from "../assets/k-me-dance/3-1.png";
import collageThreeTwoImage from "../assets/k-me-dance/3-2.png";
import collageThreeThreeImage from "../assets/k-me-dance/3-3.png";
import contactButtonImage from "../assets/k-me-dance/K-me Dance Contact.svg";
import footerImage from "../assets/footer/footer.svg";
import backgroundImage from "../assets/k-me-dance/k-me-dance_BG.png";
import headlineImage from "../assets/k-me-dance/kmedance_headline.png";
import topButtonImage from "../assets/footer/top_button.svg";
import TestLandingPage from "../shared/TestLandingPage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 7851;
const DANCE_KEYWORDS = ["K-POP", "CHOREOGRAPHY", "HIP-HOP", "LOCKING", "POPPING", "WAACKING", "BREAKING", "FREESTYLE"];

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

function getBottomLeftSizedStyle(left: number, bottom: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    bottom: `${(bottom / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

function getBottomFullBleedStyle(bottom: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: "50%",
    bottom: `${(bottom / DESIGN_HEIGHT) * 100}%`,
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

const headlineStyle = getTopCenterSizedStyle(0, 1440, 663, 1);
const accentBandStyle = getTopCenterSizedStyle(663, 1440, 50, 1);
const featureOneStyle = getTopCenterSizedStyle(996, 1200, 800, 2);
const collageTwoOneStyle = getTopLeftSizedStyle(182, 4425, 380, 284, 2);
const collageTwoTwoStyle = getTopLeftSizedStyle(600, 4425, 242, 180, 2);
const collageTwoThreeStyle = getTopLeftSizedStyle(877, 4425, 315, 455, 2);
const collageTwoFourStyle = getBottomLeftSizedStyle(249, 2641, 313, 453, 2);
const collageTwoFiveStyle = getTopLeftSizedStyle(600, 4643, 242, 350, 2);
const collageTwoSixStyle = getBottomLeftSizedStyle(600, 2641, 242, 180, 2);
const collageTwoSevenStyle = getBottomLeftSizedStyle(877, 2641, 380, 283, 2);
const collageThreeOneStyle = getTopLeftSizedStyle(90, 7053, 410, 309, 2);
const collageThreeTwoStyle = getTopLeftSizedStyle(530, 7053, 410, 309, 2);
const collageThreeThreeStyle = getTopLeftSizedStyle(970, 7053, 410, 309, 2);
const contactButtonStyle = getTopCenterSizedStyle(7495, 500, 82, 2);
const footerStyle = getBottomFullBleedStyle(0, 1440, 150, 1);
const topButtonStyle = getFooterChildStyle(1375, 72, 35, 35, 3);
const canvasStageStyle: CanvasStageStyle = {
  "--canvas-design-width": `${DESIGN_WIDTH}`,
  "--canvas-design-height": `${DESIGN_HEIGHT}`,
  "--canvas-max-width": "1920",
};
const whiteCanvasStyle: CSSProperties = {
  background: "#ffffff",
};

export default function KMeDanceTestPage() {
  return (
    <TestLandingPage
      customMedia={
        <div className="kme-test-page__canvas-shell" style={whiteCanvasStyle}>
          <div className="kme-test-page__canvas-stage" style={{ ...canvasStageStyle, ...whiteCanvasStyle }}>
            <div className="kme-test-page__canvas-body" style={whiteCanvasStyle}>
              <img className="kme-test-page__canvas-background" src={backgroundImage} alt="K-me Dance test page background" />

              <div className="kme-test-page__canvas-overlay">
                <img className="kme-test-page__overlay-item" src={headlineImage} alt="K-me Dance headline" style={headlineStyle} />

                <div className="kme-test-page__overlay-item kme-test-page__dance-marquee" aria-hidden="true" style={{ ...accentBandStyle, background: "#753DE6" }}>
                  <div className="kme-test-page__dance-marquee-track">
                    {[0, 1].map((groupIndex) => (
                      <div key={groupIndex} className="kme-test-page__dance-marquee-group">
                        {DANCE_KEYWORDS.map((keyword) => (
                          <span key={`${groupIndex}-${keyword}`} className="kme-test-page__dance-marquee-text">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <img
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-sport"
                  src={featureOneImage}
                  alt="K-me Dance section 1"
                  style={featureOneStyle}
                />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoOneImage} alt="K-me Dance collage 2-1" style={collageTwoOneStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoTwoImage} alt="K-me Dance collage 2-2" style={collageTwoTwoStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoThreeImage} alt="K-me Dance collage 2-3" style={collageTwoThreeStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoFourImage} alt="K-me Dance collage 2-4" style={collageTwoFourStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoFiveImage} alt="K-me Dance collage 2-5" style={collageTwoFiveStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoSixImage} alt="K-me Dance collage 2-6" style={collageTwoSixStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageTwoSevenImage} alt="K-me Dance collage 2-7" style={collageTwoSevenStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageThreeOneImage} alt="K-me Dance collage 3-1" style={collageThreeOneStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageThreeTwoImage} alt="K-me Dance collage 3-2" style={collageThreeTwoStyle} />
                <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={collageThreeThreeImage} alt="K-me Dance collage 3-3" style={collageThreeThreeStyle} />
                <a
                  aria-label="Go to contact page"
                  className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert"
                  href="/test/contact/"
                  style={contactButtonStyle}
                >
                  <img src={contactButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
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
