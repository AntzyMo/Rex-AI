import { useLocalStorage } from '@vueuse/core'

import DEFAULT_CONTENT from '../../README.md?raw'

const DEFAULT_REGEX = '##'

function transformRNToN(content: string) {
  return content.replace(/\r\n/g, '\n')
}

export const regex = useLocalStorage('rex', DEFAULT_REGEX)
export const content = useLocalStorage('content', transformRNToN(DEFAULT_CONTENT))
export const flags = useLocalStorage('flags', 'gm')
export const fullResultIdx = useLocalStorage('fullResultIdx', 0)
