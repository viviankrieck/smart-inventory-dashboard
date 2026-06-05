import { defineConfig, presetWind4, presetAttributify, transformerVariantGroup } from 'unocss';

export default defineConfig({
  theme: {
    breakpoints: {
      '2xl': '120rem',
      '3xl': '150rem',
    },
    fontSize: {
      '2xs': '0.625rem',
    },
    colors: {
      // Define a base e as variações no mesmo nível para evitar falhas de interpretação do presetWind4
      primary: '#3B6DF6',
      'primary-50': '#EEF4FF',
      'primary-100': '#DCE8FF',
      'primary-200': '#B8D0FF',
      'primary-300': '#8CB2FF',
      'primary-400': '#5D8FFF',
      'primary-500': '#3B6DF6',
      'primary-600': '#2954D9',
      'primary-700': '#1D42B8',
      'primary-800': '#17338E',
      'primary-900': '#102563',
    },
  },
  presets: [
    presetWind4({
      dark: { dark: '.body--dark' },
    }),
    presetAttributify(),
  ],
  transformers: [transformerVariantGroup()],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
        'src/**/*.{js,ts,vue}',
      ],
    },
  },
});
