import { useEffect, useMemo, useRef } from "react";

export default function CustomCursor() {
  const isFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: fine) and (hover: hover)").matches;

  if (!isFinePointer) return null;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const hoveredRef = useRef(false);
  const pressedRef = useRef(false);

  const state = useMemo(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    return { x: cx, y: cy, tx: cx, ty: cy, rx: cx, ry: cy };
  }, []);

  useEffect(() => {
    const applyRingScale = () => {
      const ring = ringRef.current;
      if (!ring) return;

      const hovered = hoveredRef.current;
      const pressed = pressedRef.current;

      // hover/press 조합 스케일(겹치지 않게 깔끔하게)
      const s = hovered ? (pressed ? 1.20 : 1.35) : (pressed ? 0.92 : 1.0);
      ring.style.setProperty("transform", `translate(-50%, -50%) scale(${s})`);
      ring.style.setProperty("border-color", hovered ? "rgba(255,255,255,.35)" : "rgba(255, 255, 255, 0.58)");
    };

    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      // ✅ dot: 더 “바짝” 따라오게 (0.35 → 0.6)
      state.x += (state.tx - state.x) * 0.60;
      state.y += (state.ty - state.y) * 0.60;

      // ring: 살짝 느리게(트레일 느낌 유지)
      state.rx += (state.tx - state.rx) * 0.14;
      state.ry += (state.ty - state.ry) * 0.14;

      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.left = `${state.x}px`;
        dot.style.top = `${state.y}px`;
      }
      if (ring) {
        ring.style.left = `${state.rx}px`;
        ring.style.top = `${state.ry}px`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // hover targets
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const hit = el.closest("a,button,[data-cursor='hover']");
      if (!hit) return;

      hoveredRef.current = true;
      applyRingScale();
    };

    const onOut = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const hit = el.closest("a,button,[data-cursor='hover']");
      if (!hit) return;

      hoveredRef.current = false;
      applyRingScale();
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    // ✅ 클릭 펄스 (기본 커서 대신 우리 링이 반응)
    let clickTimer = 0 as any;
    const onDown = () => {
      pressedRef.current = true;
      applyRingScale();

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.classList.remove("isClick"); // 재트리거용
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        wrap.offsetWidth; // reflow
        wrap.classList.add("isClick");
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => wrap.classList.remove("isClick"), 450);
      }
    };
    const onUp = () => {
      pressedRef.current = false;
      applyRingScale();
    };

    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("blur", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
      cancelAnimationFrame(raf);
      clearTimeout(clickTimer);
    };
  }, [state]);

  return (
    <div ref={wrapRef} className="cursorWrap" aria-hidden="true">
      <div ref={ringRef} className="cursorRing" />
      <div ref={dotRef} className="cursorDot" />
    </div>
  );
}
