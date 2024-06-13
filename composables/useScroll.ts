type ScrollElement = HTMLDivElement | null | undefined

export function useScroll(target: Ref<ScrollElement>) {
  let isAutoScroll = true

  const scrollToBottom = async () => {
    await nextTick()
    if (target.value && isAutoScroll)
      target.value.scrollTop = target.value.scrollHeight
  }

  onMounted(() => {
    if (target.value) {
      target.value.addEventListener('click', () => {
        isAutoScroll = false
      })

      target.value.addEventListener('scroll', event => {
        const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement

        /**
         * 是否滚动到底部
         * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
         */
        if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 1)
          isAutoScroll = true
      })
    }
  })

  return {
    scrollToBottom,
    isAutoScroll
  }
}
