<template>
  <div class="flip-card" @click="flipped = !flipped">
    <div class="flip-card__inner" :class="{ 'flip-card__inner--flipped': flipped }">
      <div class="flip-card__front">
        <div v-if="imagePlaceholder" class="flip-card__img-placeholder">
          플레이스홀더
        </div>
        <h2 class="flip-card__title">{{ title }}</h2>
        <p v-if="subtitle" class="flip-card__subtitle">{{ subtitle }}</p>
        <button type="button" class="flip-card__flip-btn" aria-label="카드 뒤집기">+</button>
      </div>
      <div class="flip-card__back">
        <p class="flip-card__body">자세한 내용을 확인해 보세요.</p>
        <NuxtLink v-if="linkTo" :to="linkTo" class="flip-card__link" @click.stop>
          {{ linkLabel }}
        </NuxtLink>
        <button type="button" class="flip-card__flip-btn flip-card__flip-btn--back" aria-label="카드 앞면으로">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  linkTo?: string
  linkLabel?: string
  imagePlaceholder?: boolean
}>()

const flipped = ref(false)
</script>

<style scoped>
.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
  cursor: pointer;
  perspective: 1200px;
}

.flip-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.flip-card__inner--flipped {
  transform: rotateY(180deg);
}

.flip-card__front,
.flip-card__back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 0;
}

.flip-card__front {
  background: var(--front-bg, var(--color-bg-card-dark));
  color: var(--color-text-white);
}

.flip-card__back {
  background: var(--color-bg-card-dark);
  color: var(--color-text-off-white);
  transform: rotateY(180deg);
}

.flip-card__img-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-almost-black);
  color: var(--color-text-muted);
  font-size: 14px;
}

.flip-card__title {
  font-size: var(--h2-card-size);
  font-weight: 640;
  letter-spacing: var(--h2-card-tracking);
  margin-top: auto;
  margin-bottom: 8px;
  z-index: 1;
}

.flip-card__subtitle {
  font-size: 14px;
  opacity: 0.9;
  z-index: 1;
}

.flip-card__flip-btn {
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--color-text-white);
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px;
  z-index: 2;
}

.flip-card__body {
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.5;
}

.flip-card__link {
  color: var(--color-accent-gold);
  font-weight: 600;
  margin-bottom: auto;
}

.flip-card__link:hover {
  text-decoration: underline;
}
</style>
