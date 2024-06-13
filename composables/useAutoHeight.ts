interface UseAutoHeightOptions {
  maxHeight: number
}

type MaybeTextAreaElement = HTMLTextAreaElement | null | undefined

export function useAutoHeight(
  target: Ref<MaybeTextAreaElement>,
  options: UseAutoHeightOptions
) {
  const { maxHeight } = options

  const targetHeight = ref('auto')

  async function autoScrollHeight() {
    targetHeight.value = 'auto'
    await nextTick()

    if (target.value) {
      const height = target.value.scrollHeight
      targetHeight.value = height > maxHeight ? `${maxHeight}px` : `${height}px`
    }
  }

  return {
    targetHeight,
    autoScrollHeight
  }
}
