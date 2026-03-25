<template>
  <div class="page-products">
    <div class="page-products__hero">
      <div class="page-products__img-placeholder">플레이스홀더</div>
      <h1 class="page-products__title">제품 목록</h1>
      <p class="page-products__sub">NBP_COFFEE의 프로페셔널 커피 머신 라인업을 만나보세요.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '제품 — NBP_COFFEE' })
</script>

<style scoped>
.page-products {
  min-height: 100vh;
  background: var(--color-bg-almost-black);
}

.page-products__hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--module-padding-large-mobile);
}

.page-products__img-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 16px;
}

.page-products__title {
  position: relative;
  z-index: 1;
  font-size: var(--h2-hero-size);
  font-weight: var(--h2-hero-weight);
  letter-spacing: var(--h2-hero-tracking);
  color: var(--color-text-white);
  margin-bottom: 16px;
}

.page-products__sub {
  position: relative;
  z-index: 1;
  color: var(--color-text-off-white);
  font-size: 16px;
}
</style>
