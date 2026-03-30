import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type PlatformFeature = {
  id: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  metric: string;
  nodeClassName: string;
  tooltipClassName: string;
};

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "recognition",
    label: "Recognition",
    title: "사람의 행동을 읽습니다",
    summary: "Pose · Gesture",
    detail: "동작과 포즈를 인식해 반응이 시작될 지점을 만듭니다.",
    metric: "체험의 시작점",
    nodeClassName: "isRecognition",
    tooltipClassName: "isTipRecognition",
  },
  {
    id: "respond",
    label: "Respond",
    title: "화면과 콘텐츠가 즉시 반응합니다",
    summary: "Screen · Graphic",
    detail: "인식된 행동에 맞춰 화면과 콘텐츠가 바로 반응합니다.",
    metric: "현장 몰입감 상승",
    nodeClassName: "isRespond",
    tooltipClassName: "isTipRespond",
  },
  {
    id: "distribute",
    label: "Distribute",
    title: "현장 경험을 공유로 확장합니다",
    summary: "QR · Share",
    detail: "경험을 저장·공유 가능한 흐름으로 연결합니다.",
    metric: "UGC와 확산",
    nodeClassName: "isDistribute",
    tooltipClassName: "isTipDistribute",
  },
  {
    id: "operate",
    label: "Operate",
    title: "운영까지 안정적으로 이어집니다",
    summary: "Setup · On-site",
    detail: "세팅과 운영 동선까지 고려해 실제 현장에서 굴러가게 만듭니다.",
    metric: "운영 피로도 감소",
    nodeClassName: "isOperate",
    tooltipClassName: "isTipOperate",
  },
  {
    id: "sales",
    label: "Sales",
    title: "참여를 전환으로 연결합니다",
    summary: "Lead · Conversion",
    detail: "체험을 문의와 성과 측정까지 이어지게 만듭니다.",
    metric: "전환과 성과 측정",
    nodeClassName: "isSales",
    tooltipClassName: "isTipSales",
  },
];

const bubbleMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

export default function PlatformOrbit() {
  const [activeId, setActiveId] = useState(PLATFORM_FEATURES[0].id);

  const activeFeature = PLATFORM_FEATURES.find((feature) => feature.id === activeId) ?? PLATFORM_FEATURES[0];

  return (
    <div className="platformShowcase">
      <div className="platformOrbitScene">
        <div className="platformDeviceShell" aria-hidden>
          <div className="platformDeviceGlow" />
          <div className="platformDeviceFrame">
            <img
              className="platformDeviceImage"
              src="/images/product_home_banner.png"
              alt="K-me 스마트미러 디바이스"
              draggable={false}
            />
          </div>

          <div className="platformDeviceCaption">
            <span>K-me Platform</span>
            <strong>built for real spaces</strong>
          </div>
        </div>

        {PLATFORM_FEATURES.map((feature) => {
          const isActive = feature.id === activeId;

          return (
            <button
              key={feature.id}
              type="button"
              className={`platformNode ${feature.nodeClassName} ${isActive ? "isActive" : ""}`}
              onMouseEnter={() => setActiveId(feature.id)}
              onFocus={() => setActiveId(feature.id)}
              onClick={() => setActiveId(feature.id)}
              aria-pressed={isActive}
              data-cursor="hover"
            >
              <span className="platformNodeInner">
                <span className="platformNodeLabel">{feature.label}</span>
                <span className="platformNodeSummary">{feature.summary}</span>
              </span>
            </button>
          );
        })}

        <AnimatePresence mode="wait">
          <motion.article
            key={activeFeature.id}
            className={`platformBubble ${activeFeature.tooltipClassName}`}
            {...bubbleMotion}
          >
            <span className="platformBubbleKicker">{activeFeature.label}</span>
            <h3>{activeFeature.title}</h3>
            <p>{activeFeature.detail}</p>
            <strong>{activeFeature.metric}</strong>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="platformMobilePanel">
        <div className="platformMobileButtons" role="tablist" aria-label="K-me 플랫폼 핵심 기능">
          {PLATFORM_FEATURES.map((feature) => {
            const isActive = feature.id === activeId;

            return (
              <button
                key={feature.id}
                type="button"
                className={`platformMobileButton ${isActive ? "isActive" : ""}`}
                onClick={() => setActiveId(feature.id)}
                aria-pressed={isActive}
                data-cursor="hover"
              >
                {feature.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={activeFeature.id} className="platformMobileCard" {...bubbleMotion}>
            <span className="platformBubbleKicker">{activeFeature.label}</span>
            <h3>{activeFeature.title}</h3>
            <p>{activeFeature.detail}</p>
            <strong>{activeFeature.metric}</strong>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
