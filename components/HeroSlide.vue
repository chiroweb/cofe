<template>
  <div class="hero">
    <video
      v-if="videoExists"
      class="hero__video"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      :src="videoSrc"
    />
    <div class="hero__fallback" v-else>영상 준비중</div>
    <div class="hero__overlay" />
    <div class="hero__content">
      <h1 class="hero__seo-title">NBP — 제연기, 로스터기, 피넛버터머신 전문 제조</h1>
      <h2 class="hero__title">최상의 라인업.</h2>
      <h2 class="hero__title">최고의 퍼포먼스.</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoSrc = 'https://chiro-web.s3.amazonaws.com/nbpkorea/coffee/hero.mp4'
const videoExists = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(videoSrc, { method: 'HEAD' })
    videoExists.value = res.ok
  } catch {
    videoExists.value = false
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: var(--color-bg-almost-black);
  display: flex;
  align-items: flex-end;
  padding: var(--module-padding-large-mobile) var(--module-padding-small-desktop);
  overflow: hidden;
}

@media (min-width: 768px) {
  .hero {
    padding: var(--module-padding-large-desktop) var(--module-padding-small-desktop);
  }
}

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-almost-black);
  color: var(--color-text-muted);
  font-size: 14px;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero__seo-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero__title {
  font-size: clamp(36px, 6vw, var(--h2-hero-size));
  font-weight: var(--h2-hero-weight);
  letter-spacing: var(--h2-hero-tracking);
  color: var(--color-text-white);
  line-height: 1.1;
  margin-bottom: 24px;
}
</style>
