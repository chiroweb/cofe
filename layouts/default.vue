<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--color-bg-almost-black);
}
.main {
  min-height: 100vh;
}
</style>
