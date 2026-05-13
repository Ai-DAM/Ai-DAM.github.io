import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundFX from "./components/BackgroundFX";
import HeroWormBorder from "./components/HeroWormBorder";
import ContactForm from "./components/ContactForm";
import PlatformOrbit from "./components/PlatformOrbit";
import StickyInquiryBar from "./components/StickyInquiryBar";

const motionEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: motionEase } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

type ProductKind = "K-me Dance" | "K-me VisionAI";

type ServiceCard = {
  name: string;
  mode: string;
  title: string;
  description: string;
  points: string[];
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryExternal?: boolean;
};

type CaseStudy = {
  id: string;
  category: ProductKind;
  title: string;
  tag: string;
  description: string;
  image: string;
};

const nav = [
  { id: "home", label: "Home" },
  { id: "Platform", label: "Platform" },
  { id: "Service", label: "Service" },
  { id: "Cases", label: "Cases" },
  { id: "contact", label: "Contact" },
] as const;

const services: ServiceCard[] = [
  {
    name: "K-me Dance",
    mode: "설치형",
    title: "스마트미러로 즐기는 AI 댄스 서비스",
    description: "스마트폰 대신 스마트미러 대화면으로 더 편하게 연습하는 댄스 서비스입니다.",
    points: ["대화면으로 더 편하게", "좌우반전 · 속도조절", "앞뒤 이동으로 빠른 반복 연습"],
    primaryLabel: "도입 문의하기",
    primaryHref: "#contact",
    secondaryLabel: "플랫폼 보기",
    secondaryHref: "#Platform",
  },
  {
    name: "K-me VisionAI",
    mode: "행사형",
    title: "행사 안내를 더 스마트하게 만드는 모션인식 스마트미러",
    description: "정보안내와 참여형 인터랙션을 함께 제공해 참여율과 체류시간을 높입니다.",
    points: ["스마트 정보안내", "모션인식 인터랙션", "체류시간 · 참여율 상승"],
    primaryLabel: "VisionAI 상세 보기",
    primaryHref: "https://ai-dam.ai/visionai",
    primaryExternal: true,
    secondaryLabel: "도입 문의하기",
    secondaryHref: "#contact",
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: "visionai-jeonbuk",
    category: "K-me VisionAI",
    title: "전북콘텐츠진흥원",
    tag: "Public Activation",
    description: "공공기관 체험형 부스 사례",
    image: encodeURI("/visionai/도입사례/전북콘텐츠진흥원.png"),
  },
  {
    id: "visionai-1million",
    category: "K-me VisionAI",
    title: "원밀리언",
    tag: "Experience Booth",
    description: "이벤트형 체험 부스 사례",
    image: encodeURI("/visionai/도입사례/원밀리언.png"),
  },
  {
    id: "visionai-hanyang",
    category: "K-me VisionAI",
    title: "한양대",
    tag: "Campus Event",
    description: "대학 행사 도입 사례",
    image: encodeURI("/visionai/도입사례/한양대.png"),
  },
  {
    id: "visionai-sookmyung",
    category: "K-me VisionAI",
    title: "숙대",
    tag: "Ceremony Interaction",
    description: "캠퍼스 행사 운영 사례",
    image: encodeURI("/visionai/도입사례/숙대.png"),
  },
  {
    id: "visionai-house-train",
    category: "K-me VisionAI",
    title: "하우스트레인",
    tag: "Branded Space",
    description: "브랜드 공간 운영 사례",
    image: encodeURI("/visionai/도입사례/하우스트레인.png"),
  },
  {
    id: "dance-seravi",
    category: "K-me Dance",
    title: "세라비스페이스",
    tag: "Studio Install",
    description: "상설 트레이닝 공간 설치 사례",
    image: encodeURI("/dance/도입사례/세라비스페이스.png"),
  },
  {
    id: "dance-nouveau-hongdae",
    category: "K-me Dance",
    title: "누보홍대",
    tag: "Dance Practice",
    description: "연습실 도입 사례",
    image: encodeURI("/dance/도입사례/누보홍대.png"),
  },
  {
    id: "dance-nouveau-nonhyeon",
    category: "K-me Dance",
    title: "누보논현",
    tag: "Repeat Training",
    description: "설치형 운영 사례",
    image: encodeURI("/dance/도입사례/누보논현.png"),
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const topbar = document.querySelector(".topbar");
  const topbarHeight = topbar instanceof HTMLElement ? topbar.offsetHeight : 0;
  const top = window.scrollY + el.getBoundingClientRect().top - topbarHeight - 18;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [useHeroWorm, setUseHeroWorm] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)").matches
      : false
  );

  function go(id: string) {
    setMenuOpen(false);
    scrollTo(id);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)");
    const onChange = () => setUseHeroWorm(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  const danceCases = caseStudies.filter((caseStudy) => caseStudy.category === "K-me Dance");
  const visionAiCases = caseStudies.filter((caseStudy) => caseStudy.category === "K-me VisionAI");

  return (
    <>
      <BackgroundFX />

      <header className="topbar">
        <div className="wrap topInner">
          <button
            className="brand brandButton"
            type="button"
            onClick={() => {
              go("home");
            }}
            data-cursor="hover"
          >
            <img className="brandIcon" src="/icon.png" alt="K-me" draggable={false} />
            <span className="brandName">K-me</span>
          </button>

          <nav className="nav">
            <div className="navLinks">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  data-cursor="hover"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              className="btn btnSm navCTA"
              type="button"
              onClick={() => {
                go("contact");
              }}
              data-cursor="hover"
            >
              도입 문의
            </button>

            <button
              className="navBurger"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
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
                transition={{ duration: 0.18, ease: motionEase }}
                onClick={(e) => e.stopPropagation()}
              >
                {nav.map((item) => (
                  <button key={item.id} className="navDrawerItem" type="button" onClick={() => go(item.id)}>
                    {item.label}
                  </button>
                ))}
                <button className="navDrawerCTA" type="button" onClick={() => go("contact")}>
                  도입 문의
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home" className="siteMain">
        <section className="hero">
          <div className="wrap heroWrap">
            <div className="heroBgArt" aria-hidden>
              <img className="heroBgImg" src="/images/product_home_banner.png" alt="" draggable={false} />
            </div>

            <motion.div variants={stagger} initial="hidden" animate="show" className="heroCopy">
              <motion.div variants={fadeUp} className={useHeroWorm ? "heroTitleWorm" : undefined}>
                {useHeroWorm ? (
                  <HeroWormBorder pad={10} radius={25} duration={7.2}>
                    <h1 className="heroTitle heroTitleStack">
                      <span className="heroTitleTop glowText heroGlow">Real-time interactive experiences,</span>
                      <span className="heroTitleBottom glowText glowTextSoft heroGlowSoft">for real spaces.</span>
                    </h1>
                  </HeroWormBorder>
                ) : (
                  <h1 className="heroTitle heroTitleStack">
                    <span className="heroTitleTop glowText heroGlow">Real-time interactive experiences,</span>
                    <span className="heroTitleBottom glowText glowTextSoft heroGlowSoft">for real spaces.</span>
                  </h1>
                )}
              </motion.div>

              <motion.p variants={fadeUp} className="heroDesc heroLead">
                K-me는 오프라인 공간에 설치되어 사람을 인식하고 바로 반응하는 스마트미러 플랫폼입니다.
              </motion.p>

              <motion.div variants={fadeUp} className="heroCTA">
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    go("contact");
                  }}
                  data-cursor="hover"
                >
                  도입 문의하기
                </button>
                <button
                  className="btn btnGhost"
                  type="button"
                  onClick={() => {
                    go("Service");
                  }}
                  data-cursor="hover"
                >
                  서비스 보기
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="heroPills">
                <span className="pill">K-me Dance</span>
                <span className="pill">K-me VisionAI</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="Platform" className="section sectionAlt">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={fadeUp} className="sectionHead sectionHeadWide">
                <h2 className="h2 h2Underline">
                  <span className="sectionTitleTone">공간이 반응하는 플랫폼</span>
                </h2>
              </motion.div>

              <motion.div variants={fadeUp}>
                <PlatformOrbit />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="Service" className="section">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.div variants={fadeUp} className="sectionHead sectionHeadWide">
                <h2 className="h2 h2Underline">
                  <span className="sectionTitleTone">공간에 맞는 K-me</span>
                </h2>
              </motion.div>

              <motion.div variants={stagger} className="serviceGrid">
                {services.map((service) => (
                  <motion.article
                    key={service.name}
                    variants={fadeUp}
                    className="card serviceCard"
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    data-cursor="hover"
                  >
                    <div className="cardInner">
                      <span className="serviceMode">{service.mode}</span>

                      <h3 className="cardTitle serviceCardTitle">
                        <span className="serviceNameTone">
                          {service.name}
                        </span>
                      </h3>

                      <p className="serviceLead">{service.title}</p>
                      <p className="cardText">{service.description}</p>

                      <ul className="servicePoints">
                        {service.points.map((point) => (
                          <li key={point} className="servicePointItem">
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="serviceActions">
                        <a
                          className="btn"
                          href={service.primaryHref}
                          target={service.primaryExternal ? "_self" : undefined}
                          rel={service.primaryExternal ? "noreferrer" : undefined}
                          onClick={
                            service.primaryExternal
                              ? undefined
                              : (e) => {
                                  e.preventDefault();
                                  go(service.primaryHref.replace("#", ""));
                                }
                          }
                          data-cursor="hover"
                        >
                          {service.primaryLabel}
                        </a>

                        <a
                          className="btn btnGhost"
                          href={service.secondaryHref}
                          target={service.secondaryExternal ? "_self" : undefined}
                          rel={service.secondaryExternal ? "noreferrer" : undefined}
                          onClick={
                            service.secondaryExternal
                              ? undefined
                              : (e) => {
                                  e.preventDefault();
                                  go(service.secondaryHref.replace("#", ""));
                                }
                          }
                          data-cursor="hover"
                        >
                          {service.secondaryLabel}
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="Cases" className="section sectionAlt">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.div variants={fadeUp} className="sectionHead sectionHeadWide">
                <h2 className="h2 h2Underline">
                  <span className="sectionTitleTone">도입 사례</span>
                </h2>
              </motion.div>

              <div className="casesGroupStack">
                <motion.section variants={stagger} className="casesGroupSection">
                  <motion.div variants={fadeUp} className="casesGroupHead">
                    <h3>K-me Dance</h3>
                    <p>스마트미러 설치형 댄스 서비스</p>
                  </motion.div>

                  <motion.div variants={stagger} className="casesGrid">
                    {danceCases.map((caseStudy) => (
                      <motion.article
                        key={caseStudy.id}
                        variants={fadeUp}
                        className="caseCard"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        data-cursor="hover"
                      >
                        <div className="caseImageWrap">
                          <img className="caseImage" src={caseStudy.image} alt={`${caseStudy.title} 도입사례`} draggable={false} />
                        </div>

                        <div className="caseOverlay">
                          <span className="caseTag caseTagSolo">{caseStudy.tag}</span>
                          <h3>{caseStudy.title}</h3>
                          <p>{caseStudy.description}</p>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                </motion.section>

                <motion.section variants={stagger} className="casesGroupSection">
                  <motion.div variants={fadeUp} className="casesGroupHead">
                    <h3>K-me VisionAI</h3>
                    <p>행사형 모션인식 스마트미러 플랫폼</p>
                  </motion.div>

                  <motion.div variants={stagger} className="casesGrid">
                    {visionAiCases.map((caseStudy) => (
                      <motion.article
                        key={caseStudy.id}
                        variants={fadeUp}
                        className="caseCard"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        data-cursor="hover"
                      >
                        <div className="caseImageWrap">
                          <img className="caseImage" src={caseStudy.image} alt={`${caseStudy.title} 도입사례`} draggable={false} />
                        </div>

                        <div className="caseOverlay">
                          <span className="caseTag caseTagSolo">{caseStudy.tag}</span>
                          <h3>{caseStudy.title}</h3>
                          <p>{caseStudy.description}</p>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                </motion.section>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.div variants={fadeUp} className="sectionHead sectionHeadWide">
                <h2 className="h2 h2Underline">
                  <span className="sectionTitleTone">도입 문의</span>
                </h2>
              </motion.div>

              <motion.article variants={fadeUp} className="contactCard contactSingleCard" data-cursor="hover">
                <div className="cardInner">
                  <div className="contactCardHead">
                    <div className="contactTitle">문의 남기기</div>
                    <div className="contactSub">기기 도입, 협업, 광고 문의 가능</div>
                  </div>

                  <ContactForm />
                </div>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footerInner">
            <span>© {new Date().getFullYear()} K-me. All rights reserved.</span>

            <div className="footerInfo">
              <span className="footerCompany">아담</span>
              <span className="footerSep">·</span>
              <span>사업자등록번호: 343-04-03348</span>
              <span className="footerSep">·</span>
              <a className="footerLink" href="mailto:k-me@ai-dam.ai">
                k-me@ai-dam.ai
              </a>
            </div>
          </div>
        </footer>
      </main>

      <StickyInquiryBar />
    </>
  );
}
