<template>
  <div class="footer-slide">
    <h2 class="footer-slide__title">최고를 위해</h2>
    <h2 class="footer-slide__title footer-slide__title--accent">설계되다</h2>
    <div class="footer-slide__links">
      <div class="footer-slide__col">
        <NuxtLink to="/products/smoke-eliminator">제연기</NuxtLink>
        <NuxtLink to="/products/roaster">로스터기</NuxtLink>
        <NuxtLink to="/products/peanut-butter">피넛버터머신</NuxtLink>
        <NuxtLink to="/quote">견적 상담</NuxtLink>
      </div>
      <div class="footer-slide__col">
        <NuxtLink to="/notice">공지사항</NuxtLink>
        <NuxtLink to="/portfolio">납품실적</NuxtLink>
        <NuxtLink to="/about">회사소개</NuxtLink>
        <span>02-1234-5678</span>
      </div>
    </div>
    <div class="footer-slide__legal">
      <NuxtLink to="/privacy">개인정보처리방침</NuxtLink>
      <span>|</span>
      <NuxtLink to="/terms">이용약관</NuxtLink>
    </div>
    <p class="footer-slide__copy">© 2026 NBP — All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-slide {
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 500px;
  background: var(--color-bg-almost-black);
  color: var(--color-text-white);
  padding: var(--module-padding-large-mobile) var(--module-padding-small-desktop);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  .footer-slide {
    padding: var(--module-padding-large-desktop) var(--module-padding-small-desktop);
  }
}

.footer-slide__title {
  font-size: clamp(40px, 8vw, 96px);
  font-weight: var(--h2-hero-weight);
  letter-spacing: var(--h2-hero-tracking);
  margin-bottom: 8px;
}

.footer-slide__title--accent {
  color: var(--color-accent-gold);
  margin-bottom: 48px;
}

.footer-slide__links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.footer-slide__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-slide__col a,
.footer-slide__col span {
  font-size: 14px;
  color: var(--color-text-off-white);
}

.footer-slide__col a:hover {
  color: var(--color-accent-gold);
}

.footer-slide__legal {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.footer-slide__legal a {
  color: var(--color-text-muted);
}

.footer-slide__legal a:hover {
  color: var(--color-text-off-white);
}

.footer-slide__copy {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
