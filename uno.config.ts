import { defineConfig, presetWind4 } from 'unocss';

// Usamos apenas utilitários de espaçamento/flex/grid do UnoCSS.
// Cores, tipografia e componentes ficam a cargo do Quasar (evita duplicidade
// de sistemas de design dentro do mesmo projeto).
export default defineConfig({
  shortcuts: {
    // shortcuts to multiple utilities
    'bg-linear':
      'bg-linear-to-t from-primary-800 to-primary-400 dark:bg-linear-to-t dark:from-gray-950 dark:to-gray-800',
    'text-main': 'text-primary-800 dark:text-primary-400',
    'bg-main': 'bg-primary-700 dark:bg-primary-500',
    'text-soft': 'text-gray-500 dark:text-gray-400',
  },
  theme: {
    breakpoint: {
      '2xl': '120rem',
      '3xl': '150rem',
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
      'primary-950': '#0d1c4a',
    },
  },
  presets: [
    presetWind4({
      dark: { dark: '.body--dark' },
    }),
  ],
  transformers: [],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
        'src/**/*.{js,ts,vue}',
      ],
    },
  },
});
