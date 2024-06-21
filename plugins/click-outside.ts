export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      document.addEventListener('click', e => {
        if (!el.contains(e.target)) {
          binding.value?.()
        }
      })
    }
  })
})
