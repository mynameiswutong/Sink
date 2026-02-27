// 404 Layer - Client-side only rendering
// 404 层 - 仅客户端渲染
export default defineNuxtConfig({
  ssr: false,

  routeRules: {
    '/404page/**': {
      prerender: true,
    },
  },
})
