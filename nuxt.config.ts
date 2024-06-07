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
    azureOpenaiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenaiEndpoint: process.env.AZURE_OPENAI_ENDPOINT
  }
})
