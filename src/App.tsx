import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import BackgroundFX from "./components/BackgroundFX";
import FaceNeonOverlayDemo from "./components/FaceNeonDemo";
import HeroWormBorder from "./components/HeroWormBorder";
import ContactForm from "./components/ContactForm";



const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function App() {
  // ✅ Team data
  const TEAM = [
    {
      name: "김준현",
      role: "CEO",
      img: "/images/members/joonhyun.png",
      one: "",
    },
    {
      name: "구다서",
      role: "CMO",
      img: "/images/members/daseo.png",
      one: "",
    },
    {
      name: "김성봉",
      role: "CBO",
      img: "/images/members/sungbong.png",
      one: "",
    },
    {
      name: "이영문",
      role: "Advisor",
      img: "/images/members/youngmoon.png",
      one: "",
    },
  ] as const;

  // ✅ nav
  const nav = [
    { id: "Platform", label: "Platform" },
    { id: "Service", label: "Service" },
    { id: "company", label: "About" },
    { id: "team", label: "Team" },
  ] as const;

  const SOLUTIONS = [
    {
      name: "K-Me",
      tag: "Dance Training",
      title: "스마트미러로 AI 댄스 트레이닝 서비스",
      desc:
        "스마트미러 기반 트레이닝 + AI 피드백으로 촬영–비교–수정–반복을 한 번에. " +
        "스튜디오 설치형 제품으로 운영/확장에 최적화됩니다.",
    },
    {
      name: "ADAM Live",
      tag: "Events & Pop-ups",
      title: "실시간 인터랙티브 이벤트/팝업 패키지",
      desc:
        "대학 입학식, 브랜드 팝업, 아이돌 행사에서 ‘인사/제스처/포즈’ 같은 행동을 실시간으로 인식해 " +
        "영상/그래픽/사운드를 반응시키는 인터랙티브 미디어 경험을 제공합니다.",
    },
  ] as const;

  // ✅ Platform group (3 + 3)
  const PLATFORM_A = [
    { t: "Sense", d: "Capture" },
    { t: "Interpret", d: "AI-based Recognition" },
    { t: "Respond", d: "Real-time Media" },
  ] as const;

  const PLATFORM_B = [
    { t: "Distribute", d: "QR/저장/공유 UGC" },
    { t: "Operate", d: "Remote Management" },
    { t: "Sales", d: "Analytics & Metrics" },
  ] as const;

  const TRACTION = [
    {
      head: "K-Me (Dance)",
      items: [
        { k: "Pilot", v: "스튜디오 설치형 PoC 운영/검증" },
        { k: "Iteration", v: "댄서 피드백 기반 UX/하드웨어 고도화" },
        { k: "Content", v: "연습 루프를 콘텐츠/데이터로 확장" },
      ],
    },
    {
      head: "ADAM Live (Events)",
      items: [
        { k: "Use-cases", v: "입학식/팝업/브랜드 행사 시나리오 구체화" },
        { k: "Event Kit", v: "현장 설치+운영 패키지 단위로 상품화" },
        { k: "Engagement", v: "참여율/촬영/QR 전환 지표로 성과 측정" },
      ],
    },
  ] as const;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<(typeof TEAM)[number] | null>(null);

  // ✅ Demo modal
  const [demoOpen, setDemoOpen] = useState(false);



  function go(id: string) {
    setMenuOpen(false);
    scrollTo(id);
  }

  // ESC 닫기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveMember(null);
        setDemoOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <CustomCursor />
      <BackgroundFX />

      <header className="topbar">
        <div className="wrap topInner">
          <a
            className="brand"
            href="#home"
            onClick={(e) => (e.preventDefault(), go("home"))}
            data-cursor="hover"
          >
            <img className="brandIcon" src="/icon.png" alt="ADAM" draggable={false} />
            <span className="brandName">ADAM</span>
          </a>

          <nav className="nav">
            <div className="navLinks">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => (e.preventDefault(), go(n.id))}
                  data-cursor="hover"
                >
                  {n.label}
                </a>
              ))}
            </div>

            <a
              className="btn btnSm navCTA"
              href="#contact"
              onClick={(e) => (e.preventDefault(), go("contact"))}
              data-cursor="hover"
            >
              Contact
            </a>

            <button
              className="navBurger"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor="hover"
            >
              <span className="burgerLines" aria-hidden />
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navDrawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                className="navDrawerPanel"
                initial={{ y: -10, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -10, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {nav.map((n) => (
                  <button key={n.id} className="navDrawerItem" type="button" onClick={() => go(n.id)}>
                    {n.label}
                  </button>
                ))}
                <button className="navDrawerCTA" type="button" onClick={() => go("contact")}>
                  Contact
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home">
        {/* HERO */}
        <section className="hero">
          <div className="wrap heroWrap">
            <div className="heroBgArt" aria-hidden>
              <img className="heroBgImg" src="/images/product_home_banner.png" alt="" draggable={false} />
            </div>

            <motion.div variants={stagger} initial="hidden" animate="show" className="heroCopy">
              <motion.div variants={fadeUp} className="heroTitleWorm">
                <HeroWormBorder pad={10} radius={25} duration={7.2}>
                  <h1 className="heroTitle heroTitleStack">
                    <span className="heroTitleTop glowText heroGlow">Real-time interactive experiences,</span>
                    <span className="heroTitleBottom glowText glowTextSoft heroGlowSoft">for real spaces.</span>
                  </h1>
                </HeroWormBorder>
              </motion.div>


              {/* ✅ 버튼 아래 줄바꿈 + 타이핑 */}
              <motion.p variants={fadeUp} className="heroDesc heroDescType">
                <span className="typewrite">
                  ADAM은 “오프라인 공간에서의 인터랙션”을 제품화하는 AI 테크 스타트업입니다.
                </span>
              </motion.p>


              {/* ✅ CTA 먼저 */}
              <motion.div variants={fadeUp} className="heroCTA">
                <a
                  className="btn"
                  href="#contact"
                  onClick={(e) => (e.preventDefault(), go("contact"))}
                  data-cursor="hover"
                >
                  데모 / 협업 문의
                </a>
                <a
                  className="btn btnGhost"
                  href="#Service"
                  onClick={(e) => (e.preventDefault(), go("Service"))}
                  data-cursor="hover"
                >
                  제품 라인업 보기
                </a>
              </motion.div>

            </motion.div>
          </div>
        </section>


        

        {/* Platform */}
        <section id="Platform" className="section sectionAlt">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.h2 variants={fadeUp} className="h2 h2Underline">
                <span className="glowText">ADAM Platform</span>
              </motion.h2>

              <motion.div variants={stagger} className="grid2">
                {/* group A */}
                <motion.article variants={fadeUp} className="card" data-cursor="hover">
                  <div className="cardInner">
                    <div className="platformHeadRow">
                      <h3 className="cardTitle" style={{ marginBottom: 0 }}>
                        Sense · Interpret · Respond
                      </h3>

                      <button className="miniBtn" type="button" onClick={() => setDemoOpen(true)}>
                        Interactive with
                      </button>
                    </div>

                    <div className="miniList" style={{ marginTop: 12 }}>
                      {PLATFORM_A.map((it) => (
                        <div key={it.t} className="miniItem">
                          <span className="miniDot" />
                          <span>
                            <b style={{ color: "var(--text)" }}>{it.t}:</b>{" "}
                            <span style={{ color: "var(--muted)" }}>{it.d}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>

                {/* group B */}
                <motion.article variants={fadeUp} className="card" data-cursor="hover">
                  <div className="cardInner">
                    <h3 className="cardTitle" style={{ marginBottom: 0 }}>
                      Distribute · Operate · Sales
                    </h3>

                    <div className="miniList" style={{ marginTop: 12 }}>
                      {PLATFORM_B.map((it) => (
                        <div key={it.t} className="miniItem">
                          <span className="miniDot" />
                          <span>
                            <b style={{ color: "var(--text)" }}>{it.t}:</b>{" "}
                            <span style={{ color: "var(--muted)" }}>{it.d}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Service */}
        <section id="Service" className="section">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.h2 variants={fadeUp} className="h2 h2Underline">
                <span className="glowText">Service Line-Up</span>
              </motion.h2>

              <motion.div variants={stagger} className="grid2">
                {SOLUTIONS.map((s) => (
                  <motion.article
                    key={s.name}
                    variants={fadeUp}
                    className="card"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    data-cursor="hover"
                  >
                    <div className="cardInner">
                      <div className="cardMetaRow">
                        <span className="chip">{s.tag}</span>
                      </div>

                      <h3 className="cardTitle" style={{ fontSize: "clamp(18px, 1.9vw, 20px)" }}>
                        <span className="glowText" style={{ textShadow: "none" }}>
                          {s.name}
                        </span>
                      </h3>

                      <p className="cardText" style={{ marginBottom: 10 }}>
                        <b style={{ color: "var(--text)" }}>{s.title}</b>
                      </p>
                      <p className="cardText">{s.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="company" className="section">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.h2 variants={fadeUp} className="h2 h2Underline">
                회사소개
              </motion.h2>

              {/* 나중에 추가하고싶으면 추가하기 */}
              <motion.p variants={fadeUp} className="p">
              </motion.p>


              <motion.div variants={stagger} className="grid2">
                {[
                  { t: "What we sell", d: "설치형 AI 인터랙티브 경험(제품/패키지) — 스튜디오용, 행사/팝업용." },
                  { t: "How we win", d: "현장 안정성 + 즉시 반응하는 UX + 공유(UGC) 루프까지 한 번에 제공." },
                ].map((x) => (
                  <motion.article
                    key={x.t}
                    variants={fadeUp}
                    className="card"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    data-cursor="hover"
                  >
                    <div className="cardInner">
                      <h3 className="cardTitle">{x.t}</h3>
                      <p className="cardText">{x.d}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              <motion.div variants={stagger} style={{ marginTop: 26 }}>
                <motion.h3 variants={fadeUp} className="h2" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginBottom: 8 }}>
                  Traction
                </motion.h3>

                <motion.div variants={stagger} className="grid2">
                  {TRACTION.map((t) => (
                    <motion.article
                      key={t.head}
                      variants={fadeUp}
                      className="card"
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      data-cursor="hover"
                    >
                      <div className="cardInner">
                        <h3 className="cardTitle">{t.head}</h3>
                        <div className="miniList" style={{ marginTop: 10 }}>
                          {t.items.map((it) => (
                            <div key={it.k} className="miniItem">
                              <span className="miniDot" />
                              <span>
                                <b style={{ color: "var(--text)" }}>{it.k}:</b>{" "}
                                <span style={{ color: "var(--muted)" }}>{it.v}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team strip */}
        <section id="team" className="section sectionAlt">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.h2 variants={fadeUp} className="h2 h2Underline">
                팀소개
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                Team ADAM을 소개합니다
              </motion.p>

              <motion.div variants={fadeUp} className="teamStrip">
                {TEAM.map((m) => (
                  <button key={m.name} type="button" className="teamTile" onClick={() => setActiveMember(m)} data-cursor="hover">
                    <div className="teamTileImgWrap" aria-hidden>
                      <img className="teamTileImg" src={m.img} alt="" loading="lazy" />
                    </div>
                    <div className="teamTileMeta">
                      <div className="teamTileName">{m.name}</div>
                      <div className="teamTileRole">{m.role}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team modal */}
        <AnimatePresence>
          {activeMember && (
            <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMember(null)}>
              <motion.div
                className="modal"
                initial={{ y: 10, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modalClose" type="button" onClick={() => setActiveMember(null)} aria-label="Close">
                  ×
                </button>

                <div className="modalBody">
                  <div className="modalImgWrap" aria-hidden>
                    <img className="modalImg" src={activeMember.img} alt="" />
                  </div>

                  <div className="modalText">
                    <div className="modalTitleRow">
                      <div className="modalName">{activeMember.name}</div>
                      <span className="modalRolePill">{activeMember.role}</span>
                    </div>
                    <p className="modalOne">{activeMember.one}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Demo modal */}
        <AnimatePresence>
          {demoOpen && (
            <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDemoOpen(false)}>
              <motion.div
                className="modal demoModal"
                initial={{ y: 10, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modalClose" type="button" onClick={() => setDemoOpen(false)} aria-label="Close">
                  ×
                </button>

                <div className="demoHeader">
                  <div className="demoTitle">Sense / Interpret / Respond — Camera Demo</div>
                  <div className="demoSub">FaceLandmarker 기반 네온 얼굴 오버레이</div>
                </div>

                <FaceNeonOverlayDemo open={demoOpen} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>





        {/* Contact */}
        <section id="contact" className="section sectionAlt">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.h2 variants={fadeUp} className="h2 h2Underline">
                Contact
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                데모/협업/설치/행사 운영 문의
              </motion.p>

              {/* ✅ 단일 카드(문의하기만) */}
              <motion.div variants={fadeUp} className="contactGrid contactGridSolo">
                <div className="contactCard" data-cursor="hover">
                  <div className="cardInner">
                    <ContactForm />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>




        <footer className="footer">
          <div className="wrap footerInner">
            <span>© {new Date().getFullYear()} ADAM. All rights reserved.</span>

            <div className="footerInfo">
              <span className="footerCompany">아담</span>
              <span className="footerSep">·</span>
              <span>사업자등록번호: 343-04-03348</span>
              <span className="footerSep">·</span>
              <a className="footerLink" href="mailto:ceo@ai-dam.ai">
                k-me@ai-dam.ai
              </a>
            </div>
          </div>
        </footer>




      </main>
    </>
  );
}
