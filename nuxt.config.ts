// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: false },
  devServer: {
    port: 3002,
    host: 'localhost',
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'NBP — 제연기, 로스터기, 피넛버터머신 전문',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'NBP — 제연기, 로스터기, 피넛버터머신 전문 제조 기업' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://chiro-web.s3.amazonaws.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&display=swap' },
      ],
    },
  },
})
