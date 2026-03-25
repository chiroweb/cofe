<template>
  <div class="landing-swiper">
    <Swiper
      :modules="[SwiperPagination, SwiperFreeMode, SwiperMousewheel]"
      direction="horizontal"
      :slides-per-view="'auto'"
      :space-between="0"
      :free-mode="{ enabled: true, momentum: true, momentumRatio: 1, momentumBounce: false }"
      :mousewheel="{ forceToAxis: false, sensitivity: 3, releaseOnEdges: true }"
      :pagination="{ type: 'progressbar' }"
      :speed="400"
      :css-mode="false"
      class="landing-swiper__swiper"
      @swiper="onSwiper"
    >
      <!-- 슬라이드 0: Hero (풀스크린) -->
      <SwiperSlide class="slide slide--hero">
        <HeroSlide />
      </SwiperSlide>

      <!-- 슬라이드 1: 제품 3대 세로 바 (|||) - 호버 확장 -->
      <SwiperSlide class="slide slide--triple">
        <div class="triple-bar">
          <div
            v-for="(card, i) in tripleCards"
            :key="i"
            class="triple-bar__item"
            @mouseenter="hoveredBar = i"
            @mouseleave="hoveredBar = -1"
            :class="{
              'triple-bar__item--active': hoveredBar === i,
              'triple-bar__item--shrink': hoveredBar !== -1 && hoveredBar !== i
            }"
          >
            <img v-if="card.image" :src="card.image" :alt="card.title" class="triple-bar__img" loading="lazy" />
            <div v-else class="triple-bar__img-placeholder">{{ card.placeholder }}</div>
            <div class="triple-bar__content">
              <h2 class="triple-bar__title">{{ card.title }}</h2>
              <p class="triple-bar__sub">{{ card.subtitle }}</p>
              <NuxtLink :to="card.link" class="triple-bar__arrow">→</NuxtLink>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- 슬라이드 2: 2x2 벤토 그리드 -->
      <SwiperSlide class="slide slide--bento">
        <div class="bento bento--quad">
          <NuxtLink
            v-for="(item, i) in bentoCards"
            :key="i"
            :to="item.link"
            class="bento__card"
          >
            <div class="bento__card-inner">
              <h2 class="bento__card-title">{{ item.title }}</h2>
              <p class="bento__card-sub">{{ item.subtitle }}</p>
              <span class="bento__card-arrow">→</span>
            </div>
          </NuxtLink>
        </div>
      </SwiperSlide>

      <!-- 슬라이드 3: Footer -->
      <SwiperSlide class="slide slide--footer">
        <FooterSlide />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, FreeMode as SwiperFreeMode, Mousewheel as SwiperMousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

const swiperInstance = ref<unknown>(null)
const hoveredBar = ref(-1)
let wheelTimeout: ReturnType<typeof setTimeout> | null = null

const tripleCards = [
  {
    title: '제연기',
    subtitle: '깨끗한 로스팅 환경을 위한 고성능 제연 시스템',
    placeholder: '제연기 이미지',
    image: 'https://chiro-web.s3.amazonaws.com/nbpkorea/coffee/smoke-eliminator.jpg',
    link: '/products/smoke-eliminator',
  },
  {
    title: '로스터기',
    subtitle: '균일한 로스팅 품질을 보장하는 전문 로스터',
    placeholder: '로스터기 이미지',
    image: 'https://chiro-web.s3.amazonaws.com/nbpkorea/coffee/roaster.jpg',
    link: '/products/roaster',
  },
  {
    title: '피넛버터머신',
    subtitle: '신선한 피넛버터를 즉석에서 만드는 자동화 머신',
    placeholder: '피넛버터머신 이미지',
    image: '',
    link: '/products/peanut-butter',
  },
]

const bentoCards = [
  {
    title: '견적 상담',
    subtitle: '맞춤 견적을 빠르게 받아보세요',
    link: '/quote',
  },
  {
    title: '공지사항',
    subtitle: 'NBP의 최신 소식을 확인하세요',
    link: '/notice',
  },
  {
    title: '납품실적',
    subtitle: '전국 각지의 설치 사례를 확인하세요',
    link: '/portfolio',
  },
  {
    title: '회사소개',
    subtitle: 'NBP의 비전과 기술력을 소개합니다',
    link: '/about',
  },
]

function onSwiper(swiper: unknown) {
  swiperInstance.value = swiper
}

onMounted(() => {
  const wrapper = document.querySelector('.landing-swiper__swiper .swiper-wrapper') as HTMLElement | null
  const container = document.querySelector('.landing-swiper') as HTMLElement | null
  if (!wrapper || !container) return

  container.addEventListener('wheel', () => {
    if (wheelTimeout) clearTimeout(wheelTimeout)
    wrapper.classList.add('smooth-wheel')
    wheelTimeout = setTimeout(() => {
      wrapper.classList.remove('smooth-wheel')
    }, 300)
  }, { passive: true })
})
</script>

<style scoped>
.landing-swiper {
  width: 100%;
  height: 100vh;
  min-height: 600px;
}

.landing-swiper__swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.landing-swiper__swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.landing-swiper__swiper :deep(.swiper-wrapper.smooth-wheel) {
  transition-duration: 400ms !important;
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.landing-swiper__swiper :deep(.swiper-slide) {
  height: auto;
  box-sizing: border-box;
}

.landing-swiper__swiper :deep(.swiper-pagination) {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.slide {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.slide--hero {
  min-width: 100vw;
}

.slide--triple {
  min-width: 900px;
  width: 900px;
}

.slide--bento {
  min-width: 860px;
  width: 860px;
}

.slide--footer {
  min-width: 100vw;
}

@media (max-width: 1024px) {
  .slide--triple {
    min-width: 100vw;
    width: 100vw;
  }
  .slide--bento {
    min-width: 100vw;
    width: 100vw;
  }
}

.triple-bar__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.triple-bar__item--active .triple-bar__img {
  transform: scale(1.05);
}

/* === Triple Bar (|||) === */
.triple-bar {
  display: flex;
  height: 100%;
  min-height: 100vh;
  gap: 2px;
}

.triple-bar__item {
  position: relative;
  flex: 1;
  overflow: hidden;
  background: var(--color-bg-card-dark);
  transition: flex 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.triple-bar__item--active {
  flex: 1.6;
}

.triple-bar__item--shrink {
  flex: 0.7;
}

.triple-bar__img-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-almost-black);
  color: var(--color-text-muted);
  font-size: 14px;
  transition: opacity 0.4s ease;
}

.triple-bar__item--active .triple-bar__img-placeholder {
  opacity: 0.6;
}

.triple-bar__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 24px;
  z-index: 1;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  transform: translateY(20px);
  opacity: 0.7;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
              opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.triple-bar__item--active .triple-bar__content {
  transform: translateY(0);
  opacity: 1;
}

.triple-bar__title {
  font-size: var(--h2-card-size);
  font-weight: 640;
  letter-spacing: var(--h2-card-tracking);
  color: var(--color-text-white);
  margin-bottom: 8px;
}

.triple-bar__sub {
  font-size: 14px;
  color: var(--color-text-off-white);
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
}

.triple-bar__item--active .triple-bar__sub {
  opacity: 1;
  transform: translateY(0);
}

.triple-bar__arrow {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-gold);
  color: var(--color-bg-almost-black);
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
}

.triple-bar__item--active .triple-bar__arrow {
  opacity: 1;
  transform: translateY(0);
}

/* === Bento 2x2 Grid === */
.bento--quad {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  height: 100%;
  min-height: 100vh;
}

.bento__card {
  position: relative;
  background: var(--color-bg-card-dark);
  overflow: hidden;
  transition: background 0.3s ease;
}

.bento__card:hover {
  background: #2a2a2a;
}

.bento__card-inner {
  padding: 32px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.bento__card-title {
  font-size: var(--h2-card-size);
  font-weight: 640;
  letter-spacing: var(--h2-card-tracking);
  color: var(--color-text-white);
  margin-bottom: 8px;
}

.bento__card-sub {
  font-size: 14px;
  color: var(--color-text-off-white);
  margin-bottom: 16px;
}

.bento__card-arrow {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-gold);
  color: var(--color-bg-almost-black);
  font-size: 20px;
  font-weight: 600;
  align-self: flex-start;
}
</style>
