import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import globals from 'globals';

export default defineConfigWithVueTs(
  {
    ignores: ['dist/**', '.quasar/**', 'node_modules/**', 'src-capacitor/**', 'src-cordova/**'],
  },

  js.configs.recommended,
  ...vue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },

    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  prettierSkipFormatting,
);
