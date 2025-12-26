import { motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import { PARTNERS, TEAM } from "./data";

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
  return (
    <>
      <CustomCursor />

      <header className="topbar">
        <div className="wrap topInner">
          <a className="brand" href="#home" onClick={(e) => (e.preventDefault(), scrollTo("home"))}>
            <span className="brandMark" />
            <span className="brandName">ADAM</span>
          </a>

          <nav className="nav">
            <a href="#service" onClick={(e) => (e.preventDefault(), scrollTo("service"))}>서비스소개</a>
            <a href="#company" onClick={(e) => (e.preventDefault(), scrollTo("company"))}>회사소개</a>
            <a href="#team" onClick={(e) => (e.preventDefault(), scrollTo("team"))}>팀소개</a>
            <a href="#partners" onClick={(e) => (e.preventDefault(), scrollTo("partners"))}>협력사</a>
            <a className="btn btnSm" href="#contact" onClick={(e) => (e.preventDefault(), scrollTo("contact"))}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="home">
        {/* HERO */}
        <section className="hero">
          <div className="heroBG" />
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="badge">
                <span className="badgeDot" />
                <span>AI-DAM.ai · Smart Mirror Platform</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="heroTitle">
                Where dance becomes <span className="glowText">measurable</span>.
              </motion.h1>

              <motion.p variants={fadeUp} className="heroDesc">
                ADAM은 댄서의 연습 루프를 혁신하는 AI 스마트미러 플랫폼입니다.
                촬영–오버레이–피드백–반복을 하나의 경험으로 묶고,
                스튜디오부터 브랜드 팝업까지 확장 가능한 인터랙티브 미디어로 진화합니다.
              </motion.p>

              <motion.div variants={fadeUp} className="heroCTA">
                <a className="btn" href="#contact" onClick={(e) => (e.preventDefault(), scrollTo("contact"))}>
                  데모 요청하기
                </a>
                <a className="btn btnGhost" href="#service" onClick={(e) => (e.preventDefault(), scrollTo("service"))}>
                  서비스 한눈에 보기
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="kpiRow">
                <div className="kpi">
                  <div className="kpiK">Real-time</div>
                  <div className="kpiV">Pose / Motion</div>
                </div>
                <div className="kpi">
                  <div className="kpiK">Deployment</div>
                  <div className="kpiV">Studio · Pop-up</div>
                </div>
                <div className="kpi">
                  <div className="kpiK">Experience</div>
                  <div className="kpiV">Neon UI · Interactive</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 서비스소개 */}
        <section id="service" className="section">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                서비스소개 <span className="glowText">ADAM</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                연습의 “반복”을 더 빠르고, 더 정확하고, 더 재밌게.
                댄서가 혼자서도 퀄리티를 끌어올릴 수 있는 피드백 루프를 제공합니다.
              </motion.p>

              <motion.div variants={stagger} className="grid3">
                {[
                  { t: "Overlay Training", d: "미러 기반 오버레이/타이밍 가이드/반복 루프." },
                  { t: "AI Feedback", d: "자세 추정 기반의 정량 피드백과 개선 포인트." },
                  { t: "Event Mode", d: "팝업용 인터랙션(제스처/QR/프레임) 제공." },
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
            </motion.div>
          </div>
        </section>

        {/* 회사소개 */}
        <section id="company" className="section sectionAlt">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="h2">
                회사소개
              </motion.h2>
              <motion.p variants={fadeUp} className="p">
                우리는 “댄서가 스스로 성장하는 환경”을 만든다.  
                하드웨어(키오스크/미러)와 소프트웨어(AI/콘텐츠/UX)를 하나의 제품으로 설계해,
                설치형 경험을 플랫폼으로 확장합니다.
              </motion.p>

              <motion.div variants={stagger} className="grid2">
                {[
                  { t: "Mission", d: "댄스 연습 경험을 데이터와 몰입형 UI로 재정의한다." },
                  { t: "Why now", d: "UGC/댄스 콘텐츠 폭증 + 오프라인 경험의 프리미엄화." },
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
            </motion.div>
          </div>
        </section>

        {/* 팀소개 */}
        <section id="team" className="section">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="h2">팀소개</motion.h2>
              <motion.p variants={fadeUp} className="p">
                “제품을 끝까지 만드는 사람들” 중심으로 구성됩니다.
              </motion.p>

              <motion.div variants={stagger} className="grid3">
                {TEAM.map((m) => (
                  <motion.article
                    key={m.name}
                    variants={fadeUp}
                    className="card"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    data-cursor="hover"
                  >
                    <div className="cardInner">
                      <h3 className="cardTitle">{m.name}</h3>
                      <p className="cardText" style={{ marginBottom: 10 }}>{m.role}</p>
                      <p className="cardText">{m.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 협력사 */}
        <section id="partners" className="section sectionAlt">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="h2">협력사</motion.h2>
              <motion.p variants={fadeUp} className="p">
                스튜디오/행사/브랜드 파트너와 함께 설치형 경험을 확장합니다.
              </motion.p>

              <motion.div variants={stagger} className="grid3">
                {PARTNERS.map((p) => (
                  <motion.div
                    key={p}
                    variants={fadeUp}
                    className="partnerLogo"
                    whileHover={{ scale: 1.02 }}
                    data-cursor="hover"
                  >
                    {p}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="wrap">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="h2">Contact</motion.h2>
              <motion.p variants={fadeUp} className="p">
                데모/협업/설치 문의는 아래로 바로 연락 주세요.
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
                  onClick={(e) => (e.preventDefault(), scrollTo("home"))}
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
            <span style={{ opacity: 0.8 }}>AI Dance Assistance Mirror</span>
          </div>
        </footer>
      </main>
    </>
  );
}
