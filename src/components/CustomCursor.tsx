import { useEffect, useMemo, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const state = useMemo(() => {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      rx: window.innerWidth / 2,
      ry: window.innerHeight / 2,
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
    };

    const onLeave = () => {
      // 화면 밖 나가면 살짝 숨김 느낌 주고 싶으면 여기서 opacity 조절 가능
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      // dot: 빠르게 따라감
      state.x += (state.tx - state.x) * 0.35;
      state.y += (state.ty - state.y) * 0.35;

      // ring: 더 느리게 따라오는 트레일 느낌
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
      const isHover = el.closest("a,button,[data-cursor='hover']");
      if (isHover) {
        ringRef.current?.style.setProperty("transform", "translate(-50%, -50%) scale(1.35)");
        ringRef.current?.style.setProperty("border-color", "rgba(255,255,255,.35)");
      }
    };
    const onOut = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const wasHover = el.closest("a,button,[data-cursor='hover']");
      if (wasHover) {
        ringRef.current?.style.setProperty("transform", "translate(-50%, -50%) scale(1)");
        ringRef.current?.style.setProperty("border-color", "rgba(255,255,255,.18)");
      }
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
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
