<template>
  <div class="page-landing">
    <LandingSwiper />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'NBP — 제연기, 로스터기, 피넛버터머신 전문',
})
</script>

<style scoped>
.page-landing {
  min-height: 100vh;
}

.page-landing__fallback {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-almost-black);
  color: var(--color-text-muted);
  padding: 48px;
}

.page-landing__placeholder {
  font-size: 18px;
  margin-bottom: 16px;
}

.page-landing__text {
  font-size: 14px;
}
</style>
