import { useLocalStorage } from '@vueuse/core'
import type { ModelSetting } from './types'

import DEFAULT_CONTENT from '../README.md?raw'

const DEFAULT_REGEX = '##'

export const regex = useLocalStorage('rex', DEFAULT_REGEX)
export const content = useLocalStorage('content', DEFAULT_CONTENT)
export const flags = useLocalStorage('flags', 'gm')
export const aiRegex = useLocalStorage('aiRegex', ['##'])
export const aiRegexIdx = useLocalStorage('aiRegexIdx', 0)

export function setRegex(option: MaybeRef<string>) {
  const val = unref(option)
  regex.value = val
  if (aiRegex.value.length) {
    const idx = aiRegex.value.indexOf(val)
    aiRegexIdx.value = idx === -1 ? 0 : idx
  }
}

export const modelSetting = useLocalStorage<ModelSetting>('modelSetting', {} as ModelSetting)
