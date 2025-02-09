// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      apiBase: "https://api.themoviedb.org/3/",
    }
  },
  devtools: {
    enabled: true 
  },
  components: [{
    path: "components",
    extensions: [".vue"],
  }],
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt"
  ],
  css: [
    "assets/css/tailwind.css",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components"
  }
})
