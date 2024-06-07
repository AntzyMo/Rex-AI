// https://unocss.dev/integrations/vite
import { presetScrollbar } from 'unocss-preset-scrollbar'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['scrollbar-lite', 'scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4']
    // ['btn', 'py-1 px-4 disabled:(bg-gray-600 opacity-50) bg-cyan-500 hover:bg-cyan-600 text-white rounded'],
    // ['icon-btn', 'hover:bg-cyan-600 transition cursor-pointer select-none']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    }),
    presetScrollbar()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
