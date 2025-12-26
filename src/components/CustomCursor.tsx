import { useEffect, useMemo, useRef } from "react";

export default function CustomCursor() {
  // ✅ 모바일/터치(hover 없음)에서는 커서 자체를 렌더/동작하지 않음
  const isFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: fine) and (hover: hover)").matches;

  if (!isFinePointer) return null;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const state = useMemo(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    return {
      x: cx,
      y: cy,
      tx: cx,
      ty: cy,
      rx: cx,
      ry: cy,
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      // dot: 빠르게 따라감
      state.x += (state.tx - state.x) * 0.35;
      state.y += (state.ty - state.y) * 0.35;

      // ring: 느리게 따라오는 트레일 느낌
      state.rx += (state.tx - state.rx) * 0.12;
      state.ry += (state.ty - state.ry) * 0.12;

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

    // hover targets: a, button, [data-cursor="hover"]
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const hit = el.closest("a,button,[data-cursor='hover']");
      if (!hit) return;

      // ring 확대 + 테두리 강조
      const ring = ringRef.current;
      if (!ring) return;

      ring.style.setProperty("transform", "translate(-50%, -50%) scale(1.35)");
      ring.style.setProperty("border-color", "rgba(255,255,255,.35)");
    };

    const onOut = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const hit = el.closest("a,button,[data-cursor='hover']");
      if (!hit) return;

      const ring = ringRef.current;
      if (!ring) return;

      ring.style.setProperty("transform", "translate(-50%, -50%) scale(1)");
      ring.style.setProperty("border-color", "rgba(255,255,255,.18)");
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      cancelAnimationFrame(raf);
    };
  }, [state]);

  return (
    <div className="cursorWrap" aria-hidden="true">
      <div ref={ringRef} className="cursorRing" />
      <div ref={dotRef} className="cursorDot" />
    </div>
  );
}
