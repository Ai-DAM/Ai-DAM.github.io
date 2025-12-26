import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import BackgroundFX from "./components/BackgroundFX";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const TEAM = [
    {
      name: "김준현",
      role: "CEO",
      img: "/images/members/joonhyun.png",
      one: "한양대 로봇공학 학사·인공지능융합 석사, AI 동작의도 인식 연구와 트레이너/백댄서 등 현장 댄스 경험을 잇는 컬쳐×테크 CEO",
    },
    {
      name: "구다서",
      role: "CMO",
      img: "/images/members/daseo.png",
      one: "매출 0원에서 연매출 50–60억 규모로 성장시킨 그로스 경험과 디자인·콘텐츠 감각을 겸비한 CMO",
    },
    {
      name: "김성봉",
      role: "CBO",
      img: "/images/members/sungbong.png",
      one: "한양대 ERICA 제40대 총학생회장 출신, 요식업 창업(연매출 8억) 경험을 바탕으로 현장 운영·세일즈를 리드하는 CBO",
    },
    {
      name: "이영문",
      role: "CSO",
      img: "/images/members/youngmoon.png",
      one: "미시간주립대 컴퓨터공학 석·박사, 한양대 로봇공학과 교수로 AI/로보틱스 연구를 총괄하는 CSO",
    },
  ] as const;

  type TeamMember = (typeof TEAM)[number];
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  const nav = [
    { id: "Platform", label: "Platform" },
    { id: "Service", label: "Service" },
    { id: "company", label: "About" },
    { id: "team", label: "Team" },
  ];

  const SOLUTIONS = [
    {
      name: "K-Me",
      tag: "Dance Training",
      title: "댄서의 연습 루프를 ‘측정 가능한 경험’으로",
      desc:
        "스마트미러 기반 오버레이 트레이닝 + AI 피드백으로 촬영–비교–수정–반복을 한 번에. " +
        "스튜디오 설치형 제품으로 운영/확장에 최적화됩니다.",
    },
    {
      name: "ADAM Live",
      tag: "Events & Pop-ups",
      title: "관객이 반응하면 콘텐츠가 즉시 반응하는 무대",
      desc:
        "대학 입학식, 브랜드 팝업, 아이돌 행사에서 ‘인사/제스처/포즈’ 같은 행동을 실시간으로 인식해 " +
        "영상/그래픽/사운드를 반응시키는 인터랙티브 미디어 경험을 제공합니다.",
    },
  ] as const;

  const PLATFORM = [
    { t: "Sense", d: "Camera 기반으로 사람의 포즈/제스처/행동을 안정적으로 캡처." },
    { t: "Interpret", d: "AI가 의미를 해석(인사, 포즈, 타이밍, 상태)하여 트리거를 만든다." },
    { t: "Respond", d: "디스플레이/미디어/이펙트가 즉시 반응하여 ‘살아있는 경험’을 만든다." },
    { t: "Distribute", d: "QR/저장/공유로 UGC 루프를 만들고, 다음 방문을 유도한다." },
    { t: "Operate", d: "현장 설치/부팅/권한/네트워크 등 운영 안정성을 제품 수준으로 만든다." },
    { t: "Scale", d: "콘텐츠/파트너/공간으로 확장되는 설치형 플랫폼으로 성장한다." },
  ];

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
  ];

  // ESC로 닫기 + body 스크롤 잠금
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMember(null);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    if (menuOpen || !!activeMember) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev || "";
    };
  }, [menuOpen, activeMember]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

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
            <span className="brandMark" />
            <span className="brandName">ADAM</span>
          </a>

          <nav className="nav">
            {/* Desktop links */}
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

            {/* Desktop CTA */}
            <a
              className="btn btnSm navCTA"
              href="#contact"
              onClick={(e) => (e.preventDefault(), go("contact"))}
              data-cursor="hover"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="hamburgerBtn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              data-cursor="hover"
            >
              <span className="hamburgerIcon" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobileNavOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.div
              className="mobileNavPanel"
              initial={{ x: 18, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="mobileNavHeader">
                <div className="mobileNavBrand">
                  <span className="brandMark" />
                  <span className="brandName">ADAM</span>
                </div>

                <button
                  type="button"
                  className="mobileNavClose"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  data-cursor="hover"
                >
                  ×
                </button>
              </div>

              <div className="mobileNavLinks">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className="mobileNavLink"
                    onClick={() => go(n.id)}
                    data-cursor="hover"
                  >
                    {n.label}
                  </button>
                ))}
              </div>

              <div className="mobileNavFooter">
                <button
                  type="button"
                  className="btn mobileNavCTA"
                  onClick={() => go("contact")}
                  data-cursor="hover"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="home">
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.h1 variants={fadeUp} className="heroTitle heroTitleStack">
                <span className="heroTitleTop glowText">Real-time interactive experiences,</span>
                <span className="heroTitleBottom glowText glowTextSoft">for real spaces.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="heroDesc">
                ADAM은 오프라인 공간에서 사람과 콘텐츠가 실시간으로 상호작용하는
                “설치형 인터랙티브 경험”을 만듭니다.
                <br />
              </motion.p>

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

              <motion.div variants={fadeUp} className="pillRow" style={{ marginTop: 18 }}>
                <span className="pill">K-Me · Dance Training</span>
                <span className="pill">ADAM Live · Events & Pop-ups</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Platform */}
        <section id="Platform" className="section sectionAlt">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                플랫폼 <span className="glowText">ADAM</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                제품은 달라도 코어는 하나입니다. “사람의 행동을 감지 → 해석 → 미디어로 반응 → 공유로 확장”
                하는 실시간 경험 파이프라인을 제공합니다.
              </motion.p>

              <motion.div variants={stagger} className="grid3">
                {PLATFORM.map((x) => (
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
            </motion.div>
          </div>
        </section>

        {/* Service */}
        <section id="Service" className="section">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
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

        {/* About + Traction */}
        <section id="company" className="section">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                회사소개
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                ADAM은 “오프라인 공간에서의 인터랙션”을 제품 수준으로 만드는 팀입니다.
                하드웨어(스마트 디스플레이/키오스크)와 소프트웨어(AI/콘텐츠/UX)를 하나의 경험으로 설계하고,
                설치형 경험을 반복 가능한 패키지로 상품화합니다.
              </motion.p>

              <motion.div variants={stagger} className="grid2">
                {[
                  {
                    t: "What we sell",
                    d: "설치형 AI 인터랙티브 경험(제품/패키지) — 스튜디오용, 행사/팝업용.",
                  },
                  {
                    t: "How we win",
                    d: "현장 안정성 + 즉시 반응하는 UX + 공유(UGC) 루프까지 한 번에 제공.",
                  },
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
                <motion.h3
                  variants={fadeUp}
                  className="h2"
                  style={{ fontSize: "clamp(18px, 2.2vw, 22px)", marginBottom: 8 }}
                >
                  Traction
                </motion.h3>
                <motion.p variants={fadeUp} className="p" style={{ marginBottom: 14 }}>
                  ADAM의 traction은 “플랫폼이 제품으로 굴러가며 지표가 나오는 것”입니다.
                  댄스(K-Me)와 행사(ADAM Live) 트랙을 분리해 증명합니다.
                </motion.p>

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

        {/* Team */}
        <section id="team" className="section sectionAlt">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                팀소개
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                “제품을 끝까지 만들고, 현장에서 굴려서 증명하는 사람들” 중심으로 구성됩니다.
              </motion.p>

              <motion.div variants={stagger} className="teamGrid4">
                {TEAM.map((m) => (
                  <motion.button
                    key={m.name}
                    type="button"
                    variants={fadeUp}
                    className="teamTile"
                    whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    onClick={() => setActiveMember(m)}
                    data-cursor="hover"
                  >
                    <div className="teamTileImg">
                      <img className="teamTilePhoto" src={m.img} alt={m.name} loading="lazy" />
                    </div>
                    <div className="teamTileMeta">
                      <div className="teamTileName">{m.name}</div>
                      <div className="teamTileRole">{m.role}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team modal */}
        <AnimatePresence>
          {activeMember && (
            <motion.div
              className="modalOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setActiveMember(null);
              }}
            >
              <motion.div
                className="modalDialog"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <button
                  className="modalClose"
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveMember(null)}
                  data-cursor="hover"
                >
                  ×
                </button>

                <div className="modalBody">
                  <div className="modalImg">
                    <img className="modalPhoto" src={activeMember.img} alt={activeMember.name} />
                  </div>

                  <div className="modalInfo">
                    <div className="modalTitleRow">
                      <div className="modalName">{activeMember.name}</div>
                      <span className="modalRolePill">{activeMember.role}</span>
                    </div>
                    <p className="modalDesc">{activeMember.one}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact */}
        <section id="contact" className="section sectionAlt">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                Contact
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                데모/협업/설치/행사 운영 문의는 아래로 연락 주세요.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  className="btn"
                  href="mailto:contact@ai-dam.ai?subject=ADAM%20Demo%20Request"
                  data-cursor="hover"
                >
                  contact@ai-dam.ai
                </a>
                <a
                  className="btn btnGhost"
                  href="#home"
                  onClick={(e) => (e.preventDefault(), go("home"))}
                  data-cursor="hover"
                >
                  Back to top
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footerInner">
            <span>© {new Date().getFullYear()} ADAM. All rights reserved.</span>
            <span style={{ opacity: 0.8 }}>Interactive AI Experience Platform</span>
          </div>
        </footer>
      </main>
    </>
  );
}
