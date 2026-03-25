<template>
  <header class="header" :class="{ 'header--visible': isVisible }">
    <div class="header__inner">
      <div class="header__left">
        <span class="header__machine-icon" aria-hidden="true">☰</span>
      </div>
      <NuxtLink to="/" class="header__logo">
        NBP
      </NuxtLink>
      <div class="header__right">
        <button type="button" class="header__menu" aria-label="메뉴 열기">
          메뉴
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isVisible = ref(true)
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--module-padding-small-mobile) var(--module-padding-small-desktop);
  transition: transform var(--header-position-transition-duration) var(--header-position-transition-timing-function);
}

@media (min-width: 768px) {
  .header {
    padding: var(--module-padding-small-desktop);
  }
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.header__logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-white);
  letter-spacing: 0.08em;
}

.header__left,
.header__right {
  width: 80px;
}

.header__right {
  display: flex;
  justify-content: flex-end;
}

.header__machine-icon,
.header__menu {
  background: none;
  border: none;
  color: var(--color-text-white);
  cursor: pointer;
  font-size: 14px;
}

.header__menu {
  padding: 8px 0;
}
</style>
