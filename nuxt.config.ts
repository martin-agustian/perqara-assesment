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
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config.ts",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components"
  }
})
