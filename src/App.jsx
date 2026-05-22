import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// ── 번역 텍스트 ────────────────────────────────────────────────
const T = {
  ko: {
    nav: { about: '소개', education: '교육 과정', vibe: '바이브 코딩', contact: '문의' },
    badge: 'AI 활용 강사 · NCS 강사',
    h1: 'AI, 어렵지 않아요.',
    h2_accent: '천천히, 제대로 배우는',
    h2_rest: ' AI 교육.',
    sub: '도구를 익히고, AI와 함께 생각하는 힘을 키웁니다.',
    cta1: '커리큘럼 보기',
    cta2: '프로필 보기',
    cta3: '오늘의 AI',
    about_title: '🎓 학력 및 자격',
    bg1: '음악학 학사 · 필름스코어링 전공',
    bg2: '라디오·영상 분야 기획·촬영·제작 15년',
    univ: '전북대학교 교육대학원',
    univ_sub: '평생교육 및 HRD 전공 (석사)',
    thesis: '「디지털 리터러시 교육에서 중장년 여성의 학습동기와 학업적 열의의 관계」',
    certs: ['📜 AICE Basic (KT)', '📜 평생교육사 2급', '📜 NCS 강사', '📜 디지털 튜터'],
    tags: ['AI활용 입문', 'AI활용 심화', 'AI크리에이터', '바이브 코딩'],
    quote_card: ['도구를 익히고,', 'AI와 함께 생각하는 힘을', '키웁니다.', '사용하는 것이 시작이라면,', '협업은 완성입니다.'],
    edu_title: '맞춤형 AI 활용 교육 과정',
    edu_sub: '대상과 목적에 맞는 단계별 AI 교육',
    b1_title: '생성형 AI 입문', b1_target: '입문자·시니어', b1_tag: 'AI가 친구처럼 느껴지게.', b1_desc: 'ChatGPT 기초, 프롬프팅, 실생활 활용',
    b2_title: '생성형 AI 활용 (실습)', b2_target: '직장인·크리에이터', b2_tag: '내 일의 혁신 파트너.', b2_desc: '문서 작성, 데이터 분석, 콘텐츠 제작', b2_badge: '인기 ⭐',
    b3_title: 'AI 리터러시 (윤리)', b3_target: '학생·시민', b3_tag: '기술을 올바르게 쓰는 힘.', b3_desc: '윤리, 저작권, 딥페이크',
    ops: '📌 1~10회 기관 맞춤 설계 · 이론+실습+토론 병행 · PC/모바일 모두 가능 · 난이도 조절 가능',
    sig_badge: '시그니처',
    sig_title: 'AI로 나만의 작품을 만듭니다.',
    sig_desc: '음악과 영상을 전공한 NCS 강사가 직접 설계한 AI 창작 수업입니다.\n이미지, 영상, 음악 —\n세 가지 도구로 당신의 이야기를 표현하세요.',
    sig_cta: '나만의 기록 만들기',
    vibe_title: '바이브 코딩',
    vibe_sub: '코딩 몰라도 OK. AI와 함께 웹/앱 만들기.',
    vibe_new: '신규',
    v1_title: '입문 과정', v1_desc: '코딩 몰라도 만들 수 있는 것들',
    v1_items: ['Google AI Studio로 나만의 챗봇 만들기', 'Codex로 간단한 웹페이지 만들기', 'Claude Code로 포트폴리오 사이트 제작', 'Git & Vercel로 내 사이트 세상에 공개하기'],
    v2_title: '심화 과정', v2_desc: '실전 업무에 AI를 연결하기',
    v2_items: ['반복 업무 자동화 (데이터 수집, 보고서 자동 생성)', '데이터베이스 연결 (Supabase)', '나만의 AI 에이전트 만들기', 'MCP 서버 연결로 외부 서비스 연동'],
    v3_title: '맞춤 커리큘럼', v3_desc: '기관·단체 대상 맞춤 설계',
    v3_items: ['대상·목적에 맞는 커리큘럼 설계', '기관 환경에 맞춘 실습 구성', '회차·난이도·인원 자유 조정', '교육 후 성과 리포트 제공'],
    q_title: '처음엔 저도 부담스러웠어요',
    q_body: 'AI라는 단어 자체가 낯설고 어색했던 때가 있었어요.\n하지만 하나씩 시도하면서,\n이건 사람과 AI의 진짜 협업이라는 걸 깨달았습니다.',
    q_quote: '"이 길을 직접 걸어왔기에, 제가 경험한 그대로를 가르칩니다."',
    q_name: '',
    footer_title: '함께 기술을',
    footer_title2: ' 하세요.',
    footer_sub: '강의 문의는 신청 폼 또는 이메일로 연락해주세요.',
    copy: '© 2026 Re:Frame. All rights reserved.',
  },
  en: {
    nav: { about: 'About', education: 'Curriculum', vibe: 'Vibe Coding', contact: 'Contact' },
    badge: 'AI Utilization · NCS Instructor',
    h1: "AI doesn't have to be hard.",
    h2_accent: 'Slow, steady, and',
    h2_rest: ' real AI education.',
    sub: 'Learn the tools. Build the thinking to collaborate with AI.',
    cta1: 'View Curriculum',
    cta2: 'View Profile',
    cta3: 'AI Today',
    about_title: '🎓 Education & Credentials',
    bg1: 'B.A. in Music · Film Scoring',
    bg2: '15 years in radio & video — planning, filming, production',
    univ: 'Jeonbuk National University Graduate School of Education',
    univ_sub: 'Lifelong Education & HRD (M.Ed.)',
    thesis: '"The Relationship between Learning Motivation and Academic Engagement of Middle-Aged Women in Digital Literacy Education"',
    certs: ['📜 AICE Basic (KT)', '📜 Lifelong Educator Lv.2', '📜 NCS Instructor', '📜 Digital Tutor'],
    tags: ['AI Basics', 'AI Advanced', 'AI Creator', 'Vibe Coding'],
    quote_card: ['Learn the tools,', 'build the thinking', 'to collaborate with AI.', 'If using it is the start,', 'collaboration is the finish.'],
    edu_title: 'Tailored AI Education Programs',
    edu_sub: 'Step-by-step AI education for every goal and audience',
    b1_title: 'Understanding Gen AI (Basic)', b1_target: 'Beginners · Seniors', b1_tag: 'Make AI feel like a friend.', b1_desc: 'ChatGPT basics, prompting, everyday use',
    b2_title: 'Using Gen AI (Hands-on)', b2_target: 'Workers · Creators', b2_tag: 'Your innovation partner.', b2_desc: 'Writing, data analysis, content creation', b2_badge: 'Popular ⭐',
    b3_title: 'AI Literacy (Ethics)', b3_target: 'Students · Citizens', b3_tag: 'Use technology responsibly.', b3_desc: 'Ethics, copyright, deepfakes',
    ops: '📌 1–10 sessions, institution-tailored · Theory + practice + discussion · PC & mobile · Adjustable difficulty',
    sig_badge: 'Signature',
    sig_title: 'Create your own work with AI.',
    sig_desc: 'An AI creative class designed by an instructor with a background in music and video.\nImage, video, music —\nExpress your story with three tools.',
    sig_cta: 'Start Your Story',
    vibe_title: 'Vibe Coding',
    vibe_sub: "No coding skills needed. Build web/apps with AI.",
    vibe_new: 'New',
    v1_title: 'Intro Course', v1_desc: 'Build with zero coding experience',
    v1_items: ['Build a chatbot with Google AI Studio', 'Create a webpage with Codex', 'Build a portfolio site with Claude Code', 'Publish your site with Git & Vercel'],
    v2_title: 'Advanced Course', v2_desc: 'Connect AI to real work',
    v2_items: ['Automate repetitive tasks (data collection, report generation)', 'Database integration (Supabase)', 'Build your own AI agent', 'Connect external services via MCP server'],
    v3_title: 'Custom Curriculum', v3_desc: 'Tailored for organizations & groups',
    v3_items: ['Curriculum designed for your audience & goals', 'Hands-on labs adapted to your environment', 'Flexible sessions, difficulty & group size', 'Post-training performance report'],
    q_title: 'I was once overwhelmed too',
    q_body: 'There was a time when even the word "AI" felt foreign and strange.\nBut as I tried things one by one,\nI realized — this is what true human-AI collaboration looks like.',
    q_quote: '"Because I walked this path myself, I teach exactly what I experienced."',
    q_name: '',
    footer_title: "Let's Re:",
    footer_title2: 'Frame technology together.',
    footer_sub: 'For inquiries, please use the form or email.',
    copy: '© 2026 Re:Frame. All rights reserved.',
  },
};

// ── 네트워크 캔버스 배경 ───────────────────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 4 + 2.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(192, 84, 64, ${0.18 * (1 - dist / 220)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 84, 64, 0.30)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

// ── 히어로 애니메이션 태그 ─────────────────────────────────────
const WORDS = ['Claude', 'Prompt', 'AI', 'Creative', 'Vibe Coding', '협업', '교육'];

// ── 강의 신청 폼 ──────────────────────────────────────────────
function ContactForm({ lang }) {
  const [state, handleSubmit] = useForm('maqkjojj');

  if (state.succeeded) {
    return (
      <div className="bg-[#3A3733] rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-white font-bold text-lg mb-2">
          {lang === 'ko' ? '신청이 완료되었습니다!' : 'Application submitted!'}
        </p>
        <p className="text-[#888] text-sm">
          {lang === 'ko' ? '빠른 시일 내에 연락드리겠습니다.' : 'We will contact you soon.'}
        </p>
      </div>
    );
  }

  const inputClass = "w-full bg-[#3A3733] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent/50 transition";
  const labelClass = "text-white/60 text-xs font-medium mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-white font-bold text-lg mb-2">
        {lang === 'ko' ? '강의 신청하기' : 'Request a Lecture'}
      </p>
      <div>
        <label className={labelClass}>{lang === 'ko' ? '기관/단체명' : 'Organization'}</label>
        <input type="text" name="organization" required className={inputClass}
          placeholder={lang === 'ko' ? '예: ○○평생학습관' : 'e.g. Learning Center'} />
        <ValidationError field="organization" errors={state.errors} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{lang === 'ko' ? '담당자 이름' : 'Contact Name'}</label>
          <input type="text" name="name" required className={inputClass} />
          <ValidationError field="name" errors={state.errors} />
        </div>
        <div>
          <label className={labelClass}>{lang === 'ko' ? '연락처' : 'Phone'}</label>
          <input type="tel" name="phone" required className={inputClass}
            placeholder="010-0000-0000" />
          <ValidationError field="phone" errors={state.errors} />
        </div>
      </div>
      <div>
        <label className={labelClass}>{lang === 'ko' ? '희망 교육 과정' : 'Preferred Course'}</label>
        <select name="course" required className={inputClass}>
          <option value="">{lang === 'ko' ? '선택해주세요' : 'Select'}</option>
          <option value="AI 입문 (스마트폰)">{lang === 'ko' ? 'AI 입문 (스마트폰 활용)' : 'AI Basics (Smartphone)'}</option>
          <option value="AI 입문 (노트북)">{lang === 'ko' ? 'AI 입문 (노트북 활용)' : 'AI Basics (Laptop)'}</option>
          <option value="AI 활용 (전문가)">{lang === 'ko' ? 'AI 활용 (전문가 과정)' : 'AI Hands-on (Professional)'}</option>
          <option value="AI 활용 (크리에이터)">{lang === 'ko' ? 'AI 활용 (크리에이터 과정)' : 'AI Hands-on (Creator)'}</option>
          <option value="AI 리터러시">{lang === 'ko' ? 'AI 리터러시 (저작권, 안전사용 등)' : 'AI Literacy (Copyright, Safety)'}</option>
          <option value="바이브코딩 입문">{lang === 'ko' ? '바이브코딩 입문' : 'Vibe Coding Intro'}</option>
          <option value="바이브코딩 심화">{lang === 'ko' ? '바이브코딩 심화' : 'Vibe Coding Advanced'}</option>
          <option value="맞춤 커리큘럼">{lang === 'ko' ? '맞춤 커리큘럼' : 'Custom Curriculum'}</option>
        </select>
        <ValidationError field="course" errors={state.errors} />
      </div>
      <div>
        <label className={labelClass}>{lang === 'ko' ? '희망 일정' : 'Preferred Schedule'}</label>
        <input type="text" name="schedule" className={inputClass}
          placeholder={lang === 'ko' ? '예: 2026년 7월 중, 주 2회' : 'e.g. July 2026, twice a week'} />
      </div>
      <div>
        <label className={labelClass}>{lang === 'ko' ? '기타 요청사항' : 'Additional Notes'}</label>
        <textarea name="message" rows="3" className={inputClass}
          placeholder={lang === 'ko' ? '인원수, 환경, 특별 요청 등' : 'Group size, environment, etc.'} />
        <ValidationError field="message" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-accent text-white py-3 rounded-full font-semibold hover:bg-[#a84030] transition disabled:opacity-50"
      >
        {state.submitting
          ? (lang === 'ko' ? '전송 중...' : 'Sending...')
          : (lang === 'ko' ? '강의 신청하기' : 'Submit Request')}
      </button>
    </form>
  );
}

export default function App() {
  const [wordIdx, setWordIdx] = useState(0);
  const [lang, setLang] = useState('ko');
  const t = T[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-bg_cream text-main antialiased"
      style={{ fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
    >

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg_cream/90 backdrop-blur-sm border-b border-main/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">
            Re:<span className="text-accent">Frame</span>
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-main/75">
              <li><a href="#about"     className="hover:text-accent transition">{t.nav.about}</a></li>
              <li><a href="#education" className="hover:text-accent transition">{t.nav.education}</a></li>
              <li><a href="#vibe"      className="hover:text-accent transition">{t.nav.vibe}</a></li>
              <li><a href="#contact"   className="hover:text-accent transition">{t.nav.contact}</a></li>
            </ul>
            <div className="flex items-center gap-1 border-l border-main/10 pl-5">
              <button
                onClick={() => setLang('ko')}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${lang === 'ko' ? 'bg-main text-white' : 'text-main/50 hover:bg-main/5'}`}
              >KR</button>
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${lang === 'en' ? 'bg-main text-white' : 'text-main/50 hover:bg-main/5'}`}
              >EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-bg_cream overflow-hidden">
        <NetworkCanvas />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 animate-fade-in-up">

          {/* 애니메이션 태그 목록 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-500 ${
                  i === wordIdx
                    ? 'bg-accent text-white scale-105'
                    : 'bg-main/8 text-main/40'
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          {/* 배지 */}
          <div className="inline-block bg-accent text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </div>

          {/* 헤드라인 */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-3 text-main">
            {t.h1}
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-accent">{t.h2_accent}</span>{t.h2_rest}
          </h2>
          <p className="text-sub text-xl mb-10">
            {t.sub}
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#education"
              className="bg-accent text-white px-7 py-3 rounded-full font-semibold hover:bg-[#a84030] transition shadow-sm"
            >
              {t.cta1}
            </a>
            <a
              href="#about"
              className="bg-main text-white px-7 py-3 rounded-full font-semibold hover:bg-[#444] transition shadow-sm"
            >
              {t.cta2}
            </a>
            <a
              href="https://reframe-daily.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-accent text-accent px-7 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition shadow-sm"
            >
              {t.cta3}
            </a>
          </div>

          {/* 아래 화살표 */}
          <div className="mt-14">
            <span className="text-accent text-2xl animate-bounce inline-block">↓</span>
          </div>
        </div>
      </section>

      {/* ── 소개 (ABOUT) ──────────────────────────────────────── */}
      <section id="about" className="py-20 px-6 bg-bg_cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

          {/* 왼쪽: 학력 및 자격 카드 */}
          <div className="bg-white rounded-2xl p-8 border border-main/8 shadow-sm">
            <h3 className="text-accent font-bold text-sm mb-6 flex items-center gap-2">
              {t.about_title}
            </h3>
            <div className="mb-5">
              <p className="font-bold text-main text-lg leading-tight">{t.univ}</p>
              <p className="text-sub text-sm mt-0.5">{t.univ_sub}</p>
              <p className="text-sub text-sm mt-1">{t.thesis}</p>
            </div>
            <div className="bg-bg_cream rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-accent mb-2 tracking-wider">{lang === 'ko' ? '크리에이터 경력' : 'CREATOR CAREER'}</p>
              <p className="text-sm text-main leading-relaxed">{t.bg1} / {t.bg2}</p>
            </div>
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-sub">
              {t.certs.map(c => <span key={c} className="flex items-center gap-1.5">{c}</span>)}
            </div>
            <div>
              <p className="text-xs font-semibold text-sub/70 mb-3 uppercase tracking-wider">Activity Tags</p>
              <div className="flex flex-wrap gap-2">
                {t.tags.map(tag => (
                  <span key={tag} className="border border-accent/40 text-accent text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 경력 이미지 */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}Image.png`}
              alt="창작과 현장을 거쳐, 교육과 AI로"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* ── 교육 과정 ─────────────────────────────────────────── */}
      <section id="education" className="py-20 px-6 bg-card_bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-3">{t.edu_title}</h2>
            <p className="text-sub">{t.edu_sub}</p>
          </div>

          {/* B-1 / B-2 / B-3 */}
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="font-bold text-main text-lg mb-1">B-1</p>
              <h3 className="text-xl font-bold text-main mb-1">{t.b1_title}</h3>
              <p className="text-xs text-sub mb-4">{t.b1_target}</p>
              <p className="text-accent font-medium italic mb-2">{t.b1_tag}</p>
              <p className="text-sm text-sub">{t.b1_desc}</p>
            </div>

            <div className="bg-accent rounded-2xl p-8 shadow-md relative">
              <span className="absolute top-4 right-4 bg-white text-accent text-xs font-bold px-2.5 py-1 rounded-full">
                {t.b2_badge}
              </span>
              <p className="font-bold text-white text-lg mb-1">B-2</p>
              <h3 className="text-xl font-bold text-white mb-1">{t.b2_title}</h3>
              <p className="text-xs text-white/70 mb-4">{t.b2_target}</p>
              <p className="text-white font-medium italic mb-2">{t.b2_tag}</p>
              <p className="text-sm text-white/80">{t.b2_desc}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="font-bold text-main text-lg mb-1">B-3</p>
              <h3 className="text-xl font-bold text-main mb-1">{t.b3_title}</h3>
              <p className="text-xs text-sub mb-4">{t.b3_target}</p>
              <p className="text-accent font-medium italic mb-2">{t.b3_tag}</p>
              <p className="text-sm text-sub">{t.b3_desc}</p>
            </div>
          </div>

          {/* 운영 방식 안내 바 */}
          <div className="bg-white rounded-xl px-8 py-4 text-sm text-sub text-center mb-12 shadow-sm">
            {t.ops}
          </div>

          {/* 시그니처 과정 */}
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-lg">
            <div className="bg-[#2A2825] p-10 flex flex-col justify-center">
              <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-medium w-fit mb-4">
                {t.sig_badge}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">{t.sig_title}</h3>
              <p className="text-[#AAA] text-sm leading-relaxed mb-6">
                {t.sig_desc.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i < 2 && <br />}</React.Fragment>
                ))}
              </p>
              <a
                href="#contact"
                className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold w-fit hover:bg-[#a84030] transition"
              >
                {t.sig_cta}
              </a>
            </div>
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}character-collage.png`}
                alt="AI 창작 수업"
                className="w-full h-full object-cover min-h-[260px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 바이브 코딩 ───────────────────────────────────────── */}
      <section id="vibe" className="py-20 px-6 bg-bg_cream">
        <div className="max-w-6xl mx-auto">

          {/* 제목 + 이미지 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-main mb-1">
                {t.vibe_title}<br />
                <span className="text-4xl">with Claude</span>
                <span className="ml-3 bg-accent text-white text-xs px-2.5 py-1 rounded-full align-middle font-medium">{t.vibe_new}</span>
              </h2>
              <p className="text-sub mt-3">{t.vibe_sub}</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src={`${import.meta.env.BASE_URL}vibe-coding.jpg`}
                alt="바이브 코딩 with Claude"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          {/* 과정 3개 */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-accent rounded-2xl p-8 relative">
              <span className="absolute top-4 right-4 bg-white text-accent text-xs font-bold px-2.5 py-1 rounded-full">FEATURED</span>
              <div className="text-white text-2xl mb-3 font-mono">&lt;&gt;</div>
              <h3 className="text-xl font-bold text-white mb-2">{t.v1_title}</h3>
              <p className="text-white/60 text-sm mb-3">{t.v1_desc}</p>
              <ul className="space-y-1.5">
                {t.v1_items.map(item => (
                  <li key={item} className="text-white/80 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-accent text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-main mb-2">{t.v2_title}</h3>
              <p className="text-sub/60 text-sm mb-3">{t.v2_desc}</p>
              <ul className="space-y-1.5">
                {t.v2_items.map(item => (
                  <li key={item} className="text-sub text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-accent text-2xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-main mb-2">{t.v3_title}</h3>
              <p className="text-sub/60 text-sm mb-3">{t.v3_desc}</p>
              <ul className="space-y-1.5">
                {t.v3_items.map(item => (
                  <li key={item} className="text-sub text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 인용 (QUOTE) ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-bg_cream">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-10 text-center border border-main/5 shadow-sm">
            <div className="text-4xl mb-6">💭</div>
            <h3 className="text-2xl font-bold text-main mb-6">{t.q_title}</h3>
            <p className="text-sub leading-relaxed mb-6">
              {t.q_body.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < 2 && <br />}</React.Fragment>
              ))}
            </p>
            <p className="text-accent italic font-medium mb-3">{t.q_quote}</p>
            <p className="text-main font-bold">{t.q_name}</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ─────────────────────────────────── */}
      <footer id="contact" className="bg-bg_dark py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
                {lang === 'ko' ? (
                  <>함께 Re:<span className="text-accent">Frame</span></>
                ) : (
                  <>Let's Re:<span className="text-accent">Frame</span></>
                )}
              </h2>
              <p className="text-[#888] text-lg mt-3">{t.footer_sub}</p>
              <div className="space-y-3 mt-8">
                <a href="mailto:pianossun@naver.com" className="flex items-center gap-3 bg-[#3A3733] rounded-xl px-5 py-3.5 hover:bg-[#443F3B] transition">
                  <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white text-base">✉</span>
                  <span className="text-white font-medium text-sm">pianossun@naver.com</span>
                </a>
                <a href="https://www.threads.net/@slowsoyang" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#3A3733] rounded-xl px-5 py-3.5 hover:bg-[#443F3B] transition">
                  <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-bold text-base">@</span>
                  <span className="text-white font-medium text-sm">스레드 @slowsoyang</span>
                </a>
                <a href="https://blog.naver.com/frameview-" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#3A3733] rounded-xl px-5 py-3.5 hover:bg-[#443F3B] transition">
                  <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-bold text-base">B</span>
                  <span className="text-white font-medium text-sm">네이버 블로그</span>
                </a>
              </div>
            </div>
            <ContactForm lang={lang} />
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-[#555] text-sm">
            {t.copy}
          </div>
        </div>
      </footer>

    </div>
  );
}
