import { useEffect, useMemo, useRef } from "react";

type CursorPoint = {
  x: number;
  y: number;
};

type SurfaceTone = "light" | "dark";

const CURSOR_STORAGE_KEY = "custom-cursor-last-point";

let lastCursorPoint: CursorPoint | null = null;

function parseRgbChannel(value: string) {
  return Number.parseFloat(value.trim());
}

function resolveSurfaceColor(element: HTMLElement | null): string | null {
  let current: HTMLElement | null = element;

  while (current) {
    const backgroundColor = window.getComputedStyle(current).backgroundColor;

    if (backgroundColor.startsWith("rgb")) {
      const channels = backgroundColor.slice(backgroundColor.indexOf("(") + 1, backgroundColor.lastIndexOf(")")).split(",");

      if (channels.length >= 3) {
        const alpha = channels[3] === undefined ? 1 : parseRgbChannel(channels[3]);

        if (alpha > 0.08) {
          return backgroundColor;
        }
      }
    }

    current = current.parentElement;
  }

  return window.getComputedStyle(document.body).backgroundColor;
}

function resolveSurfaceTone(element: HTMLElement | null): SurfaceTone {
  const backgroundColor = resolveSurfaceColor(element);

  if (!backgroundColor) {
    return "dark";
  }

  const channels = backgroundColor
    .slice(backgroundColor.indexOf("(") + 1, backgroundColor.lastIndexOf(")"))
    .split(",")
    .slice(0, 3)
    .map(parseRgbChannel);

  if (channels.length !== 3 || channels.some(Number.isNaN)) {
    return "dark";
  }

  const [red, green, blue] = channels;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance > 0.68 ? "light" : "dark";
}

function readStoredCursorPoint(): CursorPoint | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(CURSOR_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<CursorPoint>;

    if (typeof parsedValue.x !== "number" || typeof parsedValue.y !== "number") {
      return null;
    }

    return { x: parsedValue.x, y: parsedValue.y };
  } catch {
    return null;
  }
}

function storeCursorPoint(point: CursorPoint) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(CURSOR_STORAGE_KEY, JSON.stringify(point));
  } catch {
    // ignore storage failures
  }
}

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
  const surfaceToneRef = useRef<SurfaceTone>("dark");
  const surfaceDirtyRef = useRef(true);

  const state = useMemo(() => {
    const initialPoint = lastCursorPoint ?? readStoredCursorPoint() ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    return {
      x: initialPoint.x,
      y: initialPoint.y,
      tx: initialPoint.x,
      ty: initialPoint.y,
      rx: initialPoint.x,
      ry: initialPoint.y,
    };
  }, []);

  useEffect(() => {
    let zoomTimer: ReturnType<typeof window.setTimeout> | undefined;

    const setZooming = (value: boolean) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      wrap.classList.toggle("isZooming", value);
    };

    const handleZoomGesture = () => {
      setZooming(true);

      if (zoomTimer !== undefined) {
        window.clearTimeout(zoomTimer);
      }

      zoomTimer = window.setTimeout(() => {
        setZooming(false);
      }, 180);
    };

    const applyRingScale = () => {
      const ring = ringRef.current;
      if (!ring) return;

      const hovered = hoveredRef.current;
      const pressed = pressedRef.current;

      // hover/press 조합 스케일(겹치지 않게 깔끔하게)
      const s = hovered ? (pressed ? 1.20 : 1.35) : (pressed ? 0.92 : 1.0);
      ring.style.setProperty("transform", `translate(-50%, -50%) scale(${s})`);
      ring.style.setProperty("border-color", hovered ? "var(--cursor-ring-border-hover)" : "var(--cursor-ring-border)");
    };

    const syncSurfaceTone = () => {
      if (!surfaceDirtyRef.current) {
        return;
      }

      const wrap = wrapRef.current;

      if (!wrap) {
        return;
      }

      const hitElement = document.elementFromPoint(state.tx, state.ty);
      const tone = resolveSurfaceTone(hitElement instanceof HTMLElement ? hitElement : null);

      if (surfaceToneRef.current !== tone) {
        surfaceToneRef.current = tone;
        wrap.classList.toggle("isOnLightSurface", tone === "light");
        applyRingScale();
      }

      surfaceDirtyRef.current = false;
    };

    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      lastCursorPoint = { x: e.clientX, y: e.clientY };
      storeCursorPoint(lastCursorPoint);
      surfaceDirtyRef.current = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      // ✅ dot: 더 “바짝” 따라오게 (0.35 → 0.6)
      state.x += (state.tx - state.x) * 0.60;
      state.y += (state.ty - state.y) * 0.60;

      // ring: 조금 더 빠릿하게 따라오되 트레일은 유지
      state.rx += (state.tx - state.rx) * 0.22;
      state.ry += (state.ty - state.ry) * 0.22;

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

      syncSurfaceTone();

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

    const onDragStart = (e: DragEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const dragSource = el.closest("a,img,svg,[draggable='true']");
      if (!dragSource) return;

      e.preventDefault();
    };

    const onWheel = (event: WheelEvent) => {
      surfaceDirtyRef.current = true;

      if (event.ctrlKey) {
        handleZoomGesture();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      if (["+", "=", "-", "0"].includes(event.key)) {
        handleZoomGesture();
      }
    };

    const onViewportChange = () => {
      surfaceDirtyRef.current = true;
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    document.addEventListener("dragstart", onDragStart, true);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    // ✅ 클릭 펄스 (기본 커서 대신 우리 링이 반응)
    let clickTimer: ReturnType<typeof window.setTimeout> | undefined;
    const onDown = () => {
      pressedRef.current = true;
      applyRingScale();

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.classList.remove("isClick"); // 재트리거용
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        wrap.offsetWidth; // reflow
        wrap.classList.add("isClick");
        if (clickTimer !== undefined) {
          window.clearTimeout(clickTimer);
        }
        clickTimer = window.setTimeout(() => wrap.classList.remove("isClick"), 450);
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
      document.removeEventListener("dragstart", onDragStart, true);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
      cancelAnimationFrame(raf);
      setZooming(false);
      if (clickTimer !== undefined) {
        window.clearTimeout(clickTimer);
      }
      if (zoomTimer !== undefined) {
        window.clearTimeout(zoomTimer);
      }
    };
  }, [state]);

  return (
    <div ref={wrapRef} className="cursorWrap" aria-hidden="true">
      <div ref={ringRef} className="cursorRing" />
      <div ref={dotRef} className="cursorDot" />
    </div>
  );
}
