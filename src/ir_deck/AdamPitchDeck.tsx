import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Cpu,
  Video,
  Globe,
  Users,
  Zap,
  BarChart3,
  Radio,
  Layers,
  Box,
  CheckCircle2,
} from "lucide-react";

// ---------- Components ----------

const SlideContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`ir-w-full ir-h-full ir-rel ir-overflow-hidden ir-bg ir-text-white ir-flex ir-col ir-p-12 ${className}`}
    style={{ fontFamily: "'Rajdhani', 'Pretendard', sans-serif" }}
  >
    <div className="ir-blob violet" />
    <div className="ir-blob cyan" />
    <div className="ir-noise" />
    {children}
  </div>
);

const SlideHeader = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <div className="ir-mb-8 ir-border-b ir-rel" style={{ paddingBottom: 16 }}>
    <h2 className="ir-text-4xl ir-bold ir-uppercase ir-grad-title">{title}</h2>
    {subTitle && (
      <p className="ir-text-cyan ir-text-sm ir-semibold" style={{ letterSpacing: "0.2em", marginTop: 4 }}>
        {subTitle}
      </p>
    )}
    <div
      className="ir-abs"
      style={{
        bottom: -1,
        left: 0,
        width: 96,
        height: 2,
        background: "var(--cyan)",
        boxShadow: "0 0 10px rgba(34,211,238,0.8)",
      }}
    />
  </div>
);

const FooterNote = ({ children }: { children: React.ReactNode }) => (
  <div
    className="ir-abs ir-text-10 ir-text-gray-500 ir-border-t ir-pt-2 ir-flex ir-between ir-mono"
    style={{ bottom: 32, left: 48, right: 48 }}
  >
    <div className="ir-flex ir-gap-4">{children}</div>
    <div style={{ opacity: 0.5 }}>CONFIDENTIAL - ADAM IR 2025</div>
  </div>
);

const Card = ({
  title,
  children,
  glowColor = "cyan",
}: {
  title?: string;
  children: React.ReactNode;
  glowColor?: "cyan" | "purple" | "pink";
}) => (
  <div className={`ir-bg-white-5 ir-border ir-rounded-2xl ir-p-6 ir-backdrop ir-card ${glowColor}`}>
    {title && <h3 className="ir-text-xl ir-bold ir-mb-3 ir-text-white">{title}</h3>}
    <div className="ir-text-gray-300 ir-text-sm" style={{ lineHeight: 1.6 }}>
      {children}
    </div>
  </div>
);

// ---------- Slides ----------

const Slide1_Cover = () => (
  <SlideContainer className="ir-center">
    <div style={{ zIndex: 10, maxWidth: 896 }}>
      <div className="ir-flex ir-gap-4 ir-mb-6" style={{ alignItems: "center" }}>
        <div
          className="ir-flex ir-center ir-rounded-xl"
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, var(--cyan), var(--violet))",
            boxShadow: "0 0 30px rgba(34,211,238,0.4)",
          }}
        >

        </div>
        <div className="ir-line" style={{ width: 80 }} />
      </div>

      <h1 className="ir-text-4xl ir-bold ir-leading-tight ir-mb-4">
        ADAM은 <span className="ir-text-cyan">'오프라인 공간에서의 인터랙션'</span>을
        <br />
        <span className="ir-text-violet">제품화</span>하는 AI 테크 스타트업입니다.
      </h1>

      <p
        className="ir-text-xl ir-text-gray-400 ir-light"
        style={{
          letterSpacing: "0.06em",
          borderLeft: "4px solid var(--pink)",
          paddingLeft: 24,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        Real-time interactive experiences for real spaces.
      </p>
    </div>

    <div
      className="ir-abs ir-pulse"
      style={{
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 400,
        height: 400,
        border: "1px solid rgba(34,211,238,0.20)",
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ width: 300, height: 300, border: "1px solid rgba(124,58,237,0.20)", borderRadius: 999 }} />
    </div>
  </SlideContainer>
);

const Slide2_Background = () => (
  <SlideContainer>
    <SlideHeader title="Mediatization of Spaces" subTitle="MARKET BACKGROUND" />

    <div className="ir-flex ir-gap-12" style={{ flex: 1, alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <h3 className="ir-text-3xl ir-bold ir-leading-snug">
          오프라인 공간
          <br />
          (팝업/상업공간/이벤트)은
          <br />
          빠르게 <span className="ir-text-cyan ir-underline-cyan">‘미디어화’가 진행되고 있습니다.</span>
        </h3>
      </div>

      <div className="ir-divider-v" />

      <div style={{ flex: 1 }}>
        <div
          className="ir-rounded-2xl ir-overflow-hidden ir-rel"
          style={{
            padding: 32,
            border: "1px solid rgba(124,58,237,0.30)",
            background: "linear-gradient(135deg, rgba(76,29,149,0.20), transparent)",
          }}
        >
          <div
            className="ir-abs"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, var(--violet), var(--pink))",
            }}
          />
          <p className="ir-text-xl ir-text-gray-200 ir-light">
            "그리고, 인터랙티브 경험의 수요와 효과는
            <br />
            다양한 사례에서 반복 검증되고 있습니다."
          </p>
          <div className="ir-mt-6 ir-flex ir-gap-2">
            <span className="ir-chip">#BrandExperience</span>
            <span className="ir-chip">#UserEngagement</span>
          </div>
        </div>
      </div>
    </div>

    <FooterNote>
      <span>* 브랜드 경험/참여/전환 지표 중심의 리포트/사례 다수 (IAB, Pop-up Trend Report 2024)</span>
    </FooterNote>
  </SlideContainer>
);

const Slide3_Problem = () => (
  <SlideContainer>
    <SlideHeader title="But, Productizing Interactive Experience is Hard" subTitle="기존 방식의 한계점" />


    <div className="ir-flex ir-gap-8 ir-rel" style={{ flex: 1 }}>
      <div
        style={{
          flex: 1,
          paddingRight: 32,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 className="ir-text-2xl ir-bold ir-text-gray-300 ir-mb-">Custom Media Art based</h3>
        <ul style={{ display: "grid", gap: 16, color: "rgba(255,255,255,0.65)" }}>
          <li className="ir-flex ir-gap-3" style={{ justifyContent: "flex-end", alignItems: "center" }}>
            <span>SI / Agency 방식 (인건비↑)</span> <Layers size={18} className="ir-text-red" />
          </li>
          <li className="ir-flex ir-gap-3" style={{ justifyContent: "flex-end", alignItems: "center" }}>
            <span>높은 초기 비용</span> <BarChart3 size={18} className="ir-text-red" />
          </li>
          <li className="ir-flex ir-gap-3" style={{ justifyContent: "flex-end", alignItems: "center" }}>
            <span>설치/운영/유지보수 난이도 High</span> <Cpu size={18} className="ir-text-red" />
          </li>
          <li className="ir-flex ir-gap-3" style={{ justifyContent: "flex-end", alignItems: "center" }}>
            <span>1회성 (재사용/재판매 불가)</span> <Box size={18} className="ir-text-red" />
          </li>
        </ul>
      </div>

      <div
        className="ir-abs"
        style={{
          left: "50%",
          top: 40,
          bottom: 40,
          width: 1,
          background: "rgba(255,255,255,0.10)",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="ir-mono ir-text-sm ir-bold"
          style={{
            alignSelf: "center",
            padding: "10px 10px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.20)",
            background: "var(--bg)",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.2em",
          }}
        >
          VS
        </div>
      </div>

      <div style={{ flex: 1, paddingLeft: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 className="ir-text-2xl ir-bold ir-text-gray-300 ir-mb-6">Simple Display based</h3>
        <ul style={{ display: "grid", gap: 16, color: "rgba(255,255,255,0.65)" }}>
          <li className="ir-flex ir-gap-3" style={{ alignItems: "center" }}>
            <Video size={18} className="ir-text-yellow" /> <span>단순 영상 재생 (One-way)</span>
          </li>
          <li className="ir-flex ir-gap-3" style={{ alignItems: "center" }}>
            <Radio size={18} className="ir-text-yellow" /> <span>낮은 몰입감 (No Interaction)</span>
          </li>
          <li className="ir-flex ir-gap-3" style={{ alignItems: "center" }}>
            <Users size={18} className="ir-text-yellow" /> <span>고객 데이터 확보 불가</span>
          </li>
          <li className="ir-flex ir-gap-3" style={{ alignItems: "center" }}>
            <Box size={18} className="ir-text-yellow" /> <span>쓸 수 있는 기획 제한적</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="ir-text-sm ir-text-gray-500" style={{ textAlign: "center", marginTop: 24 }}>
      "몰입(가치)과 운영/가격(확장성)을 동시에 만족시키는 ‘제품’의 부재"
    </div>
  </SlideContainer>
);


const Slide4_Solution = () => (
  <SlideContainer>
    <div className="ir-flex ir-between ir-end ir-mb-8 ir-border-b" style={{ paddingBottom: 16 }}>
      <div>
        <h2 className="ir-text-4xl ir-bold ir-text-white ir-mb-2">
          Interactive Experience as a <span className="ir-text-cyan">Product</span>
        </h2>
        <p className="ir-text-sm ir-text-gray-400">기획–개발–설치–운영을 하나의 패키지(HW+SW+Content)로 표준화했습니다</p>
      </div>
    </div>

    <div className="ir-grid-3" style={{ height: "100%", paddingBottom: 48 }}>
      <Card title="1. Smart Mirror H/W" glowColor="cyan">
        <ul style={{ display: "grid", gap: 12 }}>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} className="ir-text-cyan" style={{ marginTop: 2 }} />
            <span>시선을 붙잡는 스마트미러 디스플레이 키트</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} className="ir-text-cyan" style={{ marginTop: 2 }} />
            <span>이동이 쉽고 설치및 운영이 간편</span>
          </li>
        </ul>
        <div className="ir-mt-4 ir-text-10 ir-text-gray-500" style={{ background: "rgba(0,0,0,0.30)", padding: 8, borderRadius: 10 }}>
          * Self-face advantage: 사람들은 자신의 얼굴이 반사된 거울을 더 오래 주시 하는 경향이 있습니다. (Keyes, 2014)
        </div>
      </Card>

      <Card title="2. Vision-AI S/W" glowColor="purple">
        <ul style={{ display: "grid", gap: 12 }}>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "#a78bfa" }} />
            <span>AI 기반 포즈 / 제스쳐 / 얼굴 인식</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "#a78bfa" }} />
            <span>현장 변수(조명/거리/혼잡)에 강한 자체 AI 모델 보유</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "#a78bfa" }} />
            <span>24시간 실시간 반응을 저지연으로 처리</span>
          </li>
        </ul>
      </Card>

      <Card title="3. Contents" glowColor="pink">
        <ul style={{ display: "grid", gap: 12 }}>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "var(--pink)" }} />
            <span>K-콘텐츠 기반 참여형 경험 기획</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "var(--pink)" }} />
            <span>행동 → 즉시 반응 (영상/그래픽/사운드)</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "var(--pink)" }} />
            <span>UGC 생성 → QR 코드로 모바일 전환</span>
          </li>
          <li className="ir-flex ir-gap-2" style={{ alignItems: "flex-start" }}>
            <CheckCircle2 size={16} style={{ marginTop: 2, color: "var(--pink)" }} />
            <span>생성형 AI 기반 콘텐츠 자동 생성</span>
          </li>
        </ul>
      </Card>
    </div>

    <FooterNote>
      <span>* Keyes, H. (2014) “The self-face advantage in visual attention.”</span>
    </FooterNote>
  </SlideContainer>
);

const Slide5_Market = () => (
  <SlideContainer>
    <SlideHeader title="진입 시장: K-Content Popup" subTitle="BUSINESS STRATEGY" />

    <div className="ir-flex ir-col" style={{ height: "100%", gap: 32 }}>
      <div className="ir-flex ir-gap-4">
        <div style={{ width: "40%", paddingRight: 24, borderRight: "1px solid rgba(255,255,255,0.10)" }}>
          <h3 className="ir-text-xl ir-bold ir-text-pink ir-mb-4">Why Now?</h3>
          <ul className="ir-text-sm ir-text-gray-300" style={{ display: "grid", gap: 12 }}>
            <li>• 글로벌 팬덤 기반의 K-콘텐츠 시장</li>
            <li>• 바이럴에 효과적인 '댄스 콘텐츠'</li>
            <li>• 모든 댄스공간에 있고, 하루중 댄서가 가장 오래 주시하는 오브제, '거울'</li>
          </ul>
        </div>

        <div style={{ flex: 1, paddingLeft: 24 }}>
          <div className="ir-grid-2">
            <div className="ir-kpi">
              <div className="ir-text-3xl ir-bold ir-text-white ir-mb-2">High</div>
              <div className="ir-text-xs ir-text-gray-400">Engagement</div>
            </div>
            <div className="ir-kpi">
              <div className="ir-text-3xl ir-bold ir-text-white ir-mb-2">Viral</div>
              <div className="ir-text-xs ir-text-gray-400">Social Share</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "auto", marginBottom: 48, display: "grid", gap: 16 }}>
        <div
          className="ir-flex"
          style={{
            alignItems: "center",
            padding: 24,
            borderLeft: "4px solid var(--cyan)",
            borderRadius: "0 16px 16px 0",
            background: "linear-gradient(90deg, #111827, #000)",
          }}
        >
          <div className="ir-text-cyan ir-bold" style={{ width: 96 }}>
            STEP 1
          </div>
          <div>
            <div className="ir-text-lg ir-bold ir-text-white">K-Me: 댄스 스튜디오 설치형 (Cashcow/Wedge)</div>
            <div className="ir-text-sm ir-text-gray-400">국내 2500개가 넘는 댄스연습실에서 반복 사용 · 높은 리텐션 · K-Dance 콘텐츠 지속 확보</div>
          </div>
        </div>

        <div
          className="ir-flex"
          style={{
            alignItems: "center",
            padding: 24,
            borderLeft: "4px solid var(--violet)",
            borderRadius: "0 16px 16px 0",
            background: "linear-gradient(90deg, #111827, #000)",
          }}
        >
          <div className="ir-bold" style={{ width: 96, color: "#a78bfa" }}>
            STEP 2
          </div>
          <div>
            <div className="ir-text-lg ir-bold ir-text-white">ADAM Live: 팝업/이벤트 패키지 (Scale-up)</div>
            <div className="ir-text-sm ir-text-gray-400">팬덤 경험 · 참여율 데이터 · QR 전환 성과 측정</div>
          </div>
        </div>
      </div>
    </div>

    <FooterNote>
      <span>* 국내 팝업 트렌드/소비자 관심 조사 (Trend Monitor)</span>
    </FooterNote>
  </SlideContainer>
);

const Slide6_Traction = () => (
  <SlideContainer>
    <SlideHeader title="Current Traction" subTitle="PROGRESS" />

    <div style={{ display: "grid", gap: 24, marginTop: 16 }}>
      <div
        className="ir-rel ir-overflow-hidden ir-rounded-2xl ir-border"
        style={{ background: "rgba(17,24,39,0.50)", borderColor: "rgba(8,145,178,0.35)", padding: 32 }}
      >
        <div className="ir-abs" style={{ top: 0, left: 0, width: 8, height: "100%", background: "var(--cyan)" }} />
        <div className="ir-flex ir-between" style={{ alignItems: "flex-start" }}>
          <div>
            <h3 className="ir-text-2xl ir-bold ir-text-cyan ir-mb-2">
              K-Me <span className="ir-text-sm ir-text-gray-500 ir-light" style={{ marginLeft: 8 }}>
                / Dance Training (Wedge)
              </span>
            </h3>
            <p className="ir-text-lg ir-text-white" style={{ marginTop: 16 }}>
              원밀리언 (1Million), 전북 콘텐츠 진흥원{" "}
              <span
                className="ir-text-xs"
                style={{
                  marginLeft: 8,
                  border: "1px solid rgba(34,211,238,0.30)",
                  color: "rgba(34,211,238,0.9)",
                  padding: "2px 8px",
                  borderRadius: 8,
                }}
              >
                협의/검증 중
              </span>
            </p>
          </div>
          <Zap size={48} style={{ color: "var(--cyan)", opacity: 0.25 }} />
        </div>
      </div>

      <div
        className="ir-rel ir-overflow-hidden ir-rounded-2xl ir-border"
        style={{ background: "rgba(17,24,39,0.50)", borderColor: "rgba(124,58,237,0.35)", padding: 32 }}
      >
        <div className="ir-abs" style={{ top: 0, left: 0, width: 8, height: "100%", background: "var(--violet)" }} />
        <div className="ir-flex ir-between" style={{ alignItems: "flex-start" }}>
          <div>
            <h3 className="ir-text-2xl ir-bold" style={{ color: "#a78bfa" }}>
              ADAM Live{" "}
              <span className="ir-text-sm ir-text-gray-500 ir-light" style={{ marginLeft: 8 }}>
                / Event & Retail (Scale)
              </span>
            </h3>
            <p className="ir-text-lg ir-text-white" style={{ marginTop: 16 }}>
              asdf 전자담배 행사, House Train 하우스 행사, 레드브릭 DJ 파티
            </p>
            <div className="ir-text-sm ir-text-gray-400 ir-flex ir-gap-2" style={{ alignItems: "center", marginTop: 16 }}>
              <BarChart3 size={16} /> PoC 설치/운영 횟수, 참여율, QR 전환 등 핵심 KPI 측정 설계 완료
            </div>
          </div>
          <Globe size={48} style={{ color: "var(--violet)", opacity: 0.25 }} />
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide7_Competition = () => (
  <SlideContainer>
    <SlideHeader title="Why ADAM Wins" subTitle="COMPETITIVE LANDSCAPE" />

    <div style={{ width: "100%", marginTop: 16 }}>
      <div
        className="ir-text-sm ir-bold ir-text-gray-500 ir-uppercase"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1.2fr",
          gap: 16,
          textAlign: "center",
          paddingBottom: 16,
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div style={{ textAlign: "left", paddingLeft: 16 }}>Criteria</div>
        <div>미디어아트 SI</div>
        <div>단순 사이니지</div>
        <div className="ir-text-cyan">ADAM (Product)</div>
      </div>

      {[
        { criteria: "비용 / 설치", si: "고가 / 2주+", display: "저가 / 즉시", adam: "합리적 / 즉시 (패키지)" },
        { criteria: "몰입감 (UX)", si: "상 (But 일회성)", display: "하 (단순 시청)", adam: "상 (반응형/참여형)" },
        { criteria: "운영 난이도", si: "전문가 필요", display: "쉬움", adam: "쉬움 (AI 자동화)" },
        { criteria: "데이터 확보", si: "확인 불가", display: "단순 노출수", adam: "행동/참여 정밀 분석" },
      ].map((row, idx) => (
        <div
          key={idx}
          className="ir-row-hover"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1.2fr",
            gap: 16,
            padding: "18px 0",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="ir-bold ir-text-gray-300" style={{ textAlign: "left", paddingLeft: 16 }}>
            {row.criteria}
          </div>
          <div className="ir-text-gray-500">{row.si}</div>
          <div className="ir-text-gray-500">{row.display}</div>
          <div style={{ paddingRight: 16 }}>
            <div className="ir-highlight-cell">{row.adam}</div>
          </div>
        </div>
      ))}
    </div>

    <FooterNote>
      <span>* 데이터/운영 자동화가 '제품화(Productization)'의 핵심 경쟁력입니다.</span>
    </FooterNote>
  </SlideContainer>
);

const Slide8_Team = () => (
  <SlideContainer>
    <SlideHeader title="The Team" subTitle="EXPERTS" />

    <div className="ir-rel" style={{ height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 48 }}>
      <div className="ir-arch-bg" />

      <div className="ir-grid-4" style={{ width: "100%", zIndex: 10 }}>
        {[
          { name: "김준현", role: "CEO", desc: "HRI 기반 모션/제스처 인식 연구 + 현장 댄스 경험" },
          { name: "구다서", role: "CMO", desc: "그로스 / 디자인 / 콘텐츠 기획" },
          { name: "김성봉", role: "CBO", desc: "현장 운영 / 세일즈 / 파트너십" },
          { name: "이영문", role: "Advisor", desc: "AI / 로보틱스 연구 및 자문" },
        ].map((m, idx) => (
          <div
            key={idx}
            className="ir-bg-white-5 ir-border ir-rounded-2xl ir-p-6 ir-backdrop"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform .25s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)")}
          >
            <div
              className="ir-rounded-full"
              style={{
                width: 96,
                height: 96,
                marginBottom: 16,
                border: "2px solid rgba(255,255,255,0.20)",
                overflow: "hidden",
                position: "relative",
                background: "#1f2937",
              }}
            >
              <div
                className="ir-abs"
                style={{
                  inset: 0,
                  background: "linear-gradient(135deg, #374151, #111827)",
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                {m.name[0]}
              </div>
            </div>
            <h3 className="ir-text-xl ir-bold ir-text-white">{m.name}</h3>
            <div className="ir-text-cyan ir-text-sm ir-semibold" style={{ marginBottom: 12 }}>
              {m.role}
            </div>
            <p className="ir-text-xs ir-text-gray-400" style={{ lineHeight: 1.5 }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </SlideContainer>
);

const Slide9_Closing = () => (
  <SlideContainer className="ir-center" >
    <div style={{ zIndex: 10, textAlign: "center" }}>
      <h2 className="ir-text-5xl ir-bold" style={{ letterSpacing: "-0.01em" }}>
        Let’s{" "}
        <span
          style={{
            background: "linear-gradient(90deg, var(--cyan), #a78bfa, var(--pink))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          animate
        </span>{" "}
        the real world together.
      </h2>

      <div style={{ height: 1, width: 128, background: "#374151", margin: "24px auto" }} />

      <h3 className="ir-text-3xl ir-bold ir-text-white">감사합니다</h3>

      <div className="ir-text-gray-400 ir-mt-8" style={{ display: "grid", gap: 8, justifyItems: "center" }}>
        <div className="ir-flex ir-gap-2" style={{ alignItems: "center" }}>
          <Globe size={16} /> ai-dam.ai/ir_deck/
        </div>
        <div className="ir-flex ir-gap-2" style={{ alignItems: "center" }}>
          <Layers size={16} /> k-me@ai-dam.ai
        </div>
      </div>

      <div
        className="ir-text-sm ir-text-gray-500 ir-border ir-rounded-full"
        style={{ display: "inline-block", padding: "10px 18px", marginTop: 40, borderColor: "rgba(255,255,255,0.10)" }}
      >
        PoC / 파트너십 / 투자 파트너를 찾고 있습니다.
      </div>
    </div>
  </SlideContainer>
);

// ---------- Main App ----------

const AdamPitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    Slide1_Cover,
    Slide2_Background,
    Slide3_Problem,
    Slide4_Solution,
    Slide5_Market,
    Slide6_Traction,
    Slide7_Competition,
    Slide8_Team,
    Slide9_Closing,
  ];

  const nextSlide = () => setCurrentSlide((p) => Math.min(p + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const isTyping = ["input", "textarea", "button"].includes(tag);
      if (!isTyping && (e.key === "ArrowRight" || e.key === " ")) nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const Current = slides[currentSlide];

  return (
    <div className="ir-min-h-screen ir-bg-black ir-text-white ir-flex ir-col ir-center" style={{ padding: 24 }}>
      <div className="ir-stage ir-shadow-2xl">
        <Current />

        <div className="ir-controls">
          <button
            className="ir-btn ir-btn-circle ir-bg-white-10 ir-backdrop ir-hover-white20"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Prev"
          >
            <ArrowLeft size={20} />
          </button>

          <div
            className="ir-bg-black-50 ir-backdrop ir-rounded-full ir-mono ir-text-sm ir-border"
            style={{ padding: "12px 16px", minWidth: 88, textAlign: "center" }}
          >
            {currentSlide + 1} / {slides.length}
          </div>

          <button
            className="ir-btn ir-btn-circle ir-backdrop ir-ring-cyan ir-hover-cyan40"
            style={{ background: "rgba(34,211,238,0.20)" }}
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            aria-label="Next"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="ir-mt-4 ir-text-gray-500 ir-text-xs ir-mono ir-flex ir-gap-2 ir-center">
        <Maximize2 size={12} />
        <span>Use Arrow Keys to Navigate</span>
        <span style={{ opacity: 0.6 }}>|</span>
        <span>Adam Interactive Reality Pitch Deck 2025</span>

      </div>
    </div>
  );
};

export default AdamPitchDeck;
