// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true 
  },
  components: [{
    path: "components",
    extensions: [".vue"],
  }],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    "assets/css/tailwind.css",
  ],
})
