import { defineConfig } from '#q-app/wrappers';
import unocss from 'unocss/vite';

export default defineConfig(() => {
  return {
    // Boot files (src/boot) — registram o axios globalmente.
    boot: ['axios', 'apexcharts'],

    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: 'hash',

      vitePlugins: [unocss()],
    },

    devServer: {
      open: true,
      port: 9000,
    },

    framework: {
      config: {},
      // Plugins do Quasar usados globalmente na aplicação.
      plugins: ['Notify', 'Dialog', 'LocalStorage', 'Loading', 'Dark'],
    },

    animations: 'all',
  };
});
