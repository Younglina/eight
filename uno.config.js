import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    fontFamily: {
      song: ['SimSun', 'STSong', 'serif'],
      kai: ['KaiTi', 'STKaiti', 'serif'],
      hei: ['SimHei', 'STHeiti', 'sans-serif'],
    },
  },
})
