import type { CSSProperties } from "react";

import featureOneImage from "../assets/k-me-visionai/1.svg";
import featureTwoOneImage from "../assets/k-me-visionai/2-1.svg";
import featureTwoTwoImage from "../assets/k-me-visionai/2-2.svg";
import featureTwoThreeImage from "../assets/k-me-visionai/2-3.svg";
import featureTwoFourImage from "../assets/k-me-visionai/2-4.svg";
import footerImage from "../assets/footer/footer.svg";
import backgroundImage from "../assets/k-me-visionai/k-me-visionai_BG.png";
import contactButtonImage from "../assets/k-me-visionai/K-me VisionAI Contact.svg";
import headlineImage from "../assets/k-me-visionai/k-me-visionai_headline.png";
import topButtonImage from "../assets/footer/top_button.svg";
import TestLandingPage from "../shared/TestLandingPage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 4612;
const HEADLINE_IMAGE_HEIGHT = 650;
const BANNER_HEIGHT = 50;
const HEADLINE_HEIGHT = 700;
const FOOTER_HEIGHT = 150;
const MIDDLE_DESIGN_HEIGHT = DESIGN_HEIGHT - HEADLINE_HEIGHT - FOOTER_HEIGHT;
const VISIONAI_KEYWORDS = ["INTERACTIVE", "EXPERIENCE", "ACTIVATION", "PERFORMANCE", "FESTIVAL", "EVENT"];

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

function getBottomCenterSizedStyle(bottom: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    bottom: `${(bottom / MIDDLE_DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
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

const bannerStyle: CSSProperties = {
  width: "100%",
  aspectRatio: `${DESIGN_WIDTH} / ${BANNER_HEIGHT}`,
  background: "#397ED8",
};
const featureOneStyle = getTopCenterSizedStyle(962 - HEADLINE_HEIGHT, 661, 266, 2);
const featureTwoOneStyle = getTopLeftSizedStyle(167, 1350 - HEADLINE_HEIGHT, 200, 256, 2);
const featureTwoTwoStyle = getTopLeftSizedStyle(469, 1350 - HEADLINE_HEIGHT, 200, 256, 2);
const featureTwoThreeStyle = getTopLeftSizedStyle(771, 1350 - HEADLINE_HEIGHT, 200, 256, 2);
const featureTwoFourStyle = getTopLeftSizedStyle(1073, 1350 - HEADLINE_HEIGHT, 200, 256, 2);
const contactButtonStyle = getBottomCenterSizedStyle(261 - FOOTER_HEIGHT, 500, 82, 2);
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
const headlineSectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: "0 0 auto",
  overflow: "hidden",
  aspectRatio: `${DESIGN_WIDTH} / ${HEADLINE_HEIGHT}`,
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
  top: `${-(HEADLINE_HEIGHT / MIDDLE_DESIGN_HEIGHT) * 100}%`,
  left: 0,
  display: "block",
  width: "100%",
  height: `${(DESIGN_HEIGHT / MIDDLE_DESIGN_HEIGHT) * 100}%`,
  maxWidth: "none",
  objectFit: "fill",
};

export default function KMeVisionAiTestPage() {
  return (
    <TestLandingPage
      customMedia={
        <div className="kme-test-page__canvas-shell" style={shellStyle}>
          <div style={headlineSectionStyle}>
            <img src={headlineImage} alt="K-me VisionAI headline" style={{ ...fullBleedImageStyle, width: "100%", aspectRatio: `${DESIGN_WIDTH} / ${HEADLINE_IMAGE_HEIGHT}`, flex: "0 0 auto" }} />
            <div className="kme-test-page__dance-marquee kme-test-page__dance-marquee--visionai" aria-hidden="true" style={bannerStyle}>
              <div className="kme-test-page__dance-marquee-track">
                {[0, 1].map((groupIndex) => (
                  <div key={groupIndex} className="kme-test-page__dance-marquee-group">
                    {VISIONAI_KEYWORDS.map((keyword) => (
                      <span key={`${groupIndex}-${keyword}`} className="kme-test-page__dance-marquee-text">
                        {keyword}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={middleSectionStyle}>
            <div className="kme-test-page__canvas-stage" style={{ ...canvasStageStyle, ...whiteCanvasStyle, overflow: "hidden" }}>
              <div className="kme-test-page__canvas-body" style={whiteCanvasStyle}>
                <img className="kme-test-page__canvas-background" src={backgroundImage} alt="K-me VisionAI test page background" style={middleBackgroundStyle} />

                <div className="kme-test-page__canvas-overlay">
                  <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-neon-panel" src={featureOneImage} alt="K-me VisionAI section 1" style={featureOneStyle} />
                  <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={featureTwoOneImage} alt="K-me VisionAI section 2-1" style={featureTwoOneStyle} />
                  <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={featureTwoTwoImage} alt="K-me VisionAI section 2-2" style={featureTwoTwoStyle} />
                  <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={featureTwoThreeImage} alt="K-me VisionAI section 2-3" style={featureTwoThreeStyle} />
                  <img className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-grow" src={featureTwoFourImage} alt="K-me VisionAI section 2-4" style={featureTwoFourStyle} />
                  <a aria-label="Go to contact page" className="kme-test-page__overlay-item kme-test-page__overlay-item--hover-invert" href="/contact/" style={contactButtonStyle}>
                    <img src={contactButtonImage} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
                  </a>
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
