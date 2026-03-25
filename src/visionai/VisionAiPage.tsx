import VisionAiContactForm from "./VisionAiContactForm";

type PriceItem = {
  name: string;
  price: string;
  note?: string;
};

const heroKeywords = [
  "모션인식 인터랙션 AI 스마트미러",
  "전국 출장",
  "행사·축제·졸업식·브랜드 프로모션 대응",
  "참여형 / 비참여형 동시 운영",
];

const participatoryProducts: PriceItem[] = [
  { name: "K-me 안내 키오스크", price: "300만 원부터" },
  { name: "K-me AI 포토부스", price: "500만 원부터" },
  { name: "K-me 댄스", price: "500만 원부터" },
  { name: "K-me 맞춤 제작", price: "700만 원부터", note: "최소 범위 약 350만 원" },
];

const nonParticipatoryPricing = [
  { rental: "1일", price: "690,000원", production: "페이지 1장당 50,000원" },
  { rental: "2일", price: "1,150,000원", production: "페이지 1장당 50,000원" },
  { rental: "3일", price: "1,490,000원", production: "페이지 1장당 50,000원" },
  { rental: "4일 이상", price: "별도 협의", production: "별도 협의" },
];

const includedParticipatory = [
  "장비 렌탈",
  "설치 및 철수",
  "AI 인터랙션 세팅",
  "화면/UXUI 디자인",
  "기본 페이지 구성",
  "기본 모션 구성",
  "현장 운영 가이드",
];

const addOnOptions = [
  "행사 기획: 80만 원",
  "모션 1종 추가: 35만 원 (이벤트 진행 중)",
  "페이지 1장 추가: 5만 원",
  "리터치/운영 인력/촬영 기록물: 별도 협의",
];

const travelFees = [
  "서울/경기: +100,000원",
  "충청: +100,000원",
  "경북: +150,000원",
  "강원/전라: +200,000원",
  "경남: +300,000원",
  "제주: 별도 협의",
];

const installSpaces = [
  "실내 행사장",
  "체육관",
  "대학 캠퍼스 부스",
  "기업 로비 / 브랜드 팝업 공간",
  "박람회 / 전시 부스",
  "야외 행사장(일부 가능)",
];

const eventTypes = [
  "대학교 축제 / 입학식 / 졸업식",
  "공공기관 캠페인 / 정책 홍보 부스",
  "기업 브랜드 행사 / 팝업스토어",
  "제품 런칭 / 체험존 / 포토존",
  "공연장 / 팬 이벤트 / K-POP 체험 콘텐츠",
];

const operationCases = [
  "한양대학교 입학식 운영",
  "숙명여자대학교 입학식 체험 콘텐츠 운영",
  "단국대학교 행사형 스마트미러 부스 운영",
  "건대 / 합정 / 논현 설치형 운영 사례",
];

const reviewQuotes = [
  "학생들이 가장 오래 머문 체험 부스였습니다.",
  "사진형 포토존보다 참여도가 눈에 띄게 높았습니다.",
  "행사 분위기를 끌어올리는 핵심 콘텐츠로 작동했습니다.",
];

const faqItems = [
  {
    q: "설치에 필요한 공간은 어느 정도인가요?",
    a: "스마트미러 장비 + 대기 동선을 기준으로 안내합니다. 행사장 구조를 먼저 확인해 최소 필요 공간을 제안드립니다.",
  },
  {
    q: "야외 행사도 가능한가요?",
    a: "가능합니다. 현장 조건 확인 후 야외 전용 천막 업그레이드 옵션으로 안정적으로 운영합니다.",
  },
  {
    q: "행사 맞춤형 콘텐츠 제작도 가능한가요?",
    a: "가능합니다. 페이지/모션 추가와 브랜드 메시지 반영까지 행사 목적에 맞춰 맞춤 제작합니다.",
  },
  {
    q: "운영 인력도 함께 요청할 수 있나요?",
    a: "네. 행사 규모와 운영 시간에 따라 운영 인력 추가 배치를 별도 협의로 지원합니다.",
  },
];

export default function VisionAiPage() {
  return (
    <div className="visionai-page">
      <header className="visionai-topbar">
        <div className="visionai-wrap visionai-topbar-inner">
          <a className="visionai-brand" href="#top" aria-label="K-me Vision AI 상단으로 이동">
            <img className="visionai-brand-wordmark" src="/visionai/kme-logo-white.png" alt="K-me 로고" />
          </a>

          <nav className="visionai-nav">
            <a href="#service">서비스</a>
            <a href="#pricing">가격</a>
            <a href="#cases">사례</a>
            <a className="visionai-nav-cta" href="#contact">
              문의하기
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="visionai-hero" id="top">
          <div className="visionai-wrap visionai-hero-layout">
            <div className="visionai-hero-main">
              <p className="visionai-kicker">K-ME Vision AI Event Service</p>
              <h1>
                행사 참여율을 끌어올리는 <br />
                인터랙티브 스마트미러 <br />
                K-me Vision AI
              </h1>
              <p className="visionai-lead">
                대학교·공공기관·기업 행사에서, 참여형 체험부터 안내형 디스플레이까지 한 번에 운영합니다.
                <strong> 설치·철수·현장 운영 가이드가 포함된 행사 부스 완성형 서비스</strong>입니다.
              </p>

              <ul className="visionai-keywords">
                {heroKeywords.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="visionai-hero-cta">
                <a className="visionai-btn" href="#pricing">
                  가격·구성 보기
                </a>
                <a className="visionai-btn visionai-btn-outline" href="/visionai/form/">
                  질문형 견적폼 시작
                </a>
                <a className="visionai-btn visionai-btn-outline" href="#contact">
                  견적 문의하기
                </a>
              </div>
            </div>

            <aside className="visionai-hero-side">
              <h2>행사 담당자 체크포인트</h2>
              <ul>
                <li>
                  <strong>전국 출장 가능</strong>
                  <span>제주 제외 전국 권역 운영 가능 (제주 별도 협의)</span>
                </li>
                <li>
                  <strong>참여형 / 비참여형 선택</strong>
                  <span>행사 성격에 맞춰 콘텐츠 유형을 빠르게 결정</span>
                </li>
                <li>
                  <strong>맞춤 견적형 운영</strong>
                  <span>참여형은 300만 원부터, 비참여형은 일자별 가격으로 빠르게 안내</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="visionai-section" id="service">
          <div className="visionai-wrap">
            <div className="visionai-section-head">
              <h2>서비스 한눈에 보기</h2>
              <p>행사 현장에서 실제로 필요한 기능만 짧고 명확하게 정리했습니다.</p>
            </div>

            <div className="visionai-grid-4">
              <article className="visionai-card">
                <h3>참여형 콘텐츠</h3>
                <p>모션 감지 기반 체험형 부스. 대기열과 현장 체류 시간을 만듭니다.</p>
              </article>
              <article className="visionai-card">
                <h3>비참여형 콘텐츠</h3>
                <p>안내형·브랜딩형 화면 송출. 공간 분위기와 메시지를 선명하게 전달합니다.</p>
              </article>
              <article className="visionai-card">
                <h3>설치/운영 지원</h3>
                <p>설치·철수, 기본 세팅, 현장 운영 가이드까지 기본 제공됩니다.</p>
              </article>
              <article className="visionai-card">
                <h3>맞춤 제작 가능</h3>
                <p>행사 목적에 맞춰 페이지·모션·브랜드 요소를 커스터마이징합니다.</p>
              </article>
            </div>

            <div className="visionai-subgrid">
              <article className="visionai-card">
                <h3>활용 행사 유형</h3>
                <ul className="visionai-chip-list">
                  {eventTypes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="visionai-card">
                <h3>설치 가능 공간</h3>
                <ul>
                  {installSpaces.map((space) => (
                    <li key={space}>{space}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="visionai-section visionai-section-alt" id="pricing">
          <div className="visionai-wrap">
            <div className="visionai-section-head">
              <h2>가격 안내</h2>
              <p>참여형은 맞춤 견적 중심, 비참여형은 일자 기준으로 빠르게 확인할 수 있게 구성했습니다.</p>
            </div>

            <div className="visionai-grid-2">
              <article className="visionai-card">
                <h3>참여형 콘텐츠 (VAT 별도)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>상품명</th>
                      <th>금액</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participatoryProducts.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.note ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="visionai-note">행사 목적, 인터랙션 수, 운영 방식에 따라 최종 견적은 달라질 수 있습니다.</p>
              </article>

              <article className="visionai-card">
                <h3>비참여형 콘텐츠 (VAT 별도)</h3>
                <table>
                  <thead>
                    <tr>
                      <th>렌탈 기간</th>
                      <th>렌탈 가격</th>
                      <th>제작비</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonParticipatoryPricing.map((item) => (
                      <tr key={item.rental}>
                        <td>{item.rental}</td>
                        <td>{item.price}</td>
                        <td>{item.production}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>

            <div className="visionai-grid-2">
              <article className="visionai-card">
                <h3>기본 포함 사항</h3>
                <ul>
                  {includedParticipatory.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="visionai-note">리터치 1회 무료 / 야외 진행 시 전용 천막 무료 업그레이드 가능</p>
              </article>

              <article className="visionai-card">
                <h3>추가 옵션 & 출장비</h3>
                <p className="visionai-list-title">추가 옵션</p>
                <ul>
                  {addOnOptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="visionai-list-title">지역별 출장비</p>
                <ul>
                  {travelFees.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="visionai-section" id="cases">
          <div className="visionai-wrap">
            <div className="visionai-section-head">
              <h2>운영 사례 / 후기</h2>
              <p>행사 담당자가 가장 궁금해하는 “실제 운영 경험”과 “현장 반응”을 분리해 보여줍니다.</p>
            </div>

            <div className="visionai-grid-2">
              <article className="visionai-card">
                <h3>운영 사례</h3>
                <ul>
                  {operationCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="visionai-card">
                <h3>현장 반응</h3>
                <ul>
                  {reviewQuotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="visionai-section visionai-section-alt" id="faq">
          <div className="visionai-wrap">
            <div className="visionai-section-head">
              <h2>자주 묻는 질문</h2>
            </div>
            <div className="visionai-faq-list">
              {faqItems.map((item) => (
                <details key={item.q} className="visionai-faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="visionai-section visionai-contact" id="contact">
          <div className="visionai-wrap visionai-grid-2">
            <article className="visionai-card visionai-contact-intro">
              <h2>견적 문의하기</h2>
              <p>
                기존 ai-dam.ai 문의 방식과 동일하게 접수되며,
                <strong> k-me@ai-dam.ai</strong>로 바로 전달됩니다.
              </p>
              <ul>
                <li>행사 일정 / 지역 / 운영시간을 적어주시면 더 빠르게 견적이 나옵니다.</li>
                <li>참여형/비참여형 희망 방향을 함께 남겨주세요.</li>
              </ul>
              <a className="visionai-inline-mail" href="mailto:k-me@ai-dam.ai">
                k-me@ai-dam.ai
              </a>
            </article>

            <article className="visionai-card">
              <VisionAiContactForm />
            </article>
          </div>
        </section>
      </main>

      <footer className="visionai-footer">
        <div className="visionai-wrap visionai-footer-inner">
          <div className="visionai-footer-brand">
            <img src="/visionai/kme-symbol.png" alt="K-me 심볼" />
            <img src="/visionai/kme-logo-white.png" alt="K-me 로고" />
          </div>
          <p>© {new Date().getFullYear()} K-me Vision AI · 문의: k-me@ai-dam.ai</p>
        </div>
      </footer>
    </div>
  );
}
