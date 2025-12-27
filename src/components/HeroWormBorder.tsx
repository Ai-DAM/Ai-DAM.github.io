import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  pad?: number;       // ✅ 텍스트와 테두리 간격 (진짜 패딩)
  radius?: number;
  duration?: number;
};

export default function HeroWormBorder({
  children,
  pad = 14,
  radius = 18,
  duration = 6.8,
}: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // ✅ glow가 잘리지 않게 “추가 여유”
  const BLEED = 18;

  const styleVars = useMemo(
    () =>
      ({
        "--worm-pad": `${pad}px`,
        "--worm-r": `${radius}px`,
        "--worm-speed": `${duration}s`,
      } as React.CSSProperties),
    [pad, radius, duration]
  );

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    // @ts-expect-error
    const fontsReady = document?.fonts?.ready;
    if (fontsReady?.then) fontsReady.then(update).catch(() => {});

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // ✅ pad(간격) + bleed(글로우 여유) 만큼 밖으로 확장
  const off = pad + BLEED;

  // SVG 전체 크기
  const svgW = size.w + off * 2;
  const svgH = size.h + off * 2;

  // 실제 테두리 박스(텍스트 박스 + pad*2)
  const boxW = size.w + pad * 2;
  const boxH = size.h + pad * 2;

  return (
    <div className="heroWormWrap" style={styleVars}>
      <div ref={contentRef} className="heroWormContent">
        {children}
      </div>

      {size.w > 0 && size.h > 0 && (
        <svg
          className="heroWormSvg"
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          aria-hidden
          style={{
            left: `${-off}px`,
            top: `${-off}px`,
          }}
        >
          <defs>
            <linearGradient id="wormGrad" x1="0" y1="0" x2={svgW} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgba(0,210,255,.95)" />
              <stop offset="0.5" stopColor="rgba(139,92,255,.95)" />
              <stop offset="1" stopColor="rgba(255,79,216,.95)" />
            </linearGradient>
          </defs>

          {/* 글로우용 */}
          <rect
            className="heroWormGlow"
            x={BLEED}
            y={BLEED}
            width={boxW}
            height={boxH}
            rx={radius}
            ry={radius}
            pathLength={1000}
          />

          {/* 실제 지렁이 */}
          <rect
            className="heroWormSeg"
            x={BLEED}
            y={BLEED}
            width={boxW}
            height={boxH}
            rx={radius}
            ry={radius}
            pathLength={1000}
          />
        </svg>
      )}
    </div>
  );
}
