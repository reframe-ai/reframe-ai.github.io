import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// ── 번역 텍스트 ────────────────────────────────────────────────
const T = {
  ko: {
    nav: { about: '소개', areas: '강의 분야', education: '교육 과정', instructors: '강사 소개', contact: '문의하기' },
    badge: 'AI 교육 전문 Re:Frame',
    h1: 'AI와 함께,',
    h2_accent: '가능성을',
    h2_rest: ' 열다.',
    sub: '천천히, 제대로 배우는 AI 교육 — 도구를 익히고, AI와 함께 생각하는 힘을 키웁니다.',
    cta1: '강의 분야 보기',
    cta2: '강사진 보기',
    cta3: '강의 문의하기',
    about_title: 'About Re:Frame',
    about_head1: '배움의 프레임을 다시 짜는',
    about_head2: 'AI 교육 전문기업',
    company_p: '(주)리프레임은 지역과 함께 성장하려는 마음, 성인의 배움에 대한 믿음, 그리고 기술을 읽고 소통하는 문해력을 바탕으로 누구나 자기 속도로 익힐 수 있는 AI 교육을 기획·개발합니다. 또한 공공기관·기업·평생교육기관과 함께 실습 중심의 교육을 운영하며, AI 시대 배움의 새로운 프레임을 제시합니다.',
    about_facts: [
      { k: '교육 철학', v: '삶의 경험이 배움의 자원이 됩니다' },
      { k: '주요 활동 지역', v: '전북 · 전남' },
    ],
    about_values: [
      { icon: 'region', title: '지역과 함께 성장합니다', desc: '전북에 뿌리를 두고 활동합니다. AI 시대에 지역이 소외되지 않도록, 배움의 기회를 지역 곳곳으로 넓힙니다.' },
      { icon: 'adult', title: '성인의 배움을 믿습니다', desc: '늦은 배움은 없습니다. 중장년·시니어도 자기 속도로 익힐 수 있도록, 성인 학습의 원리로 교육을 설계합니다.' },
      { icon: 'literacy', title: '문해력과 소통을 중심에 둡니다', desc: '도구 사용법을 넘어 기술을 읽고, 판단하고, 소통하는 힘 — AI 리터러시가 모든 수업의 바탕입니다.' },
    ],
    exp_badge: "Re:Frame's expertise",
    exp_head1: '배움과 AI를 잇는',
    exp_head2: '세 가지 전문 역량',
    exp_sub: '설계부터 콘텐츠, 현장까지 — 교육 전 과정을 아우르는 전문성으로 학습자와 현장에 꼭 맞는 교육을 만듭니다.',
    exp_items: [
      { n: '01', label: 'EDUCATION', icon: 'grad', title: '맞춤형 교육 설계', desc: '평생교육·HRD 석사와 직업능력훈련교사의 전문성으로, 대상·목적·환경에 맞는 교육과정을 정교하게 설계합니다.' },
      { n: '02', label: 'AI·CONTENT', icon: 'content', title: 'AI 콘텐츠 개발', desc: '빠르게 변화하는 AI 환경을 반영해 교재와 실습 자료, 커리큘럼을 직접 기획하고 개발합니다.' },
      { n: '03', label: 'EXPERIENCE', icon: 'field', title: 'AI 교육 현장경험', desc: '2023년부터 공공기관·기업·평생교육 현장에서 400시간 이상 — 강의실에서 검증된 방법으로 가르칩니다.' },
    ],
    stats: [
      { n: '10년+', l: '강의 경력' },
      { n: '400+', l: 'AI 교육 시간 (2023~)' },
      { n: '25+', l: '출강 기관' },
      { n: '11개', l: '강의 분야' },
    ],
    stats_note: '대표 강사 박선례 기준',
    bg1_1: '음악학 학사 · 필름스코어링 전공',
    bg1_2: '라디오·영상 기획·촬영·제작 실무 15년',
    univ: '전북대학교 교육대학원',
    univ_sub: '평생교육 및 HRD 전공 (석사)',
    thesis: '「디지털 리터러시 교육에서 중장년 여성의 학습동기와 학업적 열의의 관계」',
    certs: ['📜 AICE(AI 활용능력) BASIC', '📜 NCS 강사', '📜 평생교육사 2급', '📜 사회복지사 1급', '📜 직업능력훈련교사(영상분야)', '📜 AI특화인재양성교육 이수 (AI서비스개발 40시간)', '📜 Google Workspace for Education Fundamentals', '📜 디지털 튜터'],
    book: '『AI야, 안녕!』 — 초등학교 저학년을 위한 AI수업 교재 (공저 · 기획 · 집필 · 편집)',
    role_now: '(주)리프레임 Re:Frame 대표 · 한국평생교육HRD진흥협회 AI교육부장',
    tags: ['생성형 AI 업무 활용', '바이브코딩', 'AI 콘텐츠 제작', 'AI 리터러시 · 저작권'],
    quote_card: ['도구를 익히고,', 'AI와 함께 생각하는 힘을', '키웁니다.', '사용하는 것이 시작이라면,', '협업은 완성입니다.'],
    areas_title: '강의 분야',
    areas_sub: '11개 분야 · 3개 영역 — 기관과 대상에 맞춰 조합해 과정을 설계합니다',
    areas_cta: '강의 신청하기',
    areas_groups: [
      { id: 'A', name: 'AI 업무 실무', items: [
        { n: '01', title: '생성형 AI 업무 활용', desc: '사업계획서 · 보고서 · 공문 · 보도자료 초안, 회의록 요약과 업무 메일까지 행정 문서에 바로 적용' },
        { n: '02', title: '프롬프트 엔지니어링', desc: '4단계 질문법(배경 · 목적 · 요청 · 출력형식)으로 프롬프트를 설계하고 반복 개선' },
        { n: '03', title: 'AI 리터러시 · 윤리 · 저작권', desc: '민감정보 입력 기준, AI 생성물 저작권, 가짜정보 구별과 교차 검증' },
        { n: '04', title: 'AI 데이터 분석 · 시각화', desc: '엑셀 · 구글시트 데이터 정리와 AI 분석, 차트 · 대시보드 시각화' },
      ]},
      { id: 'B', name: '제작 · 자동화 · 개발', items: [
        { n: '05', title: '노코드 업무 자동화', desc: '코딩 없이 반복 업무 흐름을 설계하고 문서 · 메일 · 데이터 수집을 자동화' },
        { n: '06', title: 'AI 에이전트 구축 · 활용', desc: '업무 목적별 맞춤 AI 에이전트를 설계하고 반복 업무를 위임' },
        { n: '07', title: '바이브코딩 (웹/앱 만들기)', desc: '코딩 지식 없이 대화형 AI(Claude)로 웹앱을 기획 → 제작 → 배포까지' },
        { n: '08', title: 'AI 콘텐츠 제작', desc: '카드뉴스 · 포스터 · 안내문과 홍보 · 행사 숏폼 영상을 기획부터 자막 · 편집까지' },
      ]},
      { id: 'C', name: '학습 · 플랫폼 심화', items: [
        { n: '09', title: 'AI 활용 글쓰기 · 학습', desc: 'AI와 함께하는 글쓰기와 자료 조사, 스스로 검증하며 배우는 자기주도 학습법' },
        { n: '10', title: 'Google AI 워크스페이스 활용', desc: 'Gemini · NotebookLM과 Google 드라이브 · 시트 · 문서 · 폼 연동 업무' },
        { n: '11', title: 'Claude 마스터', desc: '데스크톱 설치 · Claude Cowork · Claude Code · 스킬 · MCP · 디자인 활용' },
      ]},
    ],
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
    inst_title: '대표 강사',
    inst_sub: '현장에서 검증된 대표 강사가 직접 강의합니다',
    inst1_name: '박선례', inst1_role: '대표 · 생성형 AI 활용 교육 전문 강사',
    inst2_name: '박선미', inst2_role: '전문 강사 · 미디어 리터러시 & 영상 교육',
    inst2_desc: '2008년부터 17년간 미디어센터와 학교 현장에서 다양한 계층을 만나온 베테랑 강사입니다. 전라북도교육청 미디어 리터러시 강사로 청소년 미디어 교육을 이끌고 있으며, 단편영화 연출 경험을 살린 생생한 영상 교육을 진행합니다.',
    inst2_certs: ['원광대학교 사범대학 일어교육과', '중등교원 2급 정교사', '미디어 리터러시 강사 · 전북특별자치도교육청', '익산공공영상미디어센터 미디어교육 강사 (2008~)', '디지털튜터 지도사'],
    trust_title: '칼럼 & 출강 실적',
    trust_sub: '글로 생각을 나누고, 현장으로 증명합니다',
    col_badge: '로컬M 칼럼 연재',
    col_name: '「로컬시대와 새파트너 AI」',
    col_desc: '지역의 눈으로 AI를 씁니다 — 인터넷신문 로컬M에 연재 중인 박선례 대표의 칼럼입니다.',
    col_read: '칼럼 읽기',
    columns: [
      { t: 'AI시대, 우리 지역은 검색되고 있습니까?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4481' },
      { t: '맡길까, 직접 할까… 작은 카페를 알리는 세 가지 방법', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4405' },
      { t: '사흘 만에 사라진 AI, 통제권은 누구에게 있었나', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4367' },
    ],
    orgs_title: '주요 출강 기관',
    orgs_note: '2023년부터 공공기관 · 기업 · 대학 · 평생교육기관에서 총 400시간 이상의 AI 교육을 진행했습니다.',
    orgs: ['국민연금공단', '한국남동발전', '전북지방조달청', '전북문화관광재단', '전북평생교육장학진흥원', '한국평생교육HRD진흥협회', '송호대학교', '순천대학교', '순천제일대학교', '전북시민대학', '익산시평생학습관', '전주시평생학습관', '순창군청', '순창군평생학습관', '완주군귀농귀촌센터', '진안청년센터', '고창청소년문화센터', '호남제일고등학교', '전주덕진중학교', '익산남성중학교', '핵심인재개발원', '신기술교육원', '(주)한터', '(주)큐라이트'],
    footer_title: '함께 기술을',
    footer_title2: ' 하세요.',
    footer_sub: '강의 문의는 신청 폼 또는 이메일로 연락해주세요.',
    tax_note: '기관 · 단체 계약 및 세금계산서 발행이 가능합니다.',
    biz1: '(주)리프레임 · 대표 박선례',
    biz2: '사업자등록번호 · 소재지 표기 준비 중 · pianossun@naver.com',
    copy: '© 2026 (주)리프레임 Re:Frame. All rights reserved.',
  },
  en: {
    nav: { about: 'About', areas: 'Lecture Areas', education: 'Curriculum', instructors: 'Instructor', contact: 'Contact' },
    badge: 'AI Education Experts · Re:Frame',
    h1: 'Opening possibilities,',
    h2_accent: 'together',
    h2_rest: ' with AI.',
    sub: 'Slow, steady, real AI education — learn the tools, build the thinking to collaborate with AI.',
    cta1: 'Lecture Areas',
    cta2: 'Meet the Instructors',
    cta3: 'Request a Lecture',
    about_title: 'About Re:Frame',
    about_head1: 'Reframing how we learn —',
    about_head2: 'an AI education company',
    company_p: 'Re:Frame Inc. builds AI education anyone can learn at their own pace — grounded in our commitment to the region, our belief in adult learning, and literacy that helps people read and communicate with technology. Working with public institutions, companies and lifelong-learning centers, we run hands-on programs and propose a new frame for learning in the AI era.',
    about_facts: [
      { k: 'Teaching philosophy', v: 'Life experience is a resource for learning' },
      { k: 'Main service area', v: 'Jeonbuk · Jeonnam' },
    ],
    about_values: [
      { icon: 'region', title: 'Growing with our region', desc: 'Rooted in Jeonbuk, we bring learning opportunities to every corner of the region — so no community is left behind in the AI era.' },
      { icon: 'adult', title: 'We believe in adult learning', desc: 'It is never too late to learn. We design education on adult-learning principles so mid-lifers and seniors can learn at their own pace.' },
      { icon: 'literacy', title: 'Literacy and communication first', desc: 'Beyond tool skills — the power to read, judge and communicate with technology. AI literacy grounds every class.' },
    ],
    exp_badge: "Re:Frame's expertise",
    exp_head1: 'Three core competencies',
    exp_head2: 'connecting learning and AI',
    exp_sub: 'From design to content to the classroom — expertise across the whole journey of education.',
    exp_items: [
      { n: '01', label: 'EDUCATION', icon: 'grad', title: 'Tailored curriculum design', desc: "With a master's in lifelong education & HRD and a certified vocational training teacher, we design programs that fit each audience, goal and environment." },
      { n: '02', label: 'AI·CONTENT', icon: 'content', title: 'AI content development', desc: 'We plan and develop textbooks, hands-on materials and curricula that keep pace with the fast-changing AI landscape.' },
      { n: '03', label: 'EXPERIENCE', icon: 'field', title: 'Proven classroom experience', desc: 'Over 400 hours since 2023 at public institutions, companies and lifelong-learning centers — we teach only what we have verified in real classrooms.' },
    ],
    stats: [
      { n: '10+ yrs', l: 'Teaching experience' },
      { n: '400+', l: 'AI lecture hours (2023~)' },
      { n: '25+', l: 'Organizations served' },
      { n: '11', l: 'Lecture areas' },
    ],
    stats_note: 'Based on lead instructor Park Sun-rye',
    bg1_1: 'B.A. in Music · Film Scoring',
    bg1_2: '15 years in radio & video production',
    univ: 'Jeonbuk National University Graduate School of Education',
    univ_sub: 'Lifelong Education & HRD (M.Ed.)',
    thesis: '"The Relationship between Learning Motivation and Academic Engagement of Middle-Aged Women in Digital Literacy Education"',
    certs: ['📜 AICE Basic (KT)', '📜 NCS Instructor', '📜 Lifelong Educator Lv.2', '📜 Social Worker Lv.1', '📜 Vocational Training Teacher (Video)', '📜 AI Specialist Program (40h, AI service dev)', '📜 Google Workspace for Education Fundamentals', '📜 Digital Tutor'],
    book: '"Hello, AI!" — an AI textbook for lower elementary (co-author · planning · writing · editing)',
    role_now: 'CEO, Re:Frame Inc. · Head of AI Education, Korea Lifelong Education & HRD Association',
    tags: ['Gen AI at Work', 'Vibe Coding', 'AI Content Creation', 'AI Literacy · Copyright'],
    quote_card: ['Learn the tools,', 'build the thinking', 'to collaborate with AI.', 'If using it is the start,', 'collaboration is the finish.'],
    areas_title: 'Lecture Areas',
    areas_sub: '11 areas in 3 tracks — combined and tailored to each organization and audience',
    areas_cta: 'Request a Lecture',
    areas_groups: [
      { id: 'A', name: 'Gen AI at Work', items: [
        { n: '01', title: 'Gen AI for Work', desc: 'Drafts of plans, reports, official letters and press releases; meeting summaries and emails' },
        { n: '02', title: 'Prompt Engineering', desc: 'Design prompts with the 4-step method (context · goal · request · format) and iterate' },
        { n: '03', title: 'AI Literacy · Ethics · Copyright', desc: 'Sensitive-data rules, copyright of AI output, spotting and cross-checking misinformation' },
        { n: '04', title: 'AI Data Analysis · Visualization', desc: 'Clean Excel / Google Sheets data with AI, build charts and dashboards' },
      ]},
      { id: 'B', name: 'Build · Automate · Create', items: [
        { n: '05', title: 'No-code Automation', desc: 'Design repetitive workflows without code; automate documents, email and data collection' },
        { n: '06', title: 'AI Agents', desc: 'Design purpose-built AI agents and delegate repetitive work' },
        { n: '07', title: 'Vibe Coding (Web/App)', desc: 'Plan → build → deploy a web app with conversational AI (Claude), no coding background' },
        { n: '08', title: 'AI Content Creation', desc: 'Card news, posters, notices and short-form videos from planning to captions and editing' },
      ]},
      { id: 'C', name: 'Learning · Platforms', items: [
        { n: '09', title: 'Writing & Learning with AI', desc: 'Writing and research with AI; self-directed learning through verification' },
        { n: '10', title: 'Google AI Workspace', desc: 'Gemini · NotebookLM with Google Drive · Sheets · Docs · Forms' },
        { n: '11', title: 'Claude Master', desc: 'Desktop setup · Claude Cowork · Claude Code · skills · MCP · design' },
      ]},
    ],
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
    inst_title: 'Lead Instructor',
    inst_sub: 'Field-proven, taught directly by our lead instructor',
    inst1_name: 'Park Sun-rye', inst1_role: 'CEO · Generative AI Education Specialist',
    inst2_name: 'Park Seon-mi', inst2_role: 'Instructor · Media Literacy & Video Education',
    inst2_desc: 'A veteran educator with 17 years of experience (since 2008) at media centers and schools. Currently a media literacy instructor for the Jeonbuk Office of Education, she brings her background in short-film directing to vivid, hands-on video education.',
    inst2_certs: ['B.A. in Japanese Education, Wonkwang University', 'Secondary School Teacher Certificate Lv.2', 'Media Literacy Instructor · Jeonbuk Office of Education', 'Media Educator, Iksan Public Media Center (2008~)', 'Certified Digital Tutor'],
    trust_title: 'Column & Track Record',
    trust_sub: 'Sharing ideas in writing, proving them in the field',
    col_badge: 'LocalM Column',
    col_name: '"The Local Era and Its New Partner, AI"',
    col_desc: 'A column by CEO Park Sun-rye in the local news outlet LocalM — writing about AI through a local lens.',
    col_read: 'Read',
    columns: [
      { t: 'In the AI era, is your region searchable?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4481' },
      { t: 'Outsource or DIY? Three ways to market a small café', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4405' },
      { t: 'The AI that vanished in three days — who held the control?', u: 'https://localm.kr/bbs/board.php?bo_table=news&wr_id=4367' },
    ],
    orgs_title: 'Selected Client Organizations',
    orgs_note: 'Over 400 hours of AI education since 2023 for public institutions, companies, universities and lifelong-learning centers.',
    orgs: ['National Pension Service', 'Korea South-East Power', 'Jeonbuk Regional Procurement Office', 'Jeonbuk Culture & Tourism Foundation', 'Jeonbuk Lifelong Education Institute', 'Korea Lifelong Education & HRD Association', 'Songho University', 'Sunchon National University', 'Suncheon Jeil University', 'Jeonbuk Citizen University', 'Iksan Lifelong Learning Center', 'Jeonju Lifelong Learning Center', 'Sunchang County Office', 'Sunchang Lifelong Learning Center', 'Wanju Return-to-Farm Center', 'Jinan Youth Center', 'Gochang Youth Culture Center', 'Honam Jeil High School', 'Jeonju Deokjin Middle School', 'Iksan Namseong Middle School', 'Core Talent Development Institute', 'New Tech Training Institute', 'Hanteo Inc.', 'Qlight Inc.'],
    footer_title: "Let's Re:",
    footer_title2: 'Frame technology together.',
    footer_sub: 'For inquiries, please use the form or email.',
    tax_note: 'Institutional contracts and tax invoices available.',
    biz1: 'Re:Frame Inc. · CEO Park Sun-rye',
    biz2: 'Business registration & address coming soon · pianossun@naver.com',
    copy: '© 2026 Re:Frame Inc. All rights reserved.',
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

    const isMobile = window.innerWidth < 768;
    const dotCount = isMobile ? 20 : 55;
    const dotSpeed = isMobile ? 0.2 : 0.4;
    const dotSize = isMobile ? 2 : 2.5;
    const dotSizeRange = isMobile ? 2 : 4;
    const linkDist = isMobile ? 140 : 220;
    const lineAlpha = isMobile ? 0.1 : 0.18;

    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * dotSpeed,
      vy: (Math.random() - 0.5) * dotSpeed,
      r: Math.random() * dotSizeRange + dotSize,
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
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(244, 88, 28, ${lineAlpha * (1 - dist / linkDist)})`;
            ctx.lineWidth = isMobile ? 0.5 : 0.8;
            ctx.stroke();
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 88, 28, 0.30)';
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
const WORDS = ['실습 중심', '맞춤교육', '리터러시', '바이브 코딩'];

// ── 가치·역량 카드 아이콘 ──────────────────────────────────────
const VALUE_ICONS = {
  region: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  adult: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <circle cx="17.5" cy="8" r="3" /><path d="M22 21v-1.5a4 4 0 0 0-3-3.9" />
    </svg>
  ),
  literacy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2Z" /><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7Z" />
    </svg>
  ),
  grad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M22 9 12 4 2 9l10 5Z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /><path d="M22 9v5" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m12 2 9 5-9 5-9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" />
    </svg>
  ),
  field: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 4h18" /><path d="M5 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4" />
      <path d="M12 15v3" /><path d="M8 21l4-3 4 3" />
    </svg>
  ),
};

// ── 히어로 배경 슬라이드쇼 (디졸브 전환 + Ken Burns) ────────────
const HERO_IMAGES = ['hero/hero-1.jpg', 'hero/hero-2.jpg', 'hero/hero-3.jpg', 'hero/hero-4.jpg', 'hero/hero-5.jpg', 'hero/hero-6.jpg'];

function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={`${import.meta.env.BASE_URL}${src}`}
          alt=""
          className={`hero-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* 다크 오버레이 — 텍스트 가독성 확보 */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg_dark/95 via-bg_dark/85 to-bg_dark/65" />
    </div>
  );
}

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

  const inputClass = "w-full bg-[#3A3733] border border-white/30 rounded-xl px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent transition";
  const labelClass = "text-white/70 text-xs font-medium mb-1.5 block";

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
          <option value="01 생성형 AI 업무 활용">{lang === 'ko' ? '01 생성형 AI 업무 활용' : '01 Gen AI for Work'}</option>
          <option value="02 프롬프트 엔지니어링">{lang === 'ko' ? '02 프롬프트 엔지니어링' : '02 Prompt Engineering'}</option>
          <option value="03 AI 리터러시 · 윤리 · 저작권">{lang === 'ko' ? '03 AI 리터러시 · 윤리 · 저작권' : '03 AI Literacy · Ethics · Copyright'}</option>
          <option value="04 AI 데이터 분석 · 시각화">{lang === 'ko' ? '04 AI 데이터 분석 · 시각화' : '04 AI Data Analysis · Visualization'}</option>
          <option value="05 노코드 업무 자동화">{lang === 'ko' ? '05 노코드 업무 자동화' : '05 No-code Automation'}</option>
          <option value="06 AI 에이전트 구축 · 활용">{lang === 'ko' ? '06 AI 에이전트 구축 · 활용' : '06 AI Agents'}</option>
          <option value="07 바이브코딩 (웹/앱 만들기)">{lang === 'ko' ? '07 바이브코딩 (웹/앱 만들기)' : '07 Vibe Coding (Web/App)'}</option>
          <option value="08 AI 콘텐츠 제작">{lang === 'ko' ? '08 AI 콘텐츠 제작' : '08 AI Content Creation'}</option>
          <option value="09 AI 활용 글쓰기 · 학습">{lang === 'ko' ? '09 AI 활용 글쓰기 · 학습' : '09 Writing & Learning with AI'}</option>
          <option value="10 Google AI 워크스페이스 활용">{lang === 'ko' ? '10 Google AI 워크스페이스 활용' : '10 Google AI Workspace'}</option>
          <option value="11 Claude 마스터">{lang === 'ko' ? '11 Claude 마스터' : '11 Claude Master'}</option>
          <option value="시그니처 과정 (AI 영상제작의 모든 것)">{lang === 'ko' ? '시그니처 과정 (AI 영상제작의 모든 것)' : 'Signature (AI Video Production)'}</option>
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
        className="w-full bg-accent text-white py-3 rounded-full font-semibold hover:bg-accent_deep transition disabled:opacity-50"
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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-bg_cream text-main antialiased"
      style={{ fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
    >

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg_dark/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-heading flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
            <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0" aria-hidden="true">
              <path d="M40 22 H25 V78 H40" fill="none" stroke="currentColor" strokeWidth="10" />
              <path d="M60 22 H75 V78 H60" fill="none" stroke="currentColor" strokeWidth="10" />
              <circle cx="50" cy="40" r="7.5" fill="#F4581C" />
              <circle cx="50" cy="60" r="7.5" fill="#F4581C" />
            </svg>
            Re:<span className="text-accent">Frame</span>
          </a>
          <div className="flex items-center gap-5">
            <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-white/70">
              <li><a href="#about"       className="hover:text-accent transition">{t.nav.about}</a></li>
              <li><a href="#areas"       className="hover:text-accent transition">{t.nav.areas}</a></li>
              <li><a href="#education"   className="hover:text-accent transition">{t.nav.education}</a></li>
              <li><a href="#instructors" className="hover:text-accent transition">{t.nav.instructors}</a></li>
            </ul>
            <a
              href="#contact"
              className="hidden sm:inline-block bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent_deep transition"
            >
              {t.nav.contact}
            </a>
            <div className="flex items-center gap-1 border-l border-white/15 pl-4">
              <button
                onClick={() => setLang('ko')}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${lang === 'ko' ? 'bg-white text-main' : 'text-white/50 hover:bg-white/10'}`}
              >KR</button>
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${lang === 'en' ? 'bg-white text-main' : 'text-white/50 hover:bg-white/10'}`}
              >EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-bg_dark overflow-hidden">
        {/* 배경 슬라이드쇼 */}
        <HeroSlideshow />
        {/* 격자 패턴 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 animate-fade-in-up">

          {/* 애니메이션 태그 목록 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-500 ${
                  i === wordIdx
                    ? 'bg-accent text-white scale-105'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          {/* 배지 */}
          <div className="inline-flex items-center gap-1.5 border border-accent/50 text-[#F79A6E] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            ✦ {t.badge}
          </div>

          {/* 헤드라인 */}
          <h1 className="text-4xl md:text-7xl font-black leading-[1.14] mb-3 text-white">
            {t.h1}
          </h1>
          <h2 className="text-3xl md:text-6xl font-black leading-[1.14] mb-6 text-white">
            <span className="text-accent">{t.h2_accent}</span>{t.h2_rest}
          </h2>
          <p className="text-[#B8B2AC] text-lg md:text-xl mb-10 max-w-2xl">
            {t.sub}
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#areas"
              className="bg-accent text-white px-7 py-3 rounded-full font-semibold hover:bg-accent_deep transition shadow-sm"
            >
              {t.cta1} →
            </a>
            <a
              href="#contact"
              className="border-2 border-white/40 text-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-main transition"
            >
              {t.cta3}
            </a>
          </div>

          {/* 지표 바 */}
          <div className="mt-14 max-w-3xl">
            <p className="text-white/40 text-xs mb-2">{t.stats_note}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-6">
              {t.stats.map((s, i) => (
                <div key={s.l} className={`text-center px-3 ${i > 0 ? 'sm:border-l sm:border-white/10' : ''}`}>
                  <p className="font-heading font-black text-accent text-3xl leading-none mb-1.5 whitespace-nowrap">{s.n}</p>
                  <p className="text-white/60 text-xs">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 소개 (ABOUT) ──────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 bg-bg_cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* 왼쪽: 배지 + 헤드라인 + 소개문 + 팩트 카드 */}
          <div>
            <span className="inline-block bg-accent_tint text-accent_deep text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              {t.about_title}
            </span>
            <h2 className="text-3xl md:text-[2.5rem] font-black text-main leading-[1.28] mb-6">
              {t.about_head1}<br />{t.about_head2}
            </h2>
            <p className="text-sub text-base md:text-lg leading-relaxed mb-10">
              {t.company_p}
            </p>
            <div className="grid grid-cols-5 gap-4">
              {t.about_facts.map((f, i) => (
                <div key={f.k} className={`bg-white border border-main/8 rounded-2xl px-6 py-6 ${i === 0 ? 'col-span-3' : 'col-span-2'}`}>
                  <p className="text-sub text-sm mb-2">{f.k}</p>
                  <p className="text-main text-xl md:text-2xl font-bold leading-snug break-keep">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 가치 카드 3개 */}
          <div className="space-y-5">
            {t.about_values.map(v => (
              <div key={v.title} className="bg-white border border-main/8 rounded-2xl p-7 flex gap-5 items-start shadow-sm">
                <span className="w-12 h-12 rounded-xl bg-accent_tint text-accent_deep flex items-center justify-center shrink-0">
                  {VALUE_ICONS[v.icon]}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-main mb-1.5">{v.title}</h3>
                  <p className="text-sub text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 전문 역량 (EXPERTISE) ─────────────────────────────── */}
      <section className="py-24 px-6 bg-card_bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent_tint text-accent_deep text-sm font-bold px-4 py-1.5 rounded-full mb-5">
              {t.exp_badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-main leading-[1.3] mb-4">
              {t.exp_head1}<br />{t.exp_head2}
            </h2>
            <p className="text-sub max-w-2xl mx-auto">{t.exp_sub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {t.exp_items.map(item => (
              <div key={item.n} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-start justify-between mb-10">
                  <span className="w-12 h-12 rounded-xl bg-accent_tint text-accent_deep flex items-center justify-center">
                    {VALUE_ICONS[item.icon]}
                  </span>
                  <span className="font-heading font-black text-5xl text-accent/20 leading-none select-none">{item.n}</span>
                </div>
                <p className="text-accent_deep text-xs font-bold tracking-[0.15em] mb-2">{item.label}</p>
                <h3 className="text-xl font-bold text-main mb-3">{item.title}</h3>
                <p className="text-sub text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 강의 분야 (11개) ───────────────────────────────────── */}
      <section id="areas" className="py-20 px-6 bg-bg_cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-3">{t.areas_title}</h2>
            <p className="text-sub">{t.areas_sub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {t.areas_groups.map(g => (
              <div key={g.id} className="bg-white rounded-2xl p-7 shadow-sm border border-main/5">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-main/8">
                  <span className="w-9 h-9 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center shrink-0">{g.id}</span>
                  <h3 className="text-lg font-bold text-main leading-snug">{g.name}</h3>
                </div>
                <ul className="space-y-5">
                  {g.items.map(item => (
                    <li key={item.n}>
                      <p className="text-[15px] font-bold text-main leading-snug flex gap-2">
                        <span className="text-accent_deep shrink-0">{item.n}</span>
                        {item.title}
                      </p>
                      <p className="text-[13px] text-sub leading-relaxed mt-1 pl-7">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block bg-main text-white px-7 py-3 rounded-full font-semibold hover:bg-[#444] transition shadow-sm"
            >
              {t.areas_cta} →
            </a>
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
              <p className="text-accent_deep font-medium italic mb-2">{t.b1_tag}</p>
              <p className="text-sm text-sub">{t.b1_desc}</p>
            </div>

            <div className="bg-accent rounded-2xl p-8 shadow-md relative">
              <span className="absolute top-4 right-4 bg-white text-accent_deep text-xs font-bold px-2.5 py-1 rounded-full">
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
              <p className="text-accent_deep font-medium italic mb-2">{t.b3_tag}</p>
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
                className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold w-fit hover:bg-accent_deep transition"
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
              <span className="absolute top-4 right-4 bg-white text-accent_deep text-xs font-bold px-2.5 py-1 rounded-full">FEATURED</span>
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

      {/* ── 강사진 ────────────────────────────────────────────── */}
      <section id="instructors" className="py-20 px-6 bg-card_bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-3">{t.inst_title}</h2>
            <p className="text-sub">{t.inst_sub}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* 박선례 대표 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-main/5">
              <div className="grid grid-cols-3">
                <img
                  src={`${import.meta.env.BASE_URL}profile_seonrye_v2.png`}
                  alt={t.inst1_name}
                  className="w-full h-full object-cover col-span-1 min-h-[200px]"
                />
                <div className="col-span-2 p-6">
                  <h3 className="text-xl font-bold text-main">{t.inst1_name}</h3>
                  <p className="text-accent_deep text-sm font-medium mb-3">{t.inst1_role}</p>
                  <p className="font-bold text-main text-sm leading-snug">{t.univ}</p>
                  <p className="text-sub text-sm">{t.univ_sub}</p>
                  <p className="text-sub/60 text-xs mt-1 italic">{t.thesis}</p>
                  <p className="text-sub text-sm mt-2">{t.bg1_1} · {t.bg1_2}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-main/70 mb-4">
                  {t.certs.map(c => <span key={c}>{c}</span>)}
                </div>
                <div className="bg-bg_cream rounded-xl px-4 py-2.5 mb-2 text-xs text-main/80">
                  <span className="text-accent_deep font-bold mr-2">저서</span>{t.book}
                </div>
                <div className="bg-bg_cream rounded-xl px-4 py-2.5 mb-4 text-xs text-main/80">
                  <span className="text-accent_deep font-bold mr-2">현 소속</span>{t.role_now}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://www.threads.net/@slowsoyang" target="_blank" rel="noreferrer"
                    className="border border-main/15 text-main/70 text-xs px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition">
                    스레드 @slowsoyang
                  </a>
                  <a href="https://blog.naver.com/frameview-" target="_blank" rel="noreferrer"
                    className="border border-main/15 text-main/70 text-xs px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition">
                    네이버 블로그
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 칼럼 & 출강 실적 ──────────────────────────────────── */}
      <section id="trust" className="py-20 px-6 bg-bg_cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-3">{t.trust_title}</h2>
            <p className="text-sub">{t.trust_sub}</p>
          </div>

          {/* 로컬M 칼럼 */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{t.col_badge}</span>
              <h3 className="text-lg font-bold text-main">{t.col_name}</h3>
            </div>
            <p className="text-sub text-sm mb-5">{t.col_desc}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {t.columns.map(c => (
                <a key={c.u} href={c.u} target="_blank" rel="noreferrer"
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-main/5 flex flex-col justify-between gap-4 hover:border-accent/40 hover:shadow-md transition">
                  <p className="text-main font-bold leading-snug group-hover:text-accent transition">{c.t}</p>
                  <span className="text-accent_deep text-sm font-medium">{t.col_read} →</span>
                </a>
              ))}
            </div>
          </div>

          {/* 출강 기관 */}
          <div>
            <h3 className="text-lg font-bold text-main mb-2">{t.orgs_title}</h3>
            <p className="text-sub text-sm mb-5">{t.orgs_note}</p>
            <div className="flex flex-wrap gap-2">
              {t.orgs.map(o => (
                <span key={o} className="bg-white border border-main/10 text-main/70 text-sm px-4 py-1.5 rounded-full">
                  {o}
                </span>
              ))}
            </div>
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
              <p className="text-accent/90 text-sm mt-2 font-medium">{t.tax_note}</p>
              <div className="space-y-3 mt-8">
                <a href="mailto:pianossun@naver.com" className="flex items-center gap-3 bg-[#3A3733] rounded-xl px-5 py-3.5 hover:bg-[#443F3B] transition">
                  <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white text-base">✉</span>
                  <span className="text-white font-medium text-sm">pianossun@naver.com</span>
                </a>
                <a href="https://reframe-daily.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#3A3733] rounded-xl px-5 py-3.5 hover:bg-[#443F3B] transition">
                  <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-bold text-base">AI</span>
                  <span className="text-white font-medium text-sm">{lang === 'ko' ? '오늘의 AI — 매일 업데이트되는 AI 소식' : 'AI Today — daily AI news curation'}</span>
                </a>
              </div>
            </div>
            <ContactForm lang={lang} />
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p className="text-[#777] mb-1">{t.biz1}</p>
            <p className="text-[#555] text-xs mb-4">{t.biz2}</p>
            <p className="text-[#555]">{t.copy}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
