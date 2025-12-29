import { ReactNode, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  pad?: number;       // 텍스트와 테두리 간격
  radius?: number;
  duration?: number;  // 한 바퀴 도는 시간(초)
};

/** clamp */
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * rounded-rect perimeter 상에서 (px,py)에 가장 가까운 점의 progress(0..1000)를 구한다.
 * - local 좌표: rect의 top-left가 (0,0), width=w, height=h
 * - path start: (r, 0)에서 시작해 시계방향
 */
function nearestRoundedRectProgress1000(px: number, py: number, w: number, h: number, rIn: number) {
  const r = clamp(rIn, 0, Math.min(w, h) / 2);

  const topLen = Math.max(0, w - 2 * r);
  const rightLen = Math.max(0, h - 2 * r);
  const bottomLen = topLen;
  const leftLen = rightLen;
  const arcLen = (Math.PI / 2) * r;

  const L = topLen + rightLen + bottomLen + leftLen + 4 * arcLen;
  if (L <= 0.0001) return 0;

  type Cand = { d2: number; s: number };
  const cands: Cand[] = [];

  // ---- Top edge (r..w-r, y=0), direction +x
  {
    const x = clamp(px, r, w - r);
    const y = 0;
    const dx = px - x;
    const dy = py - y;
    const s = x - r;
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Top-right arc center (w-r, r), angle [-pi/2 .. 0]
  if (r > 0) {
    const cx = w - r, cy = r;
    const theta = Math.atan2(py - cy, px - cx);
    const th = clamp(theta, -Math.PI / 2, 0);
    const x = cx + r * Math.cos(th);
    const y = cy + r * Math.sin(th);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen;
    const s = sBase + (th - (-Math.PI / 2)) * r;
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Right edge (x=w, y=r..h-r), direction +y
  {
    const x = w;
    const y = clamp(py, r, h - r);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen;
    const s = sBase + (y - r);
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Bottom-right arc center (w-r, h-r), angle [0 .. pi/2]
  if (r > 0) {
    const cx = w - r, cy = h - r;
    const theta = Math.atan2(py - cy, px - cx);
    const th = clamp(theta, 0, Math.PI / 2);
    const x = cx + r * Math.cos(th);
    const y = cy + r * Math.sin(th);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen + rightLen;
    const s = sBase + (th - 0) * r;
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Bottom edge (r..w-r, y=h), direction -x (right->left)
  {
    const x = clamp(px, r, w - r);
    const y = h;
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen + rightLen + arcLen;
    const s = sBase + (w - r - x);
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Bottom-left arc center (r, h-r), angle [pi/2 .. pi]
  if (r > 0) {
    const cx = r, cy = h - r;
    const theta = Math.atan2(py - cy, px - cx);
    const th = clamp(theta, Math.PI / 2, Math.PI);
    const x = cx + r * Math.cos(th);
    const y = cy + r * Math.sin(th);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen + rightLen + arcLen + bottomLen;
    const s = sBase + (th - Math.PI / 2) * r;
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Left edge (x=0, y=r..h-r), direction -y (bottom->top)
  {
    const x = 0;
    const y = clamp(py, r, h - r);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen + rightLen + arcLen + bottomLen + arcLen;
    const s = sBase + (h - r - y);
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // ---- Top-left arc center (r, r), angle [pi .. 3pi/2]
  if (r > 0) {
    const cx = r, cy = r;
    const theta = Math.atan2(py - cy, px - cx);
    const th = clamp(theta, Math.PI, (3 * Math.PI) / 2);
    const x = cx + r * Math.cos(th);
    const y = cy + r * Math.sin(th);
    const dx = px - x;
    const dy = py - y;
    const sBase = topLen + arcLen + rightLen + arcLen + bottomLen + arcLen + leftLen;
    const s = sBase + (th - Math.PI) * r;
    cands.push({ d2: dx * dx + dy * dy, s });
  }

  // pick min distance
  let best = cands[0];
  for (let i = 1; i < cands.length; i++) {
    if (cands[i].d2 < best.d2) best = cands[i];
  }

  // normalize to 0..1000
  let p = (best.s / L) * 1000;
  p = ((p % 1000) + 1000) % 1000;
  return p;
}

export default function HeroWormBorder({
  children,
  pad = 14,
  radius = 18,
  duration = 6.8,
}: Props) {
  const uid = useId();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });

  // glow가 잘리지 않게 “추가 여유”
  const BLEED = 18;

  // JS 애니메이션 상태(리렌더 없이 유지)
  const progressRef = useRef(0); // 0..1000
  const targetRef = useRef(0);   // 0..1000
  const hoverRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number>(0);

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

  // pad(간격) + bleed(글로우 여유) 만큼 밖으로 확장
  const off = pad + BLEED;

  // SVG 전체 크기
  const svgW = size.w + off * 2;
  const svgH = size.h + off * 2;

  // 실제 테두리 박스(텍스트 박스 + pad*2)
  const boxW = size.w + pad * 2;
  const boxH = size.h + pad * 2;

  /**
   * ✅ 데스크탑에서만:
   * - 페이지 상단 ~ #Platform 섹션 시작 전까지는 "어디에서든" 마우스 위치로 붙어있고
   * - 그 아래로 내려가면 follow 해제 → 그 지점부터 회전 재개
   * - 모바일/터치는 기존 CSS 애니 그대로
   */
  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const m = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const enable = !!m?.matches && !reduce?.matches;

    if (!enable) return;

    // 데스크톱: JS가 dashoffset 제어 -> CSS 애니메이션은 끔 (CSS에서 .wormFollow 처리 필요)
    wrap.classList.add("wormFollow");

    // ✅ 지렁이 "중간"이 마우스에 오도록 (CSS stroke-dasharray 첫 값과 맞추기)
    const DASH_LEN = 120;
    const DASH_MID = DASH_LEN / 2;

    const setDash = (p: number) => {
      wrap.style.setProperty("--worm-dashoffset", String(-(p - DASH_MID)));
    };

    // 초기값 세팅(깜빡임 방지)
    setDash(progressRef.current);

    // ✅ Platform 섹션의 문서 절대 top (이 Y보다 위면 follow ON)
    let platformTopAbs = Number.POSITIVE_INFINITY;
    let ro: ResizeObserver | null = null;

    const computePlatformTopAbs = () => {
      const el = document.getElementById("Platform");
      if (!el) {
        platformTopAbs = Number.POSITIVE_INFINITY;
        return;
      }
      platformTopAbs = el.getBoundingClientRect().top + window.scrollY;
    };

    const bindPlatformRO = () => {
      const el = document.getElementById("Platform");
      if (!el) return;
      ro = new ResizeObserver(() => computePlatformTopAbs());
      ro.observe(el);
    };

    computePlatformTopAbs();
    bindPlatformRO();

    window.addEventListener("resize", computePlatformTopAbs);
    window.addEventListener("load", computePlatformTopAbs);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;

      // ✅ follow 범위: Platform 섹션 시작 전까지
      const absY = e.clientY + window.scrollY;
      const followActive = absY < platformTopAbs;

      hoverRef.current = followActive;
      if (!followActive) return;

      // svg viewBox 좌표로 변환
      const r = svg.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;

      const x = (e.clientX - r.left) * (svgW / r.width);
      const y = (e.clientY - r.top) * (svgH / r.height);

      // box local 좌표로 변환 (rect가 BLEED,BLEED에서 시작)
      const px = x - BLEED;
      const py = y - BLEED;

      targetRef.current = nearestRoundedRectProgress1000(px, py, boxW, boxH, radius);
    };

    // ✅ 페이지 어디서든 감지
    window.addEventListener("pointermove", onMove, { passive: true });

    // ✅ 창 밖으로 나가면 follow 해제
    const onLeaveWindow = () => {
      hoverRef.current = false;
    };
    document.addEventListener("mouseleave", onLeaveWindow);

    lastTRef.current = performance.now();

    const tick = (t: number) => {
      const last = lastTRef.current || t;
      const dt = Math.min(0.05, Math.max(0.001, (t - last) / 1000));
      lastTRef.current = t;

      let p = progressRef.current;
      const speed = 1000 / Math.max(0.1, duration); // 1000 units per duration seconds

      if (hoverRef.current) {
        const target = targetRef.current;

        // 가장 가까운 방향으로 이동(랩어라운드 고려)
        let diff = target - p;
        if (diff > 500) diff -= 1000;
        if (diff < -500) diff += 1000;

        const follow = 1 - Math.exp(-dt * 18); // 18: 따라붙는 강도
        p = p + diff * follow;
      } else {
        // follow OFF면 계속 회전
        p = p + speed * dt;
      }

      // normalize 0..1000
      p = ((p % 1000) + 1000) % 1000;
      progressRef.current = p;

      setDash(p);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove as any);
      document.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("resize", computePlatformTopAbs);
      window.removeEventListener("load", computePlatformTopAbs);

      if (ro) ro.disconnect();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      wrap.classList.remove("wormFollow");
      wrap.style.removeProperty("--worm-dashoffset");
    };
  }, [boxW, boxH, radius, duration, svgW, svgH, BLEED]);

  return (
    <div ref={wrapRef} className="heroWormWrap" style={styleVars}>
      <div ref={contentRef} className="heroWormContent">
        {children}
      </div>

      {size.w > 0 && size.h > 0 && (
        <svg
          ref={svgRef}
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
            <linearGradient
              id={`wormGrad-${uid}`}
              x1="0"
              y1="0"
              x2={svgW}
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="rgba(0, 208, 255, 1)" />
              <stop offset="0.5" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="1" stopColor="rgba(255, 255, 255, 0.95)" />
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
            style={{ stroke: `url(#wormGrad-${uid})` }}
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
            pathLength={2000}
            style={{ stroke: `url(#wormGrad-${uid})` }}
          />
        </svg>
      )}
    </div>
  );
}
