// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  css: ['@unocss/reset/tailwind.css', 'splitpanes/dist/splitpanes.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    azureApiKey: process.env.AZURE_API_KEY,
    azureResourceName: process.env.AZURE_RESOURCE_NAME,
    openaiApiKey: process.env.OPENAI_API_KEY
  }
})
