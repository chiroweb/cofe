# WMF Professional Coffee Machines 웹사이트 — 분석 보고서 & 홈페이지 제작 가이드

---

## 목차 (Table of Contents)

### Part A — 홈페이지 제작 기본 세팅
- [A-1. 필수 환경](#a-1-필수-환경)
- [A-2. 프로젝트 초기화](#a-2-프로젝트-초기화)
- [A-3. 의존성 설치](#a-3-의존성-설치)
- [A-4. 디렉토리 구조](#a-4-디렉토리-구조)
- [A-5. CSS/디자인 토큰](#a-5-css디자인-토큰)
- [A-6. 개발 체크리스트 요약](#a-6-개발-체크리스트-요약)

### Part B — 해체 분석 보고서 본문
- [0. 기술 스택](#0-기술-스택-완전-확정)
- [1. 사이트맵 & 페이지 구조](#1-사이트맵--페이지-구조)
- [2. 랜딩 페이지 핵심 구조](#2-랜딩-페이지-핵심-구조--수평-벤토-그리드)
- [3. 인터랙션 시스템](#3-인터랙션-시스템)
- [4. 제품 페이지 구조](#4-제품-페이지-구조--스크롤-드리븐-3d-쇼룸)
- [5. 타이포그래피 시스템](#5-타이포그래피-시스템)
- [6. 색상 시스템](#6-색상-시스템)
- [7. 레이아웃 토큰](#7-레이아웃-토큰-css-변수)
- [8. WebGL / 3D 시스템](#8-webgl--3d-시스템)
- [9. 콘텐츠 종류 & 필요 에셋](#9-콘텐츠-종류--필요-에셋)
- [10. 서브 페이지 구조 패턴](#10-서브-페이지-구조-패턴)
- [11. 이전 분석 사이트들과의 비교](#11-이전-분석-사이트들과의-비교)
- [12. 디자인 전략 핵심 인사이트](#12-디자인-전략-핵심-인사이트)
- [13. 재현을 위한 개발 체크리스트](#13-재현을-위한-개발-체크리스트)

---

# Part A — 홈페이지 제작 기본 세팅

## A-1. 필수 환경

| 항목 | 권장 사양 |
|------|-----------|
| **Node.js** | 18.x 이상 (Nuxt 3 호환) |
| **패키지 매니저** | npm, pnpm, 또는 yarn |
| **OS** | Windows / macOS / Linux |

Nuxt 3는 Node.js 18.0.0 이상을 요구한다. LTS 버전 사용을 권장한다.

---

## A-2. 프로젝트 초기화

### Nuxt 3 프로젝트 생성

```bash
npx nuxi@latest init my-wmf-style-site
cd my-wmf-style-site
```

### 모노레포 여부

- **단일 레포**: 일반적인 Nuxt 앱으로 진행 시 위 명령만으로 충분.
- **모노레포**: WMF처럼 `packages/shared`를 두려면 pnpm workspace 또는 Turborepo 등으로 루트에 `packages/shared`를 만들고, Nuxt 앱을 `apps/web` 등으로 두는 구조를 선택한다.

```text
my-wmf-style-site/
├── apps/
│   └── web/          ← Nuxt 3 앱
├── packages/
│   └── shared/       ← 공유 타입/유틸 (선택)
├── pnpm-workspace.yaml
└── package.json
```

---

## A-3. 의존성 설치

### 핵심 패키지

```bash
# Swiper (수평 벤토 슬라이더)
pnpm add swiper

# OverlayScrollbars (커스텀 스크롤바)
pnpm add overlayscrollbars

# Nuxt i18n (다국어)
pnpm add @nuxtjs/i18n

# Sentry (에러 모니터링, 선택)
pnpm add @sentry/nuxt
```

### Noto Sans Variable Font

- **Google Fonts**: `@nuxtjs/google-fonts` 모듈로 Noto Sans 가변 폰트 로드 후, weight 640 등 커스텀 축 사용.
- **Self-hosted**: `public/fonts/` 또는 `assets/fonts/`에 woff2 파일을 두고 `@font-face`로 등록. weight 100~900, italic 포함 권장.

```css
@font-face {
  font-family: "Noto Sans";
  src: url("/fonts/noto-sans-variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
}
```

---

## A-4. 디렉토리 구조

Nuxt 3 기준으로 보고서의 Sources 패널 구조를 매핑한 예시다.

```text
my-wmf-style-site/
├── app.vue
├── error.vue
├── nuxt.config.ts
├── _nuxt/                    ← 빌드 시 생성 (Nuxt 에셋)
├── assets/
│   ├── icons/                ← 아이콘 에셋
│   └── fonts/                ← 폰트 (선택)
├── components/               ← Vue 컴포넌트
├── composables/              ← Vue 3 Composables
├── i18n/                     ← 다국어 로케일/메시지
├── middleware/                ← Nuxt 미들웨어
├── pages/                    ← 파일 기반 라우팅
│   └── [...slug].vue         ← /en_us/ 등 동적 라우트
├── public/
│   └── fonts/                ← self-hosted 폰트
├── types/                    ← TypeScript 타입
├── utils/                    ← 유틸 함수
├── webgl/
│   └── textures/             ← WebGL 텍스처 (제품 3D)
├── webglApp/                 ← WebGL 앱 (별도 Vue 앱, 선택)
│   ├── app.vue
│   └── error.vue
├── sentry.client.config.ts   ← Sentry 설정 (선택)
└── packages/shared/           ← 모노레포 시 공유 패키지
```

---

## A-5. CSS/디자인 토큰

전역 스타일(`assets/css/main.css` 또는 `app.vue`에서 import)에 아래 변수를 두고 사용한다.

### 색상

```css
:root {
  /* 배경 */
  --color-bg-almost-black: #0D0D0D;
  --color-bg-card-dark: #212121;
  --color-bg-white: #FFFFFF;

  /* 텍스트 */
  --color-text-white: rgb(255, 255, 255);
  --color-text-off-white: rgb(247, 247, 242);
  --color-text-black: rgb(0, 0, 0);
  --color-text-muted: #333;

  /* 액센트 */
  --color-accent-gold: /* 브론즈/골드 톤 */;
}
```

### 타이포그래피

```css
:root {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
}

/* H2 Hero */
--h2-hero-size: 72px;
--h2-hero-weight: 640;
--h2-hero-tracking: -1.44px;

/* H2 Card */
--h2-card-size: 29px;
--h2-card-tracking: -0.58px;

/* H2 Subtitle */
--h2-subtitle-size: 40px;
--h2-subtitle-tracking: -0.8px;
```

### 레이아웃 & 모션

```css
:root {
  --module-padding-small-mobile: 48px;
  --module-padding-small-desktop: 56px;
  --module-padding-large-mobile: 128px;
  --module-padding-large-desktop: 240px;

  --header-position-transition-duration: 0.5s;
  --header-position-transition-timing-function: ease;
}

/* OverlayScrollbars (스크롤 퍼센트 연동 시) */
--os-viewport-percent: 0;
--os-scroll-percent: 0;
```

### Swiper 커스텀

```css
--swiper-navigation-size: 44px;
```

---

## A-6. 개발 체크리스트 요약

| Phase | 내용 | 상세 위치 |
|-------|------|------------|
| **Phase 1** | Nuxt 3 생성, Noto Sans, Swiper, OverlayScrollbars, CSS 변수, 다크 테마 | [Section 13](#13-재현을-위한-개발-체크리스트) |
| **Phase 2** | 수평 벤토 그리드, Flip Card, 히어로/Footer 슬라이드, 진행 바 | [Section 13](#13-재현을-위한-개발-체크리스트) |
| **Phase 3** | 제품 3D 갤러리, 제품 상세 스크롤 드리븐 줌, 서브 네비, 다크→라이트 전환 | [Section 13](#13-재현을-위한-개발-체크리스트) |
| **Phase 4** | i18n, Sentry, OneTrust, GTM, SEO | [Section 13](#13-재현을-위한-개발-체크리스트) |

전체 체크리스트는 본문 [Section 13](#13-재현을-위한-개발-체크리스트)를 참고한다.

---

# Part B — 해체 분석 보고서 본문

**대상**: https://www.wmf-coffeemachines.com/en_us/  
**분석일**: 2026-03-13  
**데이터 소스**: Chrome DevTools Sources/Elements/Styles + 직접 접속 JS 분석 + 스크롤 캡처

---

## 0. 기술 스택 (완전 확정)

### 프레임워크

| 항목 | 확정값 | 근거 |
|------|--------|------|
| **SSR 프레임워크** | **Nuxt 3** (Vue 3 기반) | Sources: `_nuxt/`, `virtual:nuxt/codebuild...`, `#__nuxt` div |
| **UI 프레임워크** | **Vue 3** | `app.vue`, `error.vue`, `runtime-core.esm-bundler` |
| **렌더링** | **SSR + CSR 하이브리드** | `data-ssr="true"`, `__NUXT_DATA__` 스크립트 |
| **3D/WebGL** | **커스텀 WebGL** (Three.js 가능) | `/webgl/textures/` 디렉토리, `webglApp/` 디렉토리 |
| **에러 모니터링** | **Sentry** | `sentry.client.config.ts` |
| **슬라이더** | **Swiper** | `--swiper-navigation-size: 44px`, `.swiper-slide` 클래스 |
| **쿠키 관리** | **OneTrust** | `onetrust-consent-sdk`, preference center |
| **분석** | **GTM** (GTM-PT8B6V28) | `<script>` 태그 확인 |
| **폰트** | **Noto Sans** (Google Fonts, self-hosted woff2) | `@font-face` + `/_nuxt/` 경로 |
| **i18n** | **Nuxt i18n** | `/i18n/` 디렉토리, 12개 국가/언어 지원 |

### 프로젝트 디렉토리 구조 (Sources 패널 확정)

```text
www.wmf-coffeemachines.com/
├── _nuxt/                    ← Nuxt 빌드 에셋
├── assets/icons/             ← 아이콘 에셋
├── components/               ← Vue 컴포넌트
├── composables/              ← Vue 3 Composables (로직 재사용)
├── en_us/                    ← 영어(미국) 라우트
│   └── en_us/
├── i18n/                     ← 다국어 설정
├── middleware/               ← Nuxt 미들웨어 (라우트 가드 등)
├── node_modules/             ← 패키지 (번들에 포함된 부분)
├── packages/shared/          ← 공유 패키지 (모노레포 구조)
├── pages/                    ← Nuxt Pages (파일 기반 라우팅)
├── types/                    ← TypeScript 타입 정의
├── utils/                    ← 유틸리티 함수
├── webgl/textures/           ← WebGL 텍스처 파일 (제품 3D)
├── webglApp/                 ← WebGL 앱 (제품 뷰어)
│   ├── app.vue
│   └── error.vue
├── sentry.client.config.ts   ← Sentry 에러 트래킹 설정
└── virtual:nuxt/codebuild... ← Nuxt 빌드 가상 모듈 (×13)
    └── virtual:public (×6)
```

### 핵심 발견: 모노레포 구조

`packages/shared/` 디렉토리의 존재는 이 프로젝트가 **모노레포(monorepo)**로 관리되고 있음을 의미한다. `webglApp/`은 별도의 Vue 앱으로 분리되어 있으며, 제품 3D 뷰어를 담당한다.

---

## 1. 사이트맵 & 페이지 구조

### 전체 19개 페이지

```text
/en_us/                                     ← 메인 랜딩
├── /products/                              ← 제품 목록 (3D 쇼룸)
│   ├── /fully-automatic-coffee-machines/
│   │   ├── /wmf-1100-s/                   ← 제품 상세
│   │   ├── /wmf-1300-s/
│   │   ├── /wmf-1500-s-plus/
│   │   └── /wmf-5000-s-plus/
│   └── /portafilter-machines/
│       └── /wmf-espresso-next/
├── /service/                               ← 서비스/AS
├── /digital-solutions/                     ← WMF CoffeeConnect
├── /industries-and-more/                   ← 산업별 솔루션
├── /why-wmf/                               ← 브랜드 스토리
├── /contact/                               ← 연락처/문의
├── /support/                               ← 고객지원
├── /add-ons/                               ← 부가 장비
├── /financing-and-leasing/                 ← 금융/리스
├── /imprint/                               ← 법적 고지
├── /privacy/                               ← 개인정보
├── /terms-and-conditions/                  ← 이용약관
└── /code-of-ethics/                        ← 윤리강령
```

### 다국어 지원 (12개 지역)

International, Deutschland, Österreich, Switzerland(de/fr), France, Belgique(fr/nl), Nederland, United Kingdom, España, Polska, United States, 추가 2개 미표시

---

## 2. 랜딩 페이지 핵심 구조 — "수평 벤토 그리드"

이 사이트의 가장 독특한 점: **수평 스크롤 기반의 벤토(Bento) 카드 그리드 레이아웃**. 일반적인 세로 스크롤 페이지가 아니다.

### 레이아웃 메커니즘

```text
┌─ Swiper Container (수평) ───────────────────────────────────────────┐
│                                                                     │
│  [슬라이드 0]  [슬라이드 1]  [슬라이드 2]  [슬라이드 3]  [슬라이드 4] │
│   1302px        418px        860px        418px        1302px       │
│   (풀너비)      (좁은)       (중간)       (좁은)       (풀너비)      │
│                                                                     │
│  ◀──────── 수평 스크롤/드래그로 이동 ────────▶                        │
│                                                                     │
│  하단 진행 바: ━━━━━━░░░░░░░░                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 슬라이드별 상세 구조

#### 슬라이드 0 — Hero (1302px, 풀뷰포트)

```text
┌─────────────────────────────────────────────┐
│  bg: #0D0D0D (거의 검정)                      │
│                                             │
│  [제품 이미지 — 커피 머신 클로즈업, 다크 무드]    │
│  고급 커피 머신의 LED 라이트 + 메탈 디테일       │
│                                             │
│  "WMF Professional Coffee Machines"          │
│  (H1, visually-hidden, SEO 전용)             │
│                                             │
│  "Ultimate range."                           │
│  "Peak performance."                         │
│  (H2, 72px, weight 640, -1.44px tracking)   │
│  흰색 텍스트, 좌하단 배치                       │
│                                             │
│  [→] 화살표 버튼 (Products 링크)              │
│                                             │
│  h: 671px (≈ 100vh - header)                │
└─────────────────────────────────────────────┘
```

#### 슬라이드 1 — 2개 카드 (418px, 좁은 컬럼)

```text
┌─────────────────────────┐
│  [카드 A: Service]       │
│  bg: 화이트              │
│  "Proven service         │
│   excellence - in the    │
│   US and around the      │
│   globe"                 │
│  [세계 지도 일러스트]      │
│  [🔄 Flip 버튼]          │
│  → 뒤집으면 설명 텍스트   │
│  → "Services" 링크       │
│                         │
├─────────────────────────┤
│  [카드 B: Industries]    │
│  bg: 사진 (바리스타)      │
│  "Solutions for          │
│   industries"            │
│  "Insights & Trends"     │
│  [🔄 Flip 버튼]          │
│  → 뒤집으면 설명 텍스트   │
│  → "Industries & more"   │
│                         │
└─────────────────────────┘
```

#### 슬라이드 2 — 3개 카드 (860px, 중간 컬럼)

```text
┌───────────────────────────────────────┐
│  [카드 C: Espresso NEXT — 대형]        │
│  bg: 다크 이미지 (댄서 실루엣)          │
│  "Perfection in every repetition"     │
│  "WMF espresso NEXT"                  │
│  (H2, 40px, weight 640)              │
│  [→] 화살표 (제품 페이지 링크)          │
│                                       │
├──────────────────┬────────────────────┤
│  [카드 D: Contact]│  [카드 E: Support] │
│  bg: 골드/텍스처  │  bg: 다크           │
│  "Let's discuss   │  "Hey there 👋"    │
│   your coffee     │  [말풍선 아이콘]     │
│   business."      │  "Get help in our  │
│  [🔄 Flip]        │   support area."   │
│                   │  [→] 링크           │
└──────────────────┴────────────────────┘
```

#### 슬라이드 3 — 2개 카드 (418px, 좁은 컬럼)

```text
┌─────────────────────────┐
│  [카드 F: Digital]       │
│  bg: 다크 + UI 목업      │
│  (알림 카드 UI 이미지)    │
│  "Boost your business"   │
│  "WMF CoffeeConnect"    │
│  [🔄 Flip]              │
│  → "Digital solutions"   │
│                         │
├─────────────────────────┤
│  [카드 G: Why WMF]      │
│  bg: 화이트              │
│  [머신 이미지]            │
│  "Why WMF"              │
│  "Performance Made       │
│   in Germany"            │
│  [🔄 Flip]              │
│  → "Why WMF" 링크       │
│                         │
└─────────────────────────┘
```

#### 슬라이드 4 — Footer (1302px, 풀너비)

```text
┌─────────────────────────────────────────────┐
│  bg: 다크                                    │
│                                             │
│  "Designed to"                               │
│  "Perform" (골드 색상)                        │
│  (H2, 대형 디스플레이)                         │
│                                             │
│  Products    |  Contact                      │
│  Add-ons     |  +1 888 496 3435             │
│  Industries  |  LinkedIn                     │
│  Support     |  YouTube                      │
│  Why WMF     |  Instagram                    │
│  Press ↗     |                              │
│                                             │
│  Imprint | Privacy | Terms | Code of Ethics  │
│  Compliance | Cookies                        │
│                                             │
│  © 2026 WMF - All rights reserved.          │
│  WMF is part of Groupe SEB.                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 3. 인터랙션 시스템

### 3-1. Swiper 수평 스크롤

- Swiper.js 기반의 수평 슬라이드
- 마우스 드래그 + 터치 스와이프 + 키보드 화살표 지원
- 하단에 **진행 바(progress bar)** — 현재 위치 표시
- 슬라이드 너비가 각각 다름 (1302, 418, 860, 418, 1302px) — **비균일 그리드**
- 총 5개 슬라이드, 자유 스크롤(freeMode) 방식

### 3-2. Flip Card (양면 카드)

- 7개 카드에 [🔄] 버튼 존재
- 클릭 시 카드가 3D 회전(Y축 180°)하며 뒷면 노출
- 뒷면 구성: 설명 텍스트 + CTA 링크
- CSS `transform: rotateY(180deg)` + `backface-visibility: hidden` 기반

### 3-3. 헤더 포지션 전환

```css
--header-position-transition-duration: .5s;
--header-position-transition-timing-function: ease;
```

- 스크롤/슬라이드 이동에 따라 헤더가 나타나거나 사라짐
- 0.5초 ease 전환

### 3-4. OverlayScrollbars (커스텀 스크롤바)

```css
--os-viewport-percent: 0;
--os-scroll-percent: 0;
```

- `OverlayScrollbars` 라이브러리 사용 (커스텀 스크롤바)
- 스크롤 퍼센트를 CSS 변수로 노출 — 스크롤 연동 애니메이션에 사용 가능

---

## 4. 제품 페이지 구조 — "스크롤 드리븐 3D 쇼룸"

### Products (/products/) — 3D 제품 갤러리

```text
┌─────────────────────────────────────────────┐
│  bg: #000 (검정)                              │
│                                             │
│  [좌측 머신]  [중앙 머신(활성)]  [우측 머신]     │
│   흐리게       선명 + 크게       흐리게          │
│                                             │
│  "WMF 1100 S"                               │
│  "Fully automatic coffee machines"           │
│                                             │
│  [← 이전]              [다음 →]              │
│  [Filter products ⚙]                        │
│                                             │
│  h: 100vh                                    │
└─────────────────────────────────────────────┘
```

- **카루셀 형식**: 3대의 머신이 동시 표시, 중앙이 활성
- 좌우 머신: 축소 + 블러 처리
- 중앙 머신: 풀 사이즈 + 3D 렌더링 이미지
- **다크룸 콘셉트**: 검정 배경에 조명 효과로 제품 강조
- 필터 버튼: 카테고리별 필터링 (fully-automatic / portafilter)

### 제품 상세 페이지 — 스크롤 드리븐 줌

```text
[Phase 1: 히어로 — 100vh]
┌─────────────────────────────────────────────┐
│  서브 네비: [WMF 1500 S+] | Overview | Specs | Add-ons │
│  [Get in touch] 버튼 (골드)                   │
│                                             │
│  "WMF 1500 S+"                              │
│  (H2, 72px, weight 640)                    │
│  "Fully automatic coffee machine            │
│   for up to 180 cups daily"                 │
│                                             │
│  [CoffeeConnect 배지]                        │
│                                             │
│  우측: 제품 대형 이미지 (다크, 극적 조명)        │
│                                             │
└─────────────────────────────────────────────┘
        │
        │ 스크롤 ↓ (scroll-driven zoom)
        ▼
[Phase 2: 제품 줌인 — 스크롤 연동]
┌─────────────────────────────────────────────┐
│  스크롤 진행에 따라 제품 이미지가 확대            │
│  → 클로즈업 (그라인더 부분)                     │
│  → 더 확대 (전면 터치스크린)                    │
│  → 전체 뷰 (밝은 조명으로 전환)                 │
│                                             │
│  이미지 시퀀스 또는 CSS scale 기반              │
│  (webgl/textures 디렉토리에서 텍스처 로드)       │
└─────────────────────────────────────────────┘
        │
        │ 스크롤 ↓ (배경 전환: 검정 → 흰색)
        ▼
[Phase 3: 기능 소개 — 세로 스크롤]
┌─────────────────────────────────────────────┐
│  bg: 흰색                                    │
│                                             │
│  "ENDLESS VARIETY. COMPLETE AUTOMATION."     │
│  (라벨, uppercase, 자간 넓음)                  │
│                                             │
│  "Brew more types of coffee than there are   │
│   flavors in your coffee cup."              │
│  (H2, 대형, 라이트 그레이)                      │
│                                             │
│  [기능 카드들 — 세로 스크롤]                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 5. 타이포그래피 시스템

### 폰트

```css
html.seb {
    font-family: "Noto Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;  /* :host */
    line-height: 1.15; /* html 보정 */
}
```

**Noto Sans** 단일 폰트. `@font-face`에서 woff2로 self-hosted. weight 100~900, italic 포함.

### 타이포 스케일 (실측)

| 요소 | 사이즈 | 웨이트 | letter-spacing | 용도 |
|------|--------|--------|---------------|------|
| **H1** | 0px (hidden) | 400 | normal | SEO용 (시각적 숨김) |
| **H2 (Hero)** | **72px** | **640** | **-1.44px** | 메인 히어로 타이틀 |
| **H2 (Card)** | **29px** | **640** | -0.58px | 카드 내 타이틀 |
| **H2 (Subtitle)** | **40px** | **640** | -0.8px | 제품명 등 |
| **H3** | 28px | 200 | — | 설명 텍스트 |
| Body | 16px | 400 | normal | 본문 |

**font-weight 640** — 일반적인 100 단위가 아닌 **가변 폰트(variable font) 미세 조정값**. Noto Sans Variable Font의 weight 축을 640으로 설정. Bold(700)보다 약간 가벼운, Semi-Bold와 Bold 사이의 커스텀 웨이트.

**negative letter-spacing** — 대형 제목에 마이너스 자간 적용. 글자가 촘촘하게 붙어 임팩트 있는 인상을 준다. 사이즈가 커질수록 tracking이 더 좁아진다 (72px → -1.44px, 40px → -0.8px, 29px → -0.58px). 비율은 약 **-2%**.

---

## 6. 색상 시스템

### 배경색

| 색상 | HEX | 용도 |
|------|-----|------|
| **Almost Black** | #0D0D0D | 히어로, 제품 배경 |
| **Card Dark** | #212121 | 다크 카드 배경 |
| **White** | #FFFFFF | 라이트 카드 배경, 기능 섹션 |
| **Gold Texture** | 이미지 기반 | Contact 카드 배경 |

### 텍스트/액센트

| 색상 | RGB | 용도 |
|------|-----|------|
| **White** | rgb(255,255,255) | 다크 배경 위 텍스트 |
| **Off-white** | rgb(247,247,242) | 다크 카드 위 보조 텍스트 |
| **Black** | rgb(0,0,0) / #333 | 라이트 배경 위 텍스트 |
| **Gold** | 브론즈/골드 톤 | 버튼(화살표), "Get in touch" CTA |

### 색상 전략

**다크 모드가 기본이다.** 전체 사이트가 검정/다크 그레이 기반. 제품 사진의 극적 조명 효과를 최대화하기 위한 선택. 이는 Apple 제품 페이지, Tesla 등 프리미엄 테크 브랜드의 전형적 패턴이다.

---

## 7. 레이아웃 토큰 (CSS 변수)

```css
--module-padding-small-mobile: 48px;
--module-padding-small-desktop: 56px;
--module-padding-large-mobile: 128px;
--module-padding-large-desktop: 240px;
```

모바일과 데스크톱에 별도 값. 섹션 패딩이 모바일 48~128px, 데스크톱 56~240px.

---

## 8. WebGL / 3D 시스템

### 확정된 구조

```text
/webgl/textures/          ← 제품 3D 텍스처 파일
/webglApp/                ← 독립 Vue 앱 (WebGL 렌더러)
    ├── app.vue           ← WebGL 앱 루트
    └── error.vue         ← WebGL 에러 핸들러
```

### 동작 추정

- 제품 페이지의 **스크롤 드리븐 줌 효과**를 WebGL로 구현
- 또는 제품 리스트의 **3D 쇼룸 뷰**(좌/중앙/우 머신 배치)에 사용
- 텍스처 파일: 제품 머신의 고해상도 텍스처 (메탈, 글로시 등)
- `webglApp`이 별도 Vue 앱인 이유: 메인 Nuxt 앱에서 lazy-load하여 성능 최적화

---

## 9. 콘텐츠 종류 & 필요 에셋

이 사이트를 재현하려면 다음 콘텐츠가 필요하다.

### 이미지/비주얼 에셋

| 종류 | 수량 | 사양 |
|------|------|------|
| 제품 히어로 이미지 (다크, 극적 조명) | 5~6장 | 고해상도, 다크 배경, 스튜디오 촬영 |
| 제품 스크롤 시퀀스 (줌인용) | 제품당 10~20프레임 | 순차적 확대 이미지 또는 3D 렌더 |
| 인물 사진 (바리스타 등) | 2~3장 | 라이프스타일, 산업 현장 |
| 텍스처 이미지 (커피 원두, 나무 등) | 2~3장 | 카드 배경용 |
| 세계 지도 일러스트 | 1장 | 서비스 지역 표시용 SVG |
| UI 목업 (CoffeeConnect 알림) | 1세트 | 디지털 솔루션 카드용 |
| 로고 SVG | 1개 | WMF 로고마크 |
| 아이콘 세트 | 10~15개 | 화살표, 플립, 채팅 등 |

### 텍스트 콘텐츠

| 종류 | 수량 | 성격 |
|------|------|------|
| 히어로 카피 (타이틀 + 서브) | 1세트 | 임팩트 있는 숏 카피 |
| 카드별 제목 + 설명 | 7세트 | 제목 1줄 + 설명 1~2줄 |
| 제품별 제목 + 서브카피 | 5세트 | 제품명 + 일일 컵 수 등 |
| 기능 소개 (USP) | 제품당 5~8개 | 라벨 + 대형 설명문 |
| Footer 텍스트 | 1세트 | 주소, 전화, 법적 고지 |

### 인터랙티브 요소

| 요소 | 구현 기술 |
|------|-----------|
| 수평 벤토 그리드 | Swiper.js + 커스텀 슬라이드 크기 |
| Flip Card | CSS 3D transform + Vue transition |
| 제품 3D 쇼룸 | WebGL 또는 이미지 시퀀스 |
| 스크롤 드리븐 줌 | Scroll-linked animation + 이미지 시퀀스 |
| 커스텀 스크롤바 | OverlayScrollbars |
| 네비 전환 | CSS transition + scroll listener |

---

## 10. 서브 페이지 구조 패턴

### 제품 상세 페이지 패턴

```text
[1] 서브 내비 (제품명 + Overview | Specs | Add-ons | Get in touch)
[2] 히어로 (다크, 제품명 + 서브카피 + 대형 이미지)
[3] 스크롤 드리븐 줌 (제품 확대)
[4] 기능 소개 (라벨 + 대형 카피 + 카드)
[5] 스펙 테이블
[6] Add-ons 섹션
[7] CTA (Get in touch)
[8] Footer
```

### 일반 페이지 패턴

```text
[1] 히어로 (다크 배경 + 텍스트)
[2] 콘텐츠 모듈 (교차 배치: 다크/라이트)
[3] CTA 섹션
[4] Footer
```

### 공통 네비게이션 (전 페이지)

```text
[WMF 로고 (중앙)] [머신 선택기 아이콘] [햄버거 메뉴]
```

- 로고: 항상 **상단 중앙**에 배치 (좌측이 아님)
- 머신 아이콘(좌상단): 제품 퀵 네비게이션 — 썸네일 3장 표시
- 햄버거(우상단): 풀스크린 메뉴 오픈

---

## 11. 이전 분석 사이트들과의 비교

| 항목 | ocqua | Pulso Hotel | WMF Coffee |
|------|-------|-------------|------------|
| **프레임워크** | Astro + Vue 3 | Webflow | Nuxt 3 + Vue 3 |
| **스크롤 방향** | 세로 | 세로 | **수평 (벤토)** |
| **3D/WebGL** | 없음 | 없음 | **WebGL (제품 뷰어)** |
| **배경 톤** | 베이지 (따뜻함) | 오프화이트/그린 | **검정 (다크 프리미엄)** |
| **카드 인터랙션** | 없음 | Swiper만 | **Flip Card + Swiper** |
| **폰트 수** | 4종 | 1종 | **1종 (Noto Sans)** |
| **레이아웃** | 세로 스크롤 섹션 | 세로 + 테마 전환 | **수평 벤토 + 세로 상세** |
| **타겟** | B2C 뷰티 | B2C 호텔 | **B2B 산업기기** |
| **디자인 코드** | 일본 미니멀 | 럭셔리 부티크 | **테크 프리미엄** |

---

## 12. 디자인 전략 핵심 인사이트

### 수평 벤토 그리드를 선택한 이유

B2B 랜딩페이지의 목적은 "여러 카테고리의 정보를 한눈에 보여주는 것"이다. 세로 스크롤은 맨 아래 콘텐츠를 볼 때까지 시간이 걸린다. **수평 벤토 그리드는 모든 핵심 콘텐츠를 한 화면 높이 안에 배치하고**, 수평으로만 탐색하게 만든다. 사용자가 "아래로 스크롤해야 뭐가 있지?"라고 생각할 필요 없이, 좌우로 훑으면 전체 오퍼링을 파악할 수 있다.

### 다크 모드 = 프리미엄 산업기기 코드

커피 머신의 **메탈릭 표면 + LED 조명**을 최대한 강조하려면 다크 배경이 필수. Apple의 Mac Pro 페이지나 Porsche Design과 동일한 전략. "이건 가정용이 아니라 프로페셔널 장비다"라는 메시지를 색상만으로 전달.

### Flip Card = 정보 밀도 극대화

카드 앞면은 **비주얼 + 한 줄 타이틀**만. 관심 있는 카드만 뒤집어서 상세 정보를 확인. 정보 과부하 없이 탐색 효율을 극대화하는 패턴. SaaS 랜딩에서도 자주 사용되지만, 이 수준의 시각적 완성도는 드물다.

---

## 13. 재현을 위한 개발 체크리스트

### Phase 1: 인프라

- [ ] Nuxt 3 프로젝트 생성
- [ ] Noto Sans Variable Font 설치 (weight 640 사용을 위해 가변폰트 필수)
- [ ] Swiper.js 설치 + 비균일 슬라이드 크기 설정
- [ ] OverlayScrollbars 설치
- [ ] CSS 변수 시스템 (module-padding 토큰)
- [ ] 다크 테마 기본 스타일

### Phase 2: 메인 랜딩

- [ ] 수평 벤토 그리드 (Swiper + CSS Grid 내부)
- [ ] Flip Card 컴포넌트 (Vue Transition + CSS 3D)
- [ ] 히어로 슬라이드 (다크 배경 + 대형 이미지 + 타이틀)
- [ ] Footer 슬라이드 ("Designed to Perform" + 링크)
- [ ] 진행 바 (Swiper pagination)

### Phase 3: 제품 시스템

- [ ] 제품 리스트 3D 갤러리 (또는 이미지 기반 카루셀)
- [ ] 제품 상세 — 스크롤 드리븐 줌 (이미지 시퀀스 또는 WebGL)
- [ ] 서브 네비게이션 (Overview | Specs | Add-ons)
- [ ] 다크 → 라이트 배경 전환

### Phase 4: 마감

- [ ] i18n (다국어 구조)
- [ ] Sentry 에러 모니터링
- [ ] OneTrust 쿠키 관리
- [ ] GTM 분석 연동
- [ ] SEO (H1 hidden, 메타 태그, 구조화 데이터)
