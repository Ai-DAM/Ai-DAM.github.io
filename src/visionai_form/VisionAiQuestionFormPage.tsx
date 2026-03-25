import { useMemo, useState } from "react";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type Answers = {
  eventType: string;
  serviceType: string;
  region: string;
  eventDate: string;
  audience: string;
  budget: string;
  organization: string;
  contactName: string;
  phone: string;
  email: string;
  notes: string;
};

type StepKey = keyof Answers;

const steps: Array<{ key: StepKey; title: string; helper: string; required: boolean }> = [
  { key: "eventType", title: "어떤 행사인가요?", helper: "행사 성격에 맞춰 추천 구성을 제안합니다.", required: true },
  { key: "serviceType", title: "어떤 운영 방식이 필요하신가요?", helper: "참여형/비참여형 또는 혼합 운영을 선택해 주세요.", required: true },
  { key: "region", title: "행사 지역은 어디인가요?", helper: "출장 가능 여부와 지역별 비용을 빠르게 안내합니다.", required: true },
  { key: "eventDate", title: "행사 예정일이 있나요?", helper: "정확한 일정이 없으면 예상 월만 입력해도 됩니다.", required: true },
  { key: "audience", title: "예상 참여 규모는 어느 정도인가요?", helper: "예상 인원에 따라 권장 운영 플랜이 달라집니다.", required: true },
  { key: "budget", title: "예상 예산 범위를 알려주세요.", helper: "예산 구간에 맞는 현실적인 구성을 제안드립니다.", required: true },
  { key: "organization", title: "기관/회사명은 무엇인가요?", helper: "프로젝트 명칭 또는 행사명도 함께 적어주셔도 좋습니다.", required: true },
  { key: "contactName", title: "담당자 성함을 알려주세요.", helper: "실무 연락 담당자 기준으로 입력해 주세요.", required: true },
  { key: "phone", title: "연락 가능한 전화번호는 무엇인가요?", helper: "빠른 상담이 필요하면 휴대폰 번호를 권장드립니다.", required: true },
  { key: "email", title: "답변 받을 이메일은 무엇인가요?", helper: "최종 견적/운영 제안이 전달될 주소입니다.", required: true },
  { key: "notes", title: "추가 요청 사항이 있으신가요?", helper: "원하는 분위기, 레퍼런스, 필수 요구사항을 자유롭게 적어주세요.", required: false },
];

const options: Partial<Record<StepKey, string[]>> = {
  eventType: ["대학교 행사", "공공기관 행사", "기업 프로모션", "박람회/전시", "기타"],
  serviceType: ["참여형 콘텐츠", "비참여형 콘텐츠", "참여형 + 비참여형", "맞춤 제작 상담"],
  audience: ["100명 미만", "100~300명", "300~700명", "700명 이상", "미정"],
  budget: ["300만 원 미만", "300~500만 원", "500~700만 원", "700만 원 이상", "협의 필요"],
};

const labels: Record<StepKey, string> = {
  eventType: "행사 유형",
  serviceType: "운영 방식",
  region: "행사 지역",
  eventDate: "행사 예정일",
  audience: "예상 참여 규모",
  budget: "예상 예산",
  organization: "기관/회사명",
  contactName: "담당자명",
  phone: "연락처",
  email: "이메일",
  notes: "추가 요청 사항",
};

const initialAnswers: Answers = {
  eventType: "",
  serviceType: "",
  region: "",
  eventDate: "",
  audience: "",
  budget: "",
  organization: "",
  contactName: "",
  phone: "",
  email: "",
  notes: "",
};

function parseError(raw: string, fallback = "전송 실패") {
  const text = (raw ?? "").trim();
  if (!text) return fallback;

  try {
    const parsed = JSON.parse(text);
    let message = parsed?.error || parsed?.message || fallback;
    if (parsed?.detail) {
      const detail = typeof parsed.detail === "string" ? parsed.detail : JSON.stringify(parsed.detail);
      message += ` (${detail})`;
    }
    return message;
  } catch {
    return text;
  }
}

export default function VisionAiQuestionFormPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const isReview = stepIndex === steps.length;
  const currentStep = steps[stepIndex];
  const progress = Math.round((Math.min(stepIndex, steps.length) / steps.length) * 100);

  const mailtoHref = useMemo(
    () =>
      `mailto:k-me@ai-dam.ai?subject=${encodeURIComponent("K-me Vision AI 질문형 견적 문의")}`,
    []
  );

  function updateAnswer(key: StepKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function validForStep(key: StepKey) {
    const value = answers[key].trim();

    if (key === "notes") return true;
    if (key === "email") return /^\S+@\S+\.\S+$/.test(value);
    if (key === "phone") return value.length >= 8;

    return value.length > 0;
  }

  const canGoNext = isReview ? true : validForStep(currentStep.key);

  function goPrev() {
    if (status === "sending") return;
    setStepIndex((prev) => Math.max(0, prev - 1));
  }

  function goNext() {
    if (!canGoNext || status === "sending") return;
    setStepIndex((prev) => Math.min(steps.length, prev + 1));
  }

  async function submitForm() {
    setStatus("sending");
    setError("");

    const subject = `K-me Vision AI 질문형 문의 | ${answers.organization || answers.contactName}`;
    const message = [
      `[행사 유형] ${answers.eventType}`,
      `[운영 방식] ${answers.serviceType}`,
      `[행사 지역] ${answers.region}`,
      `[행사 예정일] ${answers.eventDate}`,
      `[예상 참여 규모] ${answers.audience}`,
      `[예상 예산] ${answers.budget}`,
      `[기관/회사명] ${answers.organization}`,
      `[담당자명] ${answers.contactName}`,
      `[연락처] ${answers.phone}`,
      `[이메일] ${answers.email}`,
      "",
      "[추가 요청 사항]",
      answers.notes || "미입력",
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          fromEmail: answers.email,
          message,
        }),
      });

      const raw = await res.text();
      if (!res.ok) {
        throw new Error(parseError(raw, `Request failed (${res.status})`));
      }

      setStatus("sent");
    } catch (e: unknown) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "문의 전송에 실패했습니다.");
    }
  }

  function resetForm() {
    setAnswers(initialAnswers);
    setStepIndex(0);
    setStatus("idle");
    setError("");
  }

  function renderInput() {
    if (!currentStep) return null;

    const stepOptions = options[currentStep.key];
    if (stepOptions?.length) {
      return (
        <div className="kform-options">
          {stepOptions.map((option) => {
            const selected = answers[currentStep.key] === option;
            return (
              <button
                key={option}
                type="button"
                className={`kform-option ${selected ? "is-selected" : ""}`}
                onClick={() => updateAnswer(currentStep.key, option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    if (currentStep.key === "notes") {
      return (
        <textarea
          className="kform-input kform-textarea"
          value={answers.notes}
          onChange={(e) => updateAnswer("notes", e.target.value)}
          placeholder="예) 5월 3주차 대학교 축제, 참여형 체험 + 안내형 화면 동시 운영 희망"
          maxLength={4000}
        />
      );
    }

    const type = currentStep.key === "email" ? "email" : currentStep.key === "eventDate" ? "date" : "text";
    const placeholderMap: Partial<Record<StepKey, string>> = {
      region: "예) 서울 강남구",
      eventDate: "",
      organization: "예) OO대학교 총학생회",
      contactName: "예) 홍길동",
      phone: "예) 010-1234-5678",
      email: "예) name@company.com",
    };

    return (
      <input
        className="kform-input"
        type={type}
        value={answers[currentStep.key]}
        onChange={(e) => updateAnswer(currentStep.key, e.target.value)}
        placeholder={placeholderMap[currentStep.key]}
      />
    );
  }

  return (
    <div className="kform-page">
      <header className="kform-topbar">
        <div className="kform-wrap kform-topbar-inner">
          <a className="kform-brand" href="/visionai/" aria-label="Vision AI 서비스 페이지로 이동">
            <img src="/visionai/kme-logo-white.png" alt="K-me 로고" />
          </a>
          <a className="kform-link" href="/visionai/">
            서비스 페이지로 이동
          </a>
        </div>
      </header>

      <main className="kform-main">
        <section className="kform-wrap kform-shell">
          <div className="kform-progress-head">
            <p>{isReview ? "최종 확인" : `질문 ${stepIndex + 1} / ${steps.length}`}</p>
            <strong>{progress}%</strong>
          </div>
          <div className="kform-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          {status === "sent" ? (
            <article className="kform-card">
              <h1>문의가 접수되었습니다.</h1>
              <p>
                입력하신 내용이 <strong>k-me@ai-dam.ai</strong>로 전달되었습니다. 빠르게 확인 후 연락드리겠습니다.
              </p>
              <div className="kform-actions">
                <a className="kform-btn" href="/visionai/">
                  서비스 페이지로 돌아가기
                </a>
                <button className="kform-btn kform-btn-ghost" type="button" onClick={resetForm}>
                  새 문의 작성
                </button>
              </div>
            </article>
          ) : isReview ? (
            <article className="kform-card">
              <h1>최종 답변 확인</h1>
              <p>아래 내용으로 문의가 접수됩니다. 수정할 항목이 있다면 이전으로 돌아가 변경해 주세요.</p>
              <dl className="kform-summary">
                {steps.map((step) => (
                  <div key={step.key}>
                    <dt>{labels[step.key]}</dt>
                    <dd>{answers[step.key] || "미입력"}</dd>
                  </div>
                ))}
              </dl>

              {status === "error" && <p className="kform-error">⚠ {error || "전송 실패"}</p>}

              <div className="kform-actions">
                <button className="kform-btn kform-btn-ghost" type="button" onClick={goPrev} disabled={status === "sending"}>
                  이전 질문
                </button>
                <button className="kform-btn" type="button" onClick={submitForm} disabled={status === "sending"}>
                  {status === "sending" ? "전송 중..." : "문의 접수하기"}
                </button>
              </div>

              <a className="kform-mailto" href={mailtoHref}>
                이메일로 직접 문의하기
              </a>
            </article>
          ) : (
            <article className="kform-card">
              <h1>{currentStep.title}</h1>
              <p>{currentStep.helper}</p>

              {renderInput()}

              <div className="kform-actions">
                <button className="kform-btn kform-btn-ghost" type="button" onClick={goPrev} disabled={stepIndex === 0}>
                  이전
                </button>
                <button className="kform-btn" type="button" onClick={goNext} disabled={!canGoNext}>
                  다음
                </button>
              </div>
            </article>
          )}
        </section>
      </main>
    </div>
  );
}
