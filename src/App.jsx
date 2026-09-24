import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// ── 회사 기본 정보 — 값이 비어 있으면 화면에 표시하지 않음 ─────────
const COMPANY = {
  email: 'so@re-frame.kr',
  address: '전북특별자치도 전주시 덕진구 솔내로 128, 3층',
  address_en: '3F, 128 Solnae-ro, Deokjin-gu, Jeonju, Jeonbuk, Korea',
  bizNo: '',   // 사업자등록번호 — 받으면 입력
  phone: '',   // 대표 전화 — 받으면 입력
};

const NEWS_URL = 'https://re-frame.kr';
const TEACHING_SINCE = 2008;
const TEACHING_YEARS = new Date().getFullYear() - TEACHING_SINCE;
const NEWS_DATE = '2026.09';   // Re:frame News 등록 완료되면 등록일로 교체 (예: 2026.10.15)

// ── 번역 텍스트 ────────────────────────────────────────────────
const T = {
  ko: {
    nav: [
      { href: '#about', label: '회사 소개' },
      { href: '#business', label: '사업 영역' },
      { href: '#company', label: '연혁' },
      { href: '#education', label: '기관 교육' },
      { href: '#ceo', label: '대표 소개' },
    ],
    nav_cta: '출강 문의',
    menu: '메뉴',

    hero_eyebrow: '주식회사 리프레임 · 교육 전문기업',
    hero_lines: [['새로운 시대의 가능성,'], [{ em: '배움' }, '에서 열립니다.']],
    hero_sub: 'AI가 바꾸는 세상에서, 누구나 자기 속도로 배우고 새로운 가능성을 열 수 있는 교육을 만듭니다.',
    hero_cta1: '출강 문의하기',
    hero_cta2: '교육 분야 보기',
    journey_cap: '배움이 가능성이 되는 길',
    journey: [
      { t: '처음 만나기', d: 'AI 리터러시 · 디지털 기초' },
      { t: '일에 쓰기', d: '업무 활용 · 데이터 · 자동화' },
      { t: '직접 만들기', d: '바이브코딩 · 에이전트 · 콘텐츠' },
      { t: '가르치고 나누기', d: '강사 양성 · 지역 프로젝트' },
      { t: '새로운 가능성', d: '자기 속도로, 삶과 일에서', end: true },
    ],
    stats: [
      { n: TEACHING_YEARS, suffix: '년', l: `강의 경력 (${TEACHING_SINCE}~)` },
      { n: 400, suffix: '+', l: 'AI 교육 시간 (2023~)' },
      { n: null, suffix: '곳', l: '출강 기관' },
    ],

    about_label: '회사 소개',
    about_meaning: '새로운 시대에 맞게, 생각과 가치의 틀을 다시 짭니다.',
    about_p: '(주)리프레임은 지역과 함께 성장하려는 마음, 성인의 배움에 대한 믿음, 기술을 읽고 소통하는 문해력을 바탕으로, 누구나 자기 속도로 익힐 수 있는 교육과 콘텐츠를 기획·개발합니다. 공공기관·기업·평생교육기관과 함께 실습 중심의 교육을 운영하며, AI 시대 배움의 새로운 프레임을 제시합니다.',
    about_facts: [
      { k: '교육 철학', v: '자기주도 · 평생학습' },
      { k: '주요 활동 지역', v: '전북 · 전남' },
    ],
    values: [
      { title: '지역과 함께 성장합니다', desc: '전북에 뿌리를 두고 활동합니다. AI 시대에 지역이 소외되지 않도록, 배움의 기회를 지역 곳곳으로 넓힙니다.' },
      { title: '성인의 배움을 믿습니다', desc: '늦은 배움은 없습니다. 중장년·시니어도 자기 속도로 익힐 수 있도록, 성인 학습의 원리로 교육을 설계합니다.' },
      { title: '문해력과 소통을 중심에 둡니다', desc: '도구 사용법을 넘어 기술을 읽고, 판단하고, 소통하는 힘 — AI 리터러시가 모든 수업의 바탕입니다.' },
    ],

    biz_label: '사업 영역',
    biz_title: '교육을 중심으로, 세 갈래로 일합니다',
    biz: [
      { name: '기관 교육', desc: '공공기관·기업·학교·평생학습관 출강, 교육과정 설계와 컨설팅, 교재·실습 콘텐츠 개발', link: '#programs', cta: '교육 분야 보기' },
      { name: 'Re:frame News', desc: '교육자와 평생학습을 위한 인터넷 매체. AI 활용, 교육 정책, 지역의 배움 소식을 전합니다.', link: NEWS_URL, cta: '매체 바로가기', external: true },
      { name: '리프레임평생교육원', desc: '개인 학습자가 전주에서 직접 만나 배우는 교육시설. 디지털 역량부터 일과 지역의 배움까지.', status: '개원 준비 중' },
    ],

    co_label: '연혁',
    co_title: '현장에서 시작해, 법인이 되었습니다',
    hist_groups: { ceo: '대표의 현장', co: '주식회사 리프레임' },
    history: [
      { y: `${TEACHING_SINCE}`, t: '미디어 교육으로 강의 시작', who: 'ceo' },
      { y: '2023~', t: 'AI 교육 본격화 — 공공기관·기업·학교·평생학습관 출강 400시간 이상', who: 'ceo' },
      { y: '2026.08', t: '주식회사 리프레임 설립 (전주)', who: 'co', start: true },
      { y: NEWS_DATE, t: '인터넷 매체 Re:frame News 창간', who: 'co' },
      { y: '2026', t: '리프레임평생교육원 개원 준비', who: 'co' },
    ],

    exp_label: '기관 교육',
    exp_title: '설계부터 콘텐츠, 현장까지',
    exp_sub: '공공기관·기업·학교·평생학습관을 찾아가,\n실습 중심 AI 교육을 운영합니다.',
    exp: [
      { title: '맞춤형 교육 설계', desc: '평생교육·HRD 석사와 직업능력훈련교사의 전문성으로, 대상·목적·환경에 맞는 교육과정을 설계합니다.' },
      { title: 'AI 콘텐츠 개발', desc: '빠르게 변화하는 AI 환경을 반영해 교재와 실습 자료, 커리큘럼을 직접 기획하고 개발합니다.' },
      { title: 'AI 교육 현장경험', desc: '대표가 2023년부터 공공기관·기업·평생교육 현장에서 쌓은 400시간 이상의 강의 경험 — 강의실에서 검증된 방법으로 가르칩니다.' },
    ],

    prog_label: '기관 교육 · 분야',
    prog_title: '4개 영역, 14개 분야',
    prog_sub: '기관과 대상에 맞춰 분야를 조합해 과정을 설계합니다. 분야를 누르면 내용이 펼쳐집니다.',
    groups: [
      { label: 'WORK', name: 'AI 업무 실무', gdesc: '문서 작성부터 데이터 분석까지, 내 업무에 바로 쓰는 AI', items: [
        { n: '01', title: '생성형 AI 업무 활용', desc: '사업계획서 · 보고서 · 공문 · 보도자료 초안, 회의록 요약과 업무 메일까지 행정 문서에 바로 적용' },
        { n: '02', title: '프롬프트 엔지니어링', desc: '4단계 질문법(배경 · 목적 · 요청 · 출력형식)으로 프롬프트를 설계하고 반복 개선' },
        { n: '03', title: 'AI 데이터 분석 · 시각화', desc: '엑셀 · 구글시트 데이터 정리와 AI 분석, 차트 · 대시보드 시각화' },
        { n: '04', title: '노코드 업무 자동화', desc: '코딩 없이 반복 업무 흐름을 설계하고 문서 · 메일 · 데이터 수집을 자동화' },
      ]},
      { label: 'BUILD', name: '개발 · 자동화 · 플랫폼', gdesc: '코딩 없이 웹앱과 에이전트를 만들고, AI 플랫폼을 깊이 있게', items: [
        { n: '05', title: '바이브코딩 (웹/앱 만들기)', desc: '코딩 지식 없이 대화형 AI(Claude)로 웹앱을 기획 → 제작 → 배포까지' },
        { n: '06', title: 'AI 에이전트 구축 · 활용', desc: '업무 목적별 맞춤 AI 에이전트를 설계하고 반복 업무를 위임' },
        { n: '07', title: 'Google AI 워크스페이스 활용', desc: 'Gemini · NotebookLM과 Google 드라이브 · 시트 · 문서 · 폼 연동 업무' },
        { n: '08', title: 'Claude 마스터', desc: '데스크톱 설치 · Claude Cowork · Claude Code · 스킬 · MCP · 디자인 활용' },
      ]},
      { label: 'CREATE', name: '콘텐츠 · 영상', gdesc: '카드뉴스부터 영상까지, 기획에서 완성까지 AI와 함께', items: [
        { n: '09', title: 'AI 콘텐츠 제작', desc: '카드뉴스 · 포스터 · 안내문 등 홍보 콘텐츠를 AI 도구로 기획부터 제작까지' },
        { n: '10', title: '쇼츠영상 제작', desc: '스마트폰과 AI 도구로 숏폼 영상을 기획 · 촬영 · 편집하고 채널에 올리기까지' },
        { n: '11', title: 'AI 영상 제작 (기획 → 편집)', desc: '15년 영상 실무의 노하우 — 프리미어와 AI 도구로 기획 · 촬영 · 편집 전 과정을 배웁니다' },
      ]},
      { label: 'TEACH', name: '리터러시 · 교육 전문', gdesc: '기술을 올바르게 읽고 쓰는 힘, 그리고 가르치는 전문성', items: [
        { n: '12', title: 'AI 리터러시 · 윤리 · 저작권', desc: '민감정보 입력 기준, AI 생성물 저작권, 가짜정보 구별과 교차 검증' },
        { n: '13', title: 'AI 활용 글쓰기 · 학습', desc: 'AI와 함께하는 글쓰기와 자료 조사, 스스로 검증하며 배우는 자기주도 학습법' },
        { n: '14', title: 'AI 강사 양성', desc: 'AI 교육 강사를 위한 커리큘럼 설계와 실습 운영 노하우 — 강사 역량 강화 과정' },
      ]},
    ],

    fmt_label: '기관 교육 · 운영 형태',
    fmt_title: '기관 상황에 맞는 단위로',
    formats: [
      { name: '특강', spec: '1회 · 2~3시간', desc: '조직 전체의 AI 이해와 인식 전환. 입문 대상, 워크숍·연수 프로그램에 적합' },
      { name: '단기 과정', spec: '3~5회 · 회당 2~3시간', desc: '실무 도구를 손에 익히는 실습 과정. 부서·직무별 구성' },
      { name: '심화 과정', spec: '6~10회 · 프로젝트형', desc: '내 업무에 맞는 결과물을 직접 완성. 자동화·바이브코딩·강사 양성에 적합' },
    ],
    fmt_common_title: '모든 과정에 기본 제공',
    fmt_common: ['대상 맞춤 교안과 실습 자료', 'PC실 · 노트북 · 모바일 환경 모두 가능', '출석 · 만족도를 담은 결과보고서', '법인 계약 · 세금계산서 발행'],

    proc_label: '기관 교육 · 진행 방식',
    proc_title: '문의에서 결과보고까지',
    steps: [
      { t: '문의', d: '문의 폼이나 메일로 기관과 희망 교육을 알려 주세요.' },
      { t: '사전 협의', d: '대상, 인원, 목적, 장소와 장비(PC실 여부)를 확인합니다.' },
      { t: '커리큘럼 제안', d: '차시별 구성과 강사 이력을 담은 제안서를 드립니다. 내부 결재 자료로 쓰실 수 있습니다.' },
      { t: '계약', d: '법인 명의로 계약하고 세금계산서를 발행합니다.' },
      { t: '교육 운영', d: '교안과 실습 자료를 제공하고, 수준에 맞춰 속도를 조절합니다.' },
      { t: '결과보고', d: '출석과 만족도, 현장 기록을 담은 결과보고서를 드립니다.' },
    ],

    inst_label: '대표 소개',
    inst_name: '박선례',
    inst_role: '(주)리프레임 대표 · 생성형 AI 활용 교육 전문 강사',
    univ: '전북대학교 교육대학원',
    univ_sub: '평생교육 및 HRD 전공 (석사)',
    thesis: '「디지털 리터러시 교육에서 중장년 여성의 학습동기와 학업적 열의의 관계」',
    bg: '음악학 학사 · 필름스코어링 전공 · 라디오·영상 기획·촬영·제작 실무 15년',
    certs_label: '자격 · 수료',
    certs: ['한국기술교육대학교 AI특화인재양성교육 - AI서비스개발 수료', 'AICE(AI 활용능력) BASIC', 'NCS 강사', '직업능력훈련교사(영상분야)', '디지털 튜터', 'Google Workspace for Education Fundamentals', '평생교육사 2급', '사회복지사 1급'],
    book_label: '저서',
    book: '『AI야, 안녕!』 — 초등학교 저학년을 위한 AI수업 교재 (공저 · 기획 · 집필 · 편집)',
    links: [
      { label: '대표 스레드 @slowsoyang', href: 'https://www.threads.net/@slowsoyang' },
    ],

    rec_title: '대표 출강 이력',
    rec_note: '법인 설립 전 대표 개인으로 출강한 기관을 포함합니다.',
    org_groups: [
      { name: '공공기관', items: ['국민연금공단', '한국남동발전', '전북지방조달청', '전북문화관광재단', '전북평생교육장학진흥원', '순창군청'] },
      { name: '평생학습 · 지역', items: ['한국평생교육HRD진흥협회', '전북시민대학', '익산시평생학습관', '전주시평생학습관', '순창군평생학습관', '완주군귀농귀촌센터', '진안청년센터', '고창청소년문화센터'] },
      { name: '대학 · 학교', items: ['송호대학교', '순천대학교', '순천제일대학교', '호남제일고등학교', '전주덕진중학교', '익산남성중학교'] },
      { name: '기업 · 교육기관', items: ['핵심인재개발원', '신기술교육원', '(주)한터', '(주)큐라이트'] },
    ],
    col_title: '칼럼 연재 — 로컬M 「로컬시대와 새파트너 AI」',
    columns: [
      { t: 'AI시대, 우리 지역은 검색되고 있습니까?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4481' },
      { t: '맡길까, 직접 할까… 작은 카페를 알리는 세 가지 방법', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4405' },
      { t: '사흘 만에 사라진 AI, 통제권은 누구에게 있었나', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4367' },
    ],
    col_read: '읽기',

    contact_label: '출강 문의',
    contact_title: '어떤 교육이 필요하신가요?',
    contact_sub: '기관과 대상, 희망 일정을 알려 주시면 영업일 기준 2일 안에 연락드립니다.',
    contact_mail: '메일',
    contact_addr: '주소',
    contact_phone: '전화',
    tax_note: '기관 · 단체 계약 및 세금계산서 발행이 가능합니다.',
    form: {
      org: '기관 · 단체명', org_ph: '예: ○○평생학습관',
      name: '담당자 이름', phone: '연락처', email: '이메일 (선택)',
      target: '교육 대상', target_opts: ['공무원 · 공공기관 직원', '기업 임직원', '교사 · 강사', '중장년 · 시니어', '청소년', '일반 시민', '기타'],
      people: '예상 인원', people_ph: '예: 20명',
      course: '희망 분야', course_custom: '맞춤 과정 상담',
      schedule: '희망 일정', schedule_ph: '예: 11월 중, 주 1회',
      place: '교육 장소', place_ph: '예: 기관 PC실',
      message: '기타 요청사항', message_ph: '교육 목적, 참가자 수준, 준비된 장비 등',
      select: '선택해 주세요',
      consent: '개인정보 수집·이용에 동의합니다.', consent_link: '내용 보기',
      submit: '문의 보내기', sending: '보내는 중…',
      done_title: '문의가 접수되었습니다.', done_sub: '영업일 기준 2일 안에 연락드리겠습니다.',
    },

    footer_company: '주식회사 리프레임',
    footer_ceo: '대표 박선례',
    footer_biz: '사업자등록번호',
    footer_privacy: '개인정보처리방침',
    footer_family: '함께 운영하는 곳',
    copy: '© 2026 주식회사 리프레임 Re:Frame',
  },

  en: {
    nav: [
      { href: '#about', label: 'About' },
      { href: '#business', label: 'What we do' },
      { href: '#company', label: 'History' },
      { href: '#education', label: 'Training' },
      { href: '#ceo', label: 'Founder' },
    ],
    nav_cta: 'Contact',
    menu: 'Menu',

    hero_eyebrow: 'Re:Frame Inc. · An education company',
    hero_lines: [['In a new era,'], ['possibility begins with ', { em: 'learning' }, '.']],
    hero_sub: 'In a world reshaped by AI, we build education that lets anyone learn at their own pace and open new possibilities.',
    hero_cta1: 'Request a lecture',
    hero_cta2: 'See programs',
    journey_cap: 'How learning becomes possibility',
    journey: [
      { t: 'First encounter', d: 'AI literacy · digital basics' },
      { t: 'Use it at work', d: 'Work tasks · data · automation' },
      { t: 'Build your own', d: 'Vibe coding · agents · content' },
      { t: 'Teach & share', d: 'Trainer programs · local projects' },
      { t: 'New possibilities', d: 'At your own pace, in life and work', end: true },
    ],
    stats: [
      { n: TEACHING_YEARS, suffix: ' yrs', l: `Teaching (since ${TEACHING_SINCE})` },
      { n: 400, suffix: '+', l: 'AI lecture hours (2023~)' },
      { n: null, suffix: '', l: 'Organizations' },
    ],

    about_label: 'About',
    about_meaning: 'Reframing thinking and values for a new era.',
    about_p: 'Re:Frame Inc. builds AI education anyone can learn at their own pace — grounded in our commitment to the region, our belief in adult learning, and literacy that helps people read and communicate with technology. Working with public institutions, companies and lifelong-learning centers, we run hands-on programs and propose a new frame for learning in the AI era.',
    about_facts: [
      { k: 'Philosophy', v: 'Self-directed · Lifelong' },
      { k: 'Main area', v: 'Jeonbuk · Jeonnam' },
    ],
    values: [
      { title: 'Growing with our region', desc: 'Rooted in Jeonbuk, we bring learning opportunities to every corner of the region — so no community is left behind in the AI era.' },
      { title: 'We believe in adult learning', desc: 'It is never too late to learn. We design on adult-learning principles so mid-lifers and seniors can learn at their own pace.' },
      { title: 'Literacy and communication first', desc: 'Beyond tool skills — the power to read, judge and communicate with technology. AI literacy grounds every class.' },
    ],

    biz_label: 'What we do',
    biz_title: 'Education at the center, in three ways',
    biz: [
      { name: 'Institutional training', desc: 'On-site lectures for public institutions, companies, schools and learning centers; curriculum design and consulting; learning materials.', link: '#programs', cta: 'See programs' },
      { name: 'Re:frame News', desc: 'An online publication for educators and lifelong learning — AI in practice, education policy, local learning news.', link: NEWS_URL, cta: 'Visit', external: true },
      { name: 'Re:Frame Lifelong Learning Center', desc: 'An in-person learning center in Jeonju for individual learners.', status: 'Opening soon' },
    ],

    co_label: 'History',
    co_title: 'Born in the classroom, now a company',
    hist_groups: { ceo: "Founder's journey", co: 'Re:Frame Inc.' },
    history: [
      { y: `${TEACHING_SINCE}`, t: 'Began teaching in media education', who: 'ceo' },
      { y: '2023~', t: 'Focus on AI education — 400+ hours at public institutions, companies, schools', who: 'ceo' },
      { y: '2026.08', t: 'Re:Frame Inc. founded in Jeonju', who: 'co', start: true },
      { y: NEWS_DATE, t: 'Launched Re:frame News', who: 'co' },
      { y: '2026', t: 'Preparing the Re:Frame Lifelong Learning Center', who: 'co' },
    ],

    exp_label: 'Institutional training',
    exp_title: 'From design to content to the classroom',
    exp_sub: 'We visit public institutions, companies, schools and learning centers to run hands-on AI training.',
    exp: [
      { title: 'Tailored curriculum design', desc: "With a master's in lifelong education & HRD and a certified vocational training teacher, we design programs for each audience, goal and setting." },
      { title: 'AI content development', desc: 'We plan and develop textbooks, hands-on materials and curricula that keep pace with the fast-changing AI landscape.' },
      { title: 'Proven classroom experience', desc: 'Our founder has taught 400+ hours of AI since 2023 at public institutions, companies and lifelong-learning centers.' },
    ],

    prog_label: 'Training · Areas',
    prog_title: '4 tracks, 14 areas',
    prog_sub: 'Combined and tailored to each organization and audience. Select an area to see details.',
    groups: [
      { label: 'WORK', name: 'Gen AI at Work', gdesc: 'AI you can use at work right away', items: [
        { n: '01', title: 'Gen AI for Work', desc: 'Drafts of plans, reports, official letters and press releases; meeting summaries and emails' },
        { n: '02', title: 'Prompt Engineering', desc: 'Design prompts with the 4-step method (context · goal · request · format) and iterate' },
        { n: '03', title: 'AI Data Analysis · Visualization', desc: 'Clean Excel / Google Sheets data with AI, build charts and dashboards' },
        { n: '04', title: 'No-code Automation', desc: 'Design repetitive workflows without code; automate documents, email and data collection' },
      ]},
      { label: 'BUILD', name: 'Build · Automate · Platforms', gdesc: 'Build web apps and agents without code', items: [
        { n: '05', title: 'Vibe Coding (Web/App)', desc: 'Plan → build → deploy a web app with conversational AI (Claude), no coding background' },
        { n: '06', title: 'AI Agents', desc: 'Design purpose-built AI agents and delegate repetitive work' },
        { n: '07', title: 'Google AI Workspace', desc: 'Gemini · NotebookLM with Google Drive · Sheets · Docs · Forms' },
        { n: '08', title: 'Claude Master', desc: 'Desktop setup · Claude Cowork · Claude Code · skills · MCP · design' },
      ]},
      { label: 'CREATE', name: 'Content · Video', gdesc: 'From card news to video, planned and made with AI', items: [
        { n: '09', title: 'AI Content Creation', desc: 'Card news, posters and notices — plan and produce promotional content with AI tools' },
        { n: '10', title: 'Short-form Video', desc: 'Plan, shoot and edit short-form videos with a smartphone and AI tools' },
        { n: '11', title: 'AI Video Production', desc: '15 years of production know-how — the full workflow with Premiere and AI tools' },
      ]},
      { label: 'TEACH', name: 'Literacy · Teaching', gdesc: 'Using technology responsibly — and teaching it', items: [
        { n: '12', title: 'AI Literacy · Ethics · Copyright', desc: 'Sensitive-data rules, copyright of AI output, spotting and cross-checking misinformation' },
        { n: '13', title: 'Writing & Learning with AI', desc: 'Writing and research with AI; self-directed learning through verification' },
        { n: '14', title: 'Train the AI Trainer', desc: 'Curriculum design and hands-on facilitation for AI education instructors' },
      ]},
    ],

    fmt_label: 'Training · Formats',
    fmt_title: 'Sized to your organization',
    formats: [
      { name: 'Special lecture', spec: '1 session · 2–3 hrs', desc: 'Organization-wide AI awareness. Ideal for workshops and staff training days' },
      { name: 'Short course', spec: '3–5 sessions · 2–3 hrs each', desc: 'Hands-on practice with real work tools, by team or role' },
      { name: 'Advanced course', spec: '6–10 sessions · project-based', desc: 'Learners build their own deliverables. Suits automation, vibe coding, trainer programs' },
    ],
    fmt_common_title: 'Included in every program',
    fmt_common: ['Tailored slides and practice materials', 'PC lab, laptop or mobile setups', 'Final report with attendance and satisfaction', 'Corporate contract and tax invoice'],

    proc_label: 'Training · Process',
    proc_title: 'From inquiry to final report',
    steps: [
      { t: 'Inquiry', d: 'Tell us about your organization and the training you need.' },
      { t: 'Consultation', d: 'We confirm audience, group size, goals, venue and equipment.' },
      { t: 'Proposal', d: 'You receive a session-by-session curriculum and instructor profile for internal approval.' },
      { t: 'Contract', d: 'Signed with Re:Frame Inc.; tax invoice issued.' },
      { t: 'Delivery', d: 'Materials provided; pace adjusted to learners.' },
      { t: 'Final report', d: 'Attendance, satisfaction and field notes in one report.' },
    ],

    inst_label: 'Founder',
    inst_name: 'Park Sun-rye',
    inst_role: 'CEO, Re:Frame Inc. · Generative AI education specialist',
    univ: 'Jeonbuk National University Graduate School of Education',
    univ_sub: 'Lifelong Education & HRD (M.Ed.)',
    thesis: '"The Relationship between Learning Motivation and Academic Engagement of Middle-Aged Women in Digital Literacy Education"',
    bg: 'B.A. in Music · Film Scoring · 15 years in radio & video production',
    certs_label: 'Certifications',
    certs: ['AI Specialist Program - AI Service Development (KOREATECH)', 'AICE Basic (KT)', 'NCS Instructor', 'Vocational Training Teacher (Video)', 'Digital Tutor', 'Google Workspace for Education Fundamentals', 'Lifelong Educator Lv.2', 'Social Worker Lv.1'],
    book_label: 'Book',
    book: '"Hello, AI!" — an AI textbook for lower elementary (co-author · planning · writing · editing)',
    links: [
      { label: 'Threads @slowsoyang', href: 'https://www.threads.net/@slowsoyang' },
    ],

    rec_title: 'Where our founder has taught',
    rec_note: 'Includes engagements before the company was founded.',
    org_groups: [
      { name: 'Public institutions', items: ['National Pension Service', 'Korea South-East Power', 'Jeonbuk Regional Procurement Office', 'Jeonbuk Culture & Tourism Foundation', 'Jeonbuk Lifelong Education Institute', 'Sunchang County Office'] },
      { name: 'Lifelong learning · Local', items: ['Korea Lifelong Education & HRD Association', 'Jeonbuk Citizen University', 'Iksan Lifelong Learning Center', 'Jeonju Lifelong Learning Center', 'Sunchang Lifelong Learning Center', 'Wanju Return-to-Farm Center', 'Jinan Youth Center', 'Gochang Youth Culture Center'] },
      { name: 'Universities · Schools', items: ['Songho University', 'Sunchon National University', 'Suncheon Jeil University', 'Honam Jeil High School', 'Jeonju Deokjin Middle School', 'Iksan Namseong Middle School'] },
      { name: 'Companies · Training', items: ['Core Talent Development Institute', 'New Tech Training Institute', 'Hanteo Inc.', 'Qlight Inc.'] },
    ],
    col_title: 'Column in LocalM — "The Local Era and Its New Partner, AI"',
    columns: [
      { t: 'In the AI era, is your region searchable?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4481' },
      { t: 'Outsource or DIY? Three ways to market a small café', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4405' },
      { t: 'The AI that vanished in three days — who held the control?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4367' },
    ],
    col_read: 'Read',

    contact_label: 'Contact',
    contact_title: 'What training do you need?',
    contact_sub: 'Tell us about your organization, audience and schedule. We reply within two business days.',
    contact_mail: 'Email',
    contact_addr: 'Address',
    contact_phone: 'Phone',
    tax_note: 'Institutional contracts and tax invoices available.',
    form: {
      org: 'Organization', org_ph: 'e.g. Learning Center',
      name: 'Contact name', phone: 'Phone', email: 'Email (optional)',
      target: 'Audience', target_opts: ['Public servants · Public institutions', 'Company employees', 'Teachers · Instructors', 'Mid-life · Seniors', 'Youth', 'General public', 'Other'],
      people: 'Group size', people_ph: 'e.g. 20',
      course: 'Area of interest', course_custom: 'Custom program',
      schedule: 'Preferred schedule', schedule_ph: 'e.g. November, weekly',
      place: 'Venue', place_ph: 'e.g. our PC lab',
      message: 'Notes', message_ph: 'Goals, learner level, available equipment',
      select: 'Select',
      consent: 'I agree to the collection and use of personal information.', consent_link: 'Details',
      submit: 'Send inquiry', sending: 'Sending…',
      done_title: 'Your inquiry has been received.', done_sub: 'We will contact you within two business days.',
    },

    footer_company: 'Re:Frame Inc.',
    footer_ceo: 'CEO Park Sun-rye',
    footer_biz: 'Business reg. no.',
    footer_privacy: 'Privacy policy',
    footer_family: 'Also by Re:Frame',
    copy: '© 2026 Re:Frame Inc.',
  },
};

const ORG_COUNT = T.ko.org_groups.reduce((a, g) => a + g.items.length, 0);

// ── 공통 훅: 화면에 들어오면 .is-in 추가 (한 번만) ──────────────
function useReveal(dep) {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

// ── 숫자가 0부터 세어 올라감 (한 번만) ──────────────────────────
function CountUp({ to }) {
  const ref = useRef(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / 1200, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref} className="tabular-nums">{val}</span>;
}

// ── 첫 화면 인포그래픽 — 배움의 여정 ───────────────────────────
// 구슬 움직임 (9초 주기, 반복):
//  · 노드를 떠날 때는 평소 속도, 다음 노드에 가까워질수록 느려짐
//  · 노드 테두리에 닿는 순간 그 노드가 주황색으로 켜지며 살짝 커졌다 돌아오고 빛이 번짐
//  · 구슬은 멈추지 않고 노드 안(중심)까지 들어가 잠시 머문 뒤 다음 노드로
// 테두리에 닿는 시점을 정확히 맞추려고 노드 위치를 실측해 Web Animations로 만든다.
const JOURNEY = {
  cycle: 9000,
  startDelay: 3000,
  moves: [[0.03, 0.19], [0.24, 0.40], [0.45, 0.61], [0.66, 0.82]], // 노드 i → i+1 이동 구간
  firstLit: 0.02,   // 첫 노드가 켜지는 시점
  fadeOut: [0.92, 0.93],
  reset: 0.96,      // 이때부터 모두 흰색으로 복귀
  runnerR: 4,
  // 구간 앞부분: 출발 속도 그대로 → 끝에서 절반 속도로 (시작 기울기 1, 끝 기울기 0.5)
  cruise: [0.33, 0.33, 0.6, 0.8],
  // 구간 뒷부분(테두리 → 중심): 이어받은 속도에서 0으로 (시작 기울기 3)
  settle: [0.2, 0.6, 0.4, 1],
};
const ORANGE = '#F4581C';
const WHITE = '#FFFFFF';
const INK = '#1D1F24';

function buildJourneyAnimations(track) {
  // 위치는 레이아웃 좌표(offset*)로 잰다 — 나타나는 중인 이동·확대 효과와 무관하게 정확
  const line = track.querySelector('.journey-line');
  const horizontal = window.matchMedia('(min-width: 768px)').matches;
  const prop = horizontal ? 'left' : 'top';
  const nodes = [...track.querySelectorAll('.journey-node')];
  const pts = nodes.map(n => {
    const step = n.offsetParent;   // .journey-step (position: relative)
    return {
      c: horizontal
        ? step.offsetLeft + n.offsetLeft + n.offsetWidth / 2 - line.offsetLeft
        : step.offsetTop + n.offsetTop + n.offsetHeight / 2 - line.offsetTop,
      r: n.offsetWidth / 2,
    };
  });
  const J = JOURNEY;
  const bez = b => `cubic-bezier(${b.join(', ')})`;
  const at = c => `${(c - J.runnerR).toFixed(1)}px`;

  // 구슬 키프레임과 각 노드가 켜지는 시점(테두리 접촉) 계산
  const runner = [
    { offset: 0, [prop]: at(pts[0].c), opacity: 0 },
    { offset: J.firstLit, [prop]: at(pts[0].c), opacity: 1 },
  ];
  const litAt = [J.firstLit];
  J.moves.forEach(([a, b], i) => {
    const from = pts[i];
    const to = pts[i + 1];
    const dB = to.r + J.runnerR;                 // 테두리 접촉 → 중심 거리
    const dA = to.c - from.c - dB;               // 출발 중심 → 테두리 접촉 거리
    const kEnd = (1 - J.cruise[3]) / (1 - J.cruise[2]);
    const kStart = J.settle[1] / J.settle[0];
    // 앞 구간 끝 속도 = 뒤 구간 시작 속도가 되도록 시간 배분
    const tA = (b - a) / (1 + (kStart * dB) / (kEnd * dA));
    const contact = a + tA;
    runner.push({ offset: a, [prop]: at(from.c), easing: bez(J.cruise) });
    runner.push({ offset: contact, [prop]: at(to.c - dB), easing: bez(J.settle) });
    runner.push({ offset: b, [prop]: at(to.c) });
    litAt.push(contact);
  });
  const last = pts[pts.length - 1];
  runner.push({ offset: J.fadeOut[0], [prop]: at(last.c), opacity: 1 });
  runner.push({ offset: J.fadeOut[1], [prop]: at(last.c), opacity: 0 });
  runner.push({ offset: 1, [prop]: at(last.c), opacity: 0 });

  const timing = { duration: J.cycle, iterations: Infinity };
  const anims = [track.querySelector('.journey-runner').animate(runner, timing)];

  nodes.forEach((node, i) => {
    const t = litAt[i];
    const isEnd = i === nodes.length - 1;
    const ring = isEnd ? 16 : 10;
    const off = { background: WHITE, borderColor: INK, transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(244, 88, 28, 0)' };
    const on = { background: ORANGE, borderColor: ORANGE, transform: 'scale(1)', boxShadow: `0 0 0 ${ring}px rgba(244, 88, 28, 0)` };
    anims.push(node.animate([
      { offset: 0, ...off },
      { offset: t - 0.001, ...off },
      { offset: t, background: ORANGE, borderColor: ORANGE, transform: `scale(${isEnd ? 1.2 : 1.25})`, boxShadow: '0 0 0 0 rgba(244, 88, 28, .45)' },
      { offset: Math.min(t + 0.06, J.reset - 0.01), ...on },
      { offset: J.reset, ...on },
      { offset: 1, ...off },
    ], timing));
    if (isEnd) {
      anims.push(node.closest('.journey-step').querySelector('.journey-title').animate([
        { offset: 0, color: INK },
        { offset: t - 0.001, color: INK },
        { offset: t, color: '#C93E0C' },
        { offset: J.reset, color: '#C93E0C' },
        { offset: 1, color: INK },
      ], timing));
    }
  });
  return anims;
}

function Journey({ t }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let anims = [];
    let timer;
    const start = delay => {
      anims.forEach(a => a.cancel());
      anims = buildJourneyAnimations(track);
      anims.forEach(a => { a.currentTime = -delay; });
    };
    // 노드가 나타나는 애니메이션이 끝난 뒤(약 3초)에 측정·시작
    timer = setTimeout(() => start(0), JOURNEY.startDelay);
    let width = track.offsetWidth;
    const ro = new ResizeObserver(() => {
      if (track.offsetWidth === width) return;
      width = track.offsetWidth;
      clearTimeout(timer);
      timer = setTimeout(() => start(0), 200);
    });
    ro.observe(track);
    return () => { clearTimeout(timer); ro.disconnect(); anims.forEach(a => a.cancel()); };
  }, [t]);

  return (
    <figure className="journey" aria-label={t.journey_cap}>
      <figcaption className="journey-cap">{t.journey_cap}</figcaption>
      <div className="journey-track" ref={trackRef}>
        <div className="journey-line" aria-hidden="true">
          <span className="journey-line-fill" />
          <span className="journey-runner" />
        </div>
        <ol className="journey-list">
          {t.journey.map((s, i) => (
            <li key={s.t} className={`journey-step ${s.end ? 'is-end' : ''}`} style={{ '--i': i }}>
              <span className="journey-node" aria-hidden="true" />
              {!s.end && <span className="journey-no">{String(i + 1).padStart(2, '0')}</span>}
              <strong className="journey-title">{s.t}</strong>
              <span className="journey-desc">{s.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

// ── 연혁 — 대표 이력(점선)에서 법인(실선)으로 이어지는 세로선 ─────
// 구간 제목 행을 끼워 넣고, 행마다 제 몫의 선 조각을 그린다.
// 법인 설립 이전 조각은 점선, 설립부터는 실선.
function History({ t }) {
  const rows = [];
  t.history.forEach((h, i) => {
    const prev = t.history[i - 1];
    if (!prev || prev.who !== h.who) rows.push({ heading: t.hist_groups[h.who], who: h.who, first: !prev });
    rows.push(h);
  });
  const lastIdx = rows.length - 1;
  const startIdx = rows.findIndex(r => r.start);

  return (
    <ol className="relative">
      {rows.map((r, i) => {
        const dashed = 'border-sub/50 border-dashed';
        const solid = 'border-ink border-solid';
        const afterFirstHeading = rows[i - 1]?.first;
        // 행마다 [위 조각: 윗변→점] + [아래 조각: 점→아랫변]. 점 중심 = 28px
        const top = r.heading
          ? (r.first ? null : { style: { top: 0, bottom: 0 }, cls: dashed })
          : afterFirstHeading ? null : { style: { top: 0, height: '28px' }, cls: i <= startIdx ? dashed : solid };
        const bottom = r.heading || i === lastIdx ? null
          : { style: { top: '28px', bottom: 0 }, cls: i >= startIdx ? solid : dashed };
        return (
          <li key={r.heading ?? r.y + r.t} className={`relative pl-10 ${r.heading ? 'pt-8 first:pt-0 pb-1' : 'py-4'}`}>
            {[top, bottom].filter(Boolean).map((seg, k) => (
              <span key={k} aria-hidden="true" className={`absolute left-[11px] border-l-2 ${seg.cls}`} style={seg.style} />
            ))}
            {r.heading ? (
              <p className={`text-sm font-bold tracking-wide ${r.who === 'co' ? 'text-ink' : 'text-sub'}`}>{r.heading}</p>
            ) : (
              <>
                <span aria-hidden="true" className={`absolute top-[22px] rounded-full ${
                  r.start ? 'left-[4px] w-4 h-4 bg-accent'
                  : r.who === 'co' ? 'left-[6px] w-3 h-3 bg-ink'
                  : 'left-[6px] w-3 h-3 bg-white border-2 border-sub/60'}`} />
                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-4">
                  <span className={`font-heading font-bold tabular-nums ${r.who === 'co' ? 'text-ink' : 'text-sub'}`}>{r.y}</span>
                  <span className={r.start ? 'text-ink font-semibold' : r.who === 'co' ? 'text-ink' : 'text-sub'}>{r.t}</span>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ── 워드마크 — 콜론만 주황색 ───────────────────────────────────
function Wordmark({ className = '' }) {
  return (
    <span className={`font-heading font-bold tracking-tight ${className}`}>
      Re<span className="text-accent">:</span>Frame
    </span>
  );
}

function SectionHead({ label, title, sub }) {
  return (
    <div className="reveal md:col-span-4">
      <p className="text-base md:text-lg font-bold text-accent_deep mb-3 md:mb-4">{label}</p>
      {title && <h2 className="text-3xl md:text-4xl font-bold leading-[1.2] text-ink">{title}</h2>}
      {sub && <p className="text-sub mt-4 leading-relaxed whitespace-pre-line">{sub}</p>}
    </div>
  );
}

// ── 교육 분야 한 줄 — 누르면 설명이 펼쳐짐 ───────────────────────
function ProgramItem({ item }) {
  const [open, setOpen] = useState(false);
  const id = `prog-${item.n}`;
  return (
    <li className="border-t border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-baseline gap-4 py-4 text-left group"
      >
        <span className="text-xs font-semibold text-sub tabular-nums w-6 shrink-0">{item.n}</span>
        <span className="flex-1 text-[17px] font-semibold text-ink group-hover:text-accent_deep transition-colors">{item.title}</span>
        <span className={`text-sub text-xl leading-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
      </button>
      <div id={id} className={`fold ${open ? 'open' : ''}`}>
        <div>
          <p className="pl-10 pr-8 pb-5 text-sub leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </li>
  );
}

// ── 출강 문의 폼 ──────────────────────────────────────────────
function ContactForm({ t, lang }) {
  const [state, handleSubmit] = useForm('maqkjojj');
  const f = t.form;

  if (state.succeeded) {
    return (
      <div className="border border-line rounded-lg p-10 bg-surface" role="status">
        <p className="font-heading text-2xl font-bold text-ink mb-2">{f.done_title}</p>
        <p className="text-sub">{f.done_sub}</p>
      </div>
    );
  }

  const input = 'w-full bg-white border border-line rounded-md px-4 py-3 text-base text-ink placeholder:text-sub/60 focus:outline-none focus:border-ink transition-colors';
  const label = 'block text-sm font-semibold text-ink mb-1.5';
  const req = <span className="text-accent_deep" aria-hidden="true"> *</span>;

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
      <input type="hidden" name="_language" value={lang} />
      <div className="sm:col-span-2">
        <label htmlFor="f-org" className={label}>{f.org}{req}</label>
        <input id="f-org" type="text" name="organization" required className={input} placeholder={f.org_ph} />
        <ValidationError field="organization" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="f-name" className={label}>{f.name}{req}</label>
        <input id="f-name" type="text" name="name" required autoComplete="name" className={input} />
        <ValidationError field="name" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="f-phone" className={label}>{f.phone}{req}</label>
        <input id="f-phone" type="tel" name="phone" required autoComplete="tel" className={input} placeholder="010-0000-0000" />
        <ValidationError field="phone" errors={state.errors} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-email" className={label}>{f.email}</label>
        <input id="f-email" type="email" name="email" autoComplete="email" className={input} />
        <ValidationError field="email" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="f-target" className={label}>{f.target}{req}</label>
        <select id="f-target" name="target" required className={input} defaultValue="">
          <option value="" disabled>{f.select}</option>
          {f.target_opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-people" className={label}>{f.people}</label>
        <input id="f-people" type="text" name="people" className={input} placeholder={f.people_ph} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-course" className={label}>{f.course}{req}</label>
        <select id="f-course" name="course" required className={input} defaultValue="">
          <option value="" disabled>{f.select}</option>
          {t.groups.flatMap(g => g.items).map(item => (
            <option key={item.n} value={`${item.n} ${item.title}`}>{item.n} {item.title}</option>
          ))}
          <option value={f.course_custom}>{f.course_custom}</option>
        </select>
        <ValidationError field="course" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="f-schedule" className={label}>{f.schedule}</label>
        <input id="f-schedule" type="text" name="schedule" className={input} placeholder={f.schedule_ph} />
      </div>
      <div>
        <label htmlFor="f-place" className={label}>{f.place}</label>
        <input id="f-place" type="text" name="place" className={input} placeholder={f.place_ph} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className={label}>{f.message}</label>
        <textarea id="f-message" name="message" rows="4" className={input} placeholder={f.message_ph} />
        <ValidationError field="message" errors={state.errors} />
      </div>
      <div className="sm:col-span-2 flex items-start gap-3">
        <input id="f-consent" type="checkbox" name="consent" value="동의" required className="mt-1 w-4 h-4 accent-ink" />
        <label htmlFor="f-consent" className="text-sm text-ink">
          {f.consent}{req}{' '}
          <a href="/privacy.html" target="_blank" rel="noreferrer" className="underline underline-offset-2 text-sub hover:text-ink">{f.consent_link}</a>
        </label>
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state.submitting}
          className="btn-fill w-full sm:w-auto bg-ink text-white border border-ink px-8 py-3.5 rounded-md font-semibold disabled:opacity-50"
        >
          {state.submitting ? f.sending : <>{f.submit} <span className="arrow">→</span></>}
        </button>
      </div>
    </form>
  );
}

export default function App() {
  const [lang, setLang] = useState('ko');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useReveal(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const container = 'max-w-[1240px] mx-auto px-5 md:px-10';
  const section = 'py-20 md:py-28';

  return (
    <div className="bg-white text-ink">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-shadow ${menuOpen ? 'bg-white shadow-[0_8px_24px_rgba(29,31,36,.08)]' : 'bg-white/90'} ${scrolled ? 'shadow-[0_1px_0_#E3E4E0]' : ''}`}>
        <div className={`${container} h-16 md:h-[72px] flex items-center justify-between gap-6`}>
          <a href="#top" aria-label="Re:Frame">
            <Wordmark className="text-2xl text-ink" />
          </a>
          <nav aria-label="주 메뉴" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px] font-medium text-sub">
              {t.nav.map(n => (
                <li key={n.href}><a href={n.href} className="hover:text-ink transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#contact" className="btn-fill whitespace-nowrap bg-ink text-white border border-ink text-sm font-semibold px-3 sm:px-4 py-2 rounded-md">
              {t.nav_cta}
            </a>
            <div className="flex text-xs font-semibold" role="group" aria-label="Language">
              {['ko', 'en'].map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2 py-2 transition-colors ${lang === l ? 'text-ink' : 'text-sub/60 hover:text-ink'}`}
                >{l === 'ko' ? 'KR' : 'EN'}</button>
              ))}
            </div>
            <button
              type="button"
              className="lg:hidden w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-1.5"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t.menu}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${menuOpen ? 'translate-y-[3.75px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${menuOpen ? '-translate-y-[3.75px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={`lg:hidden fold ${menuOpen ? 'open' : ''}`}>
          <div>
            <ul className={`${container} pb-4 border-b border-line`}>
              {t.nav.map(n => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setMenuOpen(false)} className="block py-3 text-lg font-medium border-t border-line">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main id="top">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-28 md:pt-36 pb-20 md:pb-28">
          <div className={container}>
            <p className="fade-in text-base md:text-lg font-semibold text-sub mb-5 md:mb-7">{t.hero_eyebrow}</p>
            <h1 key={lang} className="text-[40px] leading-[1.14] sm:text-6xl md:text-7xl xl:text-[88px] font-bold text-ink">
              {t.hero_lines.map((line, i) => (
                <span key={i} className="line-mask">
                  <span style={{ '--d': `${120 + i * 110}ms` }}>
                    {line.map((part, j) => typeof part === 'string'
                      ? <React.Fragment key={j}>{part}</React.Fragment>
                      : <em key={j} className="not-italic text-accent">{part.em}</em>)}
                  </span>
                </span>
              ))}
            </h1>
            <div className="mt-8 md:mt-10 grid md:grid-cols-12 gap-6 md:gap-10 items-end">
              <p className="fade-in md:col-span-6 text-lg md:text-xl text-sub leading-relaxed" style={{ '--d': '420ms' }}>
                {t.hero_sub}
              </p>
              <div className="fade-in md:col-span-6 flex flex-wrap gap-3 md:justify-end" style={{ '--d': '540ms' }}>
                <a href="#contact" className="btn-fill bg-ink text-white border border-ink px-6 py-3.5 rounded-md font-semibold">
                  {t.hero_cta1} <span className="arrow">→</span>
                </a>
                <a href="#programs" className="border border-line bg-white text-ink px-6 py-3.5 rounded-md font-semibold hover:border-ink transition-colors">
                  {t.hero_cta2}
                </a>
              </div>
            </div>
          </div>
          <div className={`${container} mt-12 md:mt-16`}>
            <Journey t={t} />
          </div>
        </section>

        {/* ── 회사 소개 ─────────────────────────────────────── */}
        <section id="about" className={`${section} bg-surface`}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.about_label} />
            <div className="md:col-span-8">
              <p className="reveal font-heading text-3xl md:text-[40px] font-bold leading-[1.3] text-ink mb-8">
                <Wordmark /> — {t.about_meaning}
              </p>
              <p className="reveal text-lg text-sub leading-relaxed max-w-2xl mb-12">{t.about_p}</p>
              <dl className="reveal grid grid-cols-3 gap-6 border-t border-line pt-6 mb-16">
                {t.about_facts.map(f => (
                  <div key={f.k}>
                    <dt className="text-sm text-sub mb-1">{f.k}</dt>
                    <dd className="text-base sm:text-lg md:text-xl font-semibold text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="grid xl:grid-cols-3 gap-4">
                {t.values.map((v, i) => (
                  <div key={v.title} className="reveal" style={{ '--d': `${i * 100}ms` }}>
                    <div className="h-full bg-white border border-line rounded-lg p-7 grid sm:grid-cols-[180px_1fr] xl:block gap-x-8 gap-y-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(29,31,36,.07)]">
                      <h3 className="text-xl font-bold text-ink xl:mb-3">{v.title}</h3>
                      <p className="text-sub leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 사업 영역 ─────────────────────────────────────── */}
        <section id="business" className={section}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.biz_label} title={t.biz_title} />
            <div className="md:col-span-8 grid gap-4">
              {t.biz.map((b, i) => {
                const inner = (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
                      <h3 className="text-2xl font-bold text-ink">{b.name}</h3>
                      {b.status
                        ? <span className="shrink-0 text-xs font-semibold text-sub border border-line rounded-full px-3 py-1">{b.status}</span>
                        : <span className="shrink-0 text-sm font-semibold text-accent_deep pt-1.5">{b.cta} <span className="arrow">{b.external ? '↗' : '→'}</span></span>}
                    </div>
                    <p className="text-sub leading-relaxed max-w-xl">{b.desc}</p>
                  </>
                );
                const cls = 'reveal block border border-line rounded-lg p-7 md:p-8 transition-colors';
                return b.link ? (
                  <a key={b.name} href={b.link} {...(b.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`${cls} hover:border-ink`} style={{ '--d': `${i * 90}ms` }}>{inner}</a>
                ) : (
                  <div key={b.name} className={`${cls} bg-surface/60`} style={{ '--d': `${i * 90}ms` }}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 회사 개요 · 연혁 ─────────────────────────────── */}
        <section id="company" className={`${section} bg-surface`}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.co_label} title={t.co_title} />
            <div className="md:col-span-8">
              <div className="reveal">
                <History t={t} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 기관 교육 · 전문 역량 ─────────────────────────── */}
        <section id="education" className={section}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.exp_label} title={t.exp_title} sub={t.exp_sub} />
            <div className="md:col-span-8 grid md:grid-cols-3 gap-8 md:gap-10">
              {t.exp.map((e, i) => (
                <div key={e.title} className="reveal border-t-2 border-ink pt-5" style={{ '--d': `${i * 100}ms` }}>
                  <h3 className="text-xl font-bold text-ink mb-3">{e.title}</h3>
                  <p className="text-sub leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 교육 분야 ─────────────────────────────────────── */}
        <section id="programs" className={`${section} bg-surface`}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.prog_label} title={t.prog_title} sub={t.prog_sub} />
            <div className="md:col-span-8 grid lg:grid-cols-2 gap-x-10 gap-y-14">
              {t.groups.map((g, gi) => (
                <div key={g.label} className="reveal" style={{ '--d': `${(gi % 2) * 100}ms` }}>
                  <p className="text-xs font-semibold tracking-[0.12em] text-sub mb-2">{g.label}</p>
                  <h3 className="text-2xl font-bold text-ink mb-2">{g.name}</h3>
                  <p className="text-sub mb-5">{g.gdesc}</p>
                  <ul className="border-b border-line">
                    {g.items.map(item => <ProgramItem key={item.n} item={item} />)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 운영 형태 ─────────────────────────────────────── */}
        <section className={section}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.fmt_label} title={t.fmt_title} />
            <div className="md:col-span-8">
              <div className="border-t border-line">
                {t.formats.map((f, i) => (
                  <div key={f.name} className="reveal grid sm:grid-cols-12 gap-2 sm:gap-6 py-6 border-b border-line" style={{ '--d': `${i * 80}ms` }}>
                    <h3 className="sm:col-span-3 text-xl font-bold text-ink">{f.name}</h3>
                    <p className="sm:col-span-3 text-sm font-semibold text-accent_deep sm:pt-1.5 tabular-nums">{f.spec}</p>
                    <p className="sm:col-span-6 text-sub leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div className="reveal mt-10 bg-surface rounded-lg p-7">
                <p className="text-sm font-semibold text-ink mb-4">{t.fmt_common_title}</p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {t.fmt_common.map(c => (
                    <li key={c} className="flex gap-3 text-sub">
                      <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 진행 방식 ─────────────────────────────────────── */}
        <section id="process" className={`${section} bg-surface`}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.proc_label} title={t.proc_title} />
            <ol className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {t.steps.map((s, i) => (
                <li key={s.t} className="reveal" style={{ '--d': `${(i % 3) * 90}ms` }}>
                  <span className="font-heading text-sm font-bold text-accent_deep tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-bold text-ink mt-2 mb-2 pt-3 border-t border-line">{s.t}</h3>
                  <p className="text-sub leading-relaxed">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 대표 강사 ─────────────────────────────────────── */}
        <section id="ceo" className={section}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <SectionHead label={t.inst_label} />
            <div className="md:col-span-8 grid sm:grid-cols-12 gap-8">
              <div className="reveal sm:col-span-4">
                <div className="overflow-hidden rounded-lg aspect-[3/4] bg-surface max-w-[280px]">
                  <img
                    src={`${import.meta.env.BASE_URL}profile_seonrye_tall.jpg`}
                    alt={t.inst_name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="reveal sm:col-span-8" style={{ '--d': '100ms' }}>
                <h3 className="text-3xl font-bold text-ink">{t.inst_name}</h3>
                <p className="text-accent_deep font-semibold mt-1 mb-6">{t.inst_role}</p>
                <p className="text-ink"><span className="font-semibold">{t.univ}</span> — {t.univ_sub}</p>
                <p className="text-sub text-sm mt-1">{t.thesis}</p>
                <p className="text-sub mt-3">{t.bg}</p>
                <div className="border-t border-line mt-6 pt-5">
                  <p className="text-sm font-semibold text-ink mb-2">{t.certs_label}</p>
                  <p className="text-sub text-[15px] leading-relaxed">{t.certs.join(' · ')}</p>
                </div>
                <div className="border-t border-line mt-5 pt-5">
                  <p className="text-sm font-semibold text-ink mb-2">{t.book_label}</p>
                  <p className="text-sub text-[15px]">{t.book}</p>
                </div>
                <dl className="grid grid-cols-3 border-t border-ink mt-8">
                  {t.stats.map((st, i) => (
                    <div key={st.l} className={`pt-4 flex flex-col-reverse ${i > 0 ? 'pl-4 border-l border-line' : ''}`}>
                      <dt className="text-xs sm:text-sm text-sub mt-1">{st.l}</dt>
                      <dd className="font-heading text-3xl md:text-4xl font-bold text-ink">
                        <CountUp to={st.n ?? ORG_COUNT} />{st.suffix}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-2 mt-8">
                  {t.links.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                      className="text-sm border border-line rounded-md px-3.5 py-2 text-sub hover:text-ink hover:border-ink transition-colors">
                      {l.label} <span className="arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-start-5 md:col-span-8 mt-6">
              <div className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-8">
                <h3 className="text-2xl font-bold text-ink">{t.rec_title}</h3>
                <p className="text-sm text-sub">{t.rec_note}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                {t.org_groups.map((g, i) => (
                  <div key={g.name} className="reveal" style={{ '--d': `${(i % 2) * 90}ms` }}>
                    <p className="text-sm font-semibold text-ink pb-3 border-b border-ink mb-3">
                      {g.name} <span className="text-sub font-normal tabular-nums">{g.items.length}</span>
                    </p>
                    <ul className="space-y-1.5 text-sub">
                      {g.items.map(o => <li key={o}>{o}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="reveal mt-16">
                <p className="text-sm font-semibold text-ink mb-4">{t.col_title}</p>
                <ul className="border-t border-line">
                  {t.columns.map(c => (
                    <li key={c.u} className="border-b border-line">
                      <a href={c.u} target="_blank" rel="noreferrer" className="flex items-baseline justify-between gap-6 py-4 group">
                        <span className="text-ink font-medium group-hover:text-accent_deep transition-colors">{c.t}</span>
                        <span className="shrink-0 text-sm text-sub">{t.col_read} <span className="arrow">↗</span></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* ── 출강 문의 ─────────────────────────────────────── */}
        <section id="contact" className={section}>
          <div className={`${container} grid md:grid-cols-12 gap-10 md:gap-12`}>
            <div className="md:col-span-4">
              <SectionHead label={t.contact_label} title={t.contact_title} sub={t.contact_sub} />
              <dl className="reveal mt-10 space-y-5">
                <div>
                  <dt className="text-sm text-sub">{t.contact_mail}</dt>
                  <dd className="text-lg font-semibold text-ink select-all">{COMPANY.email}</dd>
                </div>
                {COMPANY.phone && (
                  <div>
                    <dt className="text-sm text-sub">{t.contact_phone}</dt>
                    <dd className="text-lg font-semibold text-ink">{COMPANY.phone}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-sub">{t.contact_addr}</dt>
                  <dd className="text-ink">{lang === 'ko' ? COMPANY.address : COMPANY.address_en}</dd>
                </div>
              </dl>
              <p className="reveal text-sm text-accent_deep font-semibold mt-8">{t.tax_note}</p>
            </div>
            <div className="reveal md:col-span-8" style={{ '--d': '100ms' }}>
              <ContactForm t={t} lang={lang} />
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-surface border-t border-line">
        <div className={`${container} py-12 grid md:grid-cols-12 gap-8 text-sm`}>
          <div className="md:col-span-7">
            <Wordmark className="text-xl text-ink" />
            <p className="text-sub mt-4 leading-relaxed">
              {t.footer_company} · {t.footer_ceo}
              {COMPANY.bizNo && <> · {t.footer_biz} {COMPANY.bizNo}</>}
              <br />
              {lang === 'ko' ? COMPANY.address : COMPANY.address_en} · {COMPANY.email}
              {COMPANY.phone && <> · {COMPANY.phone}</>}
            </p>
            <p className="mt-4">
              <a href="/privacy.html" className="font-semibold text-ink underline underline-offset-2">{t.footer_privacy}</a>
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-sub mb-2">{t.footer_family}</p>
            <a href={NEWS_URL} target="_blank" rel="noreferrer" className="font-semibold text-ink hover:text-accent_deep">
              Re<span className="text-accent">:</span>frame News <span className="arrow">↗</span>
            </a>
            <p className="text-sub mt-8">{t.copy}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
