import { useLocalStorage } from '@vueuse/core'

import DEFAULT_CONTENT from '../README.md?raw'

const DEFAULT_REGEX = '##'

export const regex = ref(DEFAULT_REGEX)
export const content = useLocalStorage('content', DEFAULT_CONTENT)
export const flags = useLocalStorage('flags', 'gm')
export const aiRegex = ref<string[]>([])

export function setRegex(
  regexValByAI: MaybeRef<string>,
  isTypewriter?: boolean,
  { onFinished }: { onFinished?: () => void } = {}
) {
  const val = unref(regexValByAI)

  if (isTypewriter) {
    const valArr = val.split('')
    const timer = setInterval(() => {
      if (!valArr.length) {
        clearInterval(timer)
        onFinished?.()
      } else {
        regex.value += valArr.shift()
      }
    }, 100)
  } else {
    regex.value = val
  }
}
