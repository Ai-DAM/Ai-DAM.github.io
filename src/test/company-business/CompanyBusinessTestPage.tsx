import type { CSSProperties } from "react";

import backgroundImage from "../assets/company-business_BG.svg";
import footerImage from "../assets/footer/footer.svg";
import topButtonImage from "../assets/footer/top_button.svg";
import kmeDanceStudioFeatureImage from "../assets/company-business/kmedancestudio_1.svg";
import kmeDanceStudioSectionImage from "../assets/company-business/kmedancestudio.svg";
import processCardOneImage from "../assets/company-business/process_1.svg";
import processCardTwoImage from "../assets/company-business/process_2.svg";
import processCardThreeImage from "../assets/company-business/process_3.svg";
import processCardFourImage from "../assets/company-business/process_4.svg";
import processCardFiveImage from "../assets/company-business/process_5.svg";
import processCardSixImage from "../assets/company-business/process_6.svg";
import processSectionImage from "../assets/company-business/process.svg";
import teamSectionImage from "../assets/company-business/team.svg";
import teamThinkingMonsterImage from "../assets/company-business/team_thinkingmonster.svg";
import technologyContentOverlayImage from "../assets/company-business/technology_content_overlay.svg";
import technologyExperienceCaptureImage from "../assets/company-business/technology_experience_capture.svg";
import technologyMotionRecognitionImage from "../assets/company-business/technology_motion_recognition.svg";
import technologySpatialInteractionImage from "../assets/company-business/technology_spatial_interaction.svg";
import technologySectionImage from "../assets/company-business/technology.svg";
import TestLandingPage from "../shared/TestLandingPage";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 5325;
const TECHNOLOGY_ROW_GAP = 60;

type OverlayStyle = CSSProperties & {
  "--overlay-translate-x"?: string;
  "--overlay-z-index"?: string;
};

type OverlayItem = {
  src: string;
  alt: string;
  style: OverlayStyle;
  className?: string;
  ariaHidden?: true;
};

function getTopCenterSizedStyle(top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
  };
}

function getTopLeftSizedStyle(left: number, top: number, width: number, height: number, zIndex: number): OverlayStyle {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    aspectRatio: `${width} / ${height}`,
    "--overlay-z-index": `${zIndex}`,
    "--overlay-translate-x": "0%",
  };
}

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
    zIndex,
    "--overlay-translate-x": "0%",
  };
}

const PROCESS_CARD_WIDTH = 300;
const PROCESS_CARD_HEIGHT = 432;
const PROCESS_GAP = 140;
const PROCESS_SECTION_TOP = 2124;
const PROCESS_ROW_LEFT = (DESIGN_WIDTH - PROCESS_CARD_WIDTH * 3 - PROCESS_GAP * 2) / 2;
const PROCESS_ROW_TOP = PROCESS_SECTION_TOP + 178;
const PROCESS_SECOND_ROW_TOP = PROCESS_ROW_TOP + PROCESS_CARD_HEIGHT + PROCESS_GAP;
const KME_DANCE_STUDIO_SECTION_TOP = 3405;
const KME_DANCE_STUDIO_FEATURE_TOP = 3591;

const overlayItems: OverlayItem[] = [
  {
    src: technologySectionImage,
    alt: "Technology section",
    style: getTopCenterSizedStyle(780, 1440, 100, 1),
  },
  {
    src: technologyExperienceCaptureImage,
    alt: "Technology experience capture",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(0, 880, 720, 572, 2),
  },
  {
    src: technologySpatialInteractionImage,
    alt: "Technology spatial interaction",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(720, 880, 720, 572, 2),
  },
  {
    src: technologyContentOverlayImage,
    alt: "Technology content overlay",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(0, 1452 + TECHNOLOGY_ROW_GAP, 720, 572, 2),
  },
  {
    src: technologyMotionRecognitionImage,
    alt: "Technology motion recognition",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(720, 1452 + TECHNOLOGY_ROW_GAP, 720, 572, 2),
  },
  {
    src: processSectionImage,
    alt: "Process section",
    style: getTopCenterSizedStyle(PROCESS_SECTION_TOP, 1440, 100, 1),
  },
  {
    src: processCardOneImage,
    alt: "Process step 1",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT, PROCESS_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: processCardTwoImage,
    alt: "Process step 2",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT + PROCESS_CARD_WIDTH + PROCESS_GAP, PROCESS_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: processCardThreeImage,
    alt: "Process step 3",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT + (PROCESS_CARD_WIDTH + PROCESS_GAP) * 2, PROCESS_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: processCardFourImage,
    alt: "Process step 4",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT, PROCESS_SECOND_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: processCardFiveImage,
    alt: "Process step 5",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT + PROCESS_CARD_WIDTH + PROCESS_GAP, PROCESS_SECOND_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: processCardSixImage,
    alt: "Process step 6",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopLeftSizedStyle(PROCESS_ROW_LEFT + (PROCESS_CARD_WIDTH + PROCESS_GAP) * 2, PROCESS_SECOND_ROW_TOP, PROCESS_CARD_WIDTH, PROCESS_CARD_HEIGHT, 2),
  },
  {
    src: kmeDanceStudioSectionImage,
    alt: "K-me Dance Studio section",
    style: getTopCenterSizedStyle(KME_DANCE_STUDIO_SECTION_TOP, 1440, 100, 1),
  },
  {
    src: kmeDanceStudioFeatureImage,
    alt: "K-me Dance Studio feature",
    className: "kme-test-page__overlay-item--hover-grow",
    style: getTopCenterSizedStyle(KME_DANCE_STUDIO_FEATURE_TOP, 920, 752, 2),
  },
  {
    src: teamSectionImage,
    alt: "Team section",
    style: getTopCenterSizedStyle(4509, 1440, 100, 1),
  },
  {
    src: teamThinkingMonsterImage,
    alt: "Thinking Monster team",
    className: "kme-test-page__overlay-item--slogan-hover",
    style: getTopCenterSizedStyle(4787, 812, 199, 2),
  },
  {
    src: footerImage,
    alt: "",
    ariaHidden: true,
    style: getBottomCenterOverlayStyle(0, 1440, 1),
  },
];

export default function CompanyBusinessTestPage() {
  return (
    <TestLandingPage backgroundImage={backgroundImage} backgroundAlt="Company business test page background">
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
