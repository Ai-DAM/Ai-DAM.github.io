import { useEffect, useRef, useState } from "react";

type Pt = { x: number; y: number; z?: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// mediapipe connectors can be {start,end} (most common) or tuple [a,b] (custom)
type MPConnection = { start: number; end: number } | [number, number];

function normConn(c: MPConnection): { start: number; end: number } {
  if (Array.isArray(c)) return { start: c[0], end: c[1] };
  return c;
}

type StrokeOpts = {
  shadowColor?: string;
  shadowBlur?: number;
  alpha?: number;
};

function strokeConnectors(
  ctx: CanvasRenderingContext2D,
  ptsPx: Array<{ x: number; y: number }>,
  connectors: MPConnection[] | undefined,
  lineWidth: number,
  strokeStyle: string | CanvasGradient,
  opts: StrokeOpts = {}
) {
  if (!connectors || !ptsPx?.length) return;

  ctx.save();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(0.5, lineWidth);
  ctx.strokeStyle = strokeStyle;
  ctx.globalAlpha = opts.alpha ?? 1;

  ctx.shadowColor = opts.shadowColor ?? "transparent";
  ctx.shadowBlur = opts.shadowBlur ?? 0;

  ctx.beginPath();
  for (const c of connectors) {
    const { start, end } = normConn(c);
    const a = ptsPx[start];
    const b = ptsPx[end];
    if (!a || !b) continue;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  ctx.stroke();

  ctx.restore();
}

function drawNeonFaceOverlay(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  groups: {
    FACE_OVAL: MPConnection[];
    LIPS: MPConnection[];
    LEFT_EYE: MPConnection[];
    RIGHT_EYE: MPConnection[];
    LEFT_EYEBROW: MPConnection[];
    RIGHT_EYEBROW: MPConnection[];
  }
) {
  // bbox
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  if (!isFinite(minX)) return;

  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);

  // ✅ "그리는 것만" 흰색
  const white = "rgba(255,255,255,0.95)";

  // adaptive thickness
  const base = clamp(Math.min(w, h) * 0.012, 1.2, 4.5);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  // 1) outer glow pass (white)
  strokeConnectors(ctx, pts, groups.FACE_OVAL, base * 2.2, white, {
    shadowColor: "rgba(255,255,255,0.55)",
    shadowBlur: 26,
    alpha: 0.55,
  });
  strokeConnectors(ctx, pts, groups.LIPS, base * 1.7, white, {
    shadowColor: "rgba(255,255,255,0.50)",
    shadowBlur: 22,
    alpha: 0.50,
  });
  strokeConnectors(ctx, pts, groups.LEFT_EYE, base * 1.6, white, {
    shadowColor: "rgba(255,255,255,0.48)",
    shadowBlur: 20,
    alpha: 0.50,
  });
  strokeConnectors(ctx, pts, groups.RIGHT_EYE, base * 1.6, white, {
    shadowColor: "rgba(255,255,255,0.48)",
    shadowBlur: 20,
    alpha: 0.50,
  });
  strokeConnectors(ctx, pts, groups.LEFT_EYEBROW, base * 1.5, white, {
    shadowColor: "rgba(255,255,255,0.42)",
    shadowBlur: 18,
    alpha: 0.45,
  });
  strokeConnectors(ctx, pts, groups.RIGHT_EYEBROW, base * 1.5, white, {
    shadowColor: "rgba(255,255,255,0.42)",
    shadowBlur: 18,
    alpha: 0.45,
  });

  // 2) crisp core pass (white, sharper)
  strokeConnectors(ctx, pts, groups.FACE_OVAL, base * 1.15, white, {
    shadowColor: "rgba(255,255,255,0.18)",
    shadowBlur: 10,
    alpha: 0.90,
  });
  strokeConnectors(ctx, pts, groups.LIPS, base * 1.0, white, {
    shadowColor: "rgba(255,255,255,0.14)",
    shadowBlur: 8,
    alpha: 0.82,
  });
  strokeConnectors(ctx, pts, groups.LEFT_EYE, base * 0.95, white, {
    shadowColor: "rgba(255,255,255,0.14)",
    shadowBlur: 8,
    alpha: 0.82,
  });
  strokeConnectors(ctx, pts, groups.RIGHT_EYE, base * 0.95, white, {
    shadowColor: "rgba(255,255,255,0.14)",
    shadowBlur: 8,
    alpha: 0.82,
  });

  // 3) sprinkle dots (white)
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.shadowColor = "rgba(255,255,255,0.55)";
  ctx.shadowBlur = 14;
  const step = 10; // 부담되면 14~18로
  for (let i = 0; i < pts.length; i += step) {
    const p = pts[i];
    const r = base * 0.45;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.restore();
}

export default function FaceNeonOverlayDemo({ open }: { open: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<any>(null);

  const smoothRef = useRef<Pt[] | null>(null);
  const groupsRef = useRef<null | {
    FACE_OVAL: MPConnection[];
    LIPS: MPConnection[];
    LEFT_EYE: MPConnection[];
    RIGHT_EYE: MPConnection[];
    LEFT_EYEBROW: MPConnection[];
    RIGHT_EYEBROW: MPConnection[];
  }>(null);

  const [status, setStatus] = useState<string>("준비 중…");
  const [err, setErr] = useState<string | null>(null);

  function cleanup() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    try {
      landmarkerRef.current?.close?.();
    } catch {}
    landmarkerRef.current = null;

    smoothRef.current = null;
    setStatus("중지됨");
  }

  useEffect(() => {
    if (!open) {
      cleanup();
      setErr(null);
      return;
    }

    let cancelled = false;

    async function start() {
      setErr(null);
      setStatus("Mediapipe 로딩 중…");

      const visionMod = await import("@mediapipe/tasks-vision");
      const { FaceLandmarker, FilesetResolver } = visionMod;

      // ✅ wasm base URL 후보 (404/strict MIME 회피용)
      const wasmCandidates = [
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        "https://unpkg.com/@mediapipe/tasks-vision@latest/wasm",
      ];

      let vision: any = null;
      let usedBase = "";
      let lastErr: any = null;

      for (const basePath of wasmCandidates) {
        try {
          vision = await FilesetResolver.forVisionTasks(basePath);
          usedBase = basePath;
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      if (!vision) throw lastErr ?? new Error("WASM fileset 로딩 실패");

      setStatus(`모델 준비 중… (wasm: ${usedBase.includes("jsdelivr") ? "jsdelivr" : "unpkg"})`);

      const modelAssetPath =
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

      let landmarker: any = null;

      // GPU delegate 실패할 수 있어서 fallback
      try {
        landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath, delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1,
        });
      } catch {
        landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath, delegate: "CPU" },
          runningMode: "VIDEO",
          numFaces: 1,
        });
      }

      if (cancelled) {
        try {
          landmarker.close?.();
        } catch {}
        return;
      }

      landmarkerRef.current = landmarker;

      // ✅ connectors groups 저장 (Connection[] 형태)
      groupsRef.current = {
        FACE_OVAL: FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
        LIPS: FaceLandmarker.FACE_LANDMARKS_LIPS,
        LEFT_EYE: FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
        RIGHT_EYE: FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
        LEFT_EYEBROW: FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
        RIGHT_EYEBROW: FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
      };

      setStatus("카메라 권한 요청 중…");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;

      const video = videoRef.current!;
      video.srcObject = stream;
      video.playsInline = true;
      await video.play();

      setStatus("실행 중 (얼굴을 화면 중앙에 두면 흰색 네온 오버레이가 뜸)");

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d", { alpha: true })!;
      const t0 = performance.now();

      const loop = () => {
        if (cancelled) return;

        // canvas = css size
        const cw = Math.max(1, Math.floor(canvas.clientWidth));
        const ch = Math.max(1, Math.floor(canvas.clientHeight));
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width = cw;
          canvas.height = ch;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // detection
        let pts: Pt[] | null = null;
        try {
          // 비디오 준비 전이면 skip
          if (video.readyState >= 2) {
            const res = landmarker.detectForVideo(video, performance.now());
            const lm = res?.faceLandmarks?.[0];
            if (lm && lm.length) {
              pts = lm.map((p: any) => ({
                x: p.x * canvas.width,
                y: p.y * canvas.height,
                z: p.z,
              }));
            }
          }
        } catch {
          // ignore per-frame
        }

        // fallback idle (얼굴 못잡아도 "살아있게")
        const tt = (performance.now() - t0) / 1000;
        const breath = Math.sin(tt * 1.2) * 0.015;

        if (pts && groupsRef.current) {
          // smoothing (EMA)
          const prev = smoothRef.current;
          if (!prev || prev.length !== pts.length) {
            smoothRef.current = pts;
          } else {
            const a = 0.32; // smoothing strength
            for (let i = 0; i < pts.length; i++) {
              prev[i].x = lerp(prev[i].x, pts[i].x, a);
              prev[i].y = lerp(prev[i].y, pts[i].y, a);
              prev[i].z = pts[i].z;
            }
            smoothRef.current = prev;
          }

          drawNeonFaceOverlay(ctx, smoothRef.current!, groupsRef.current);
        } else {
          // subtle center pulse (white)
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = "rgba(255,255,255,0.10)";
          ctx.shadowColor = "rgba(255,255,255,0.30)";
          ctx.shadowBlur = 26;
          const r = clamp(canvas.height * 0.06, 18, 42) * (1 + breath);
          ctx.beginPath();
          ctx.arc(canvas.width * 0.5, canvas.height * 0.5, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    }

    start().catch((e: any) => {
      console.error(e);
      setErr(e?.message ?? "데모 실행 중 오류");
      setStatus("오류");
      cleanup();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="demoWrap">
      <div className="demoStage">
        <video ref={videoRef} className="demoVideo" muted />
        <canvas ref={canvasRef} className="demoCanvas" />
      </div>

      <div className="demoMeta">
        <div className="demoStatus">
          <span className="demoDot" aria-hidden /> {status}
        </div>
        {err && <div className="demoErr">⚠ {err}</div>}
        <div className="demoHint">
          * 영상은 서버로 전송되지 않고, 브라우저 로컬에서만 처리됩니다. (모델/wasm은 최초 1회 다운로드)
        </div>
      </div>
    </div>
  );
}
