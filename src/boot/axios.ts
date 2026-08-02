import { defineBoot } from '#q-app/wrappers';
import { http } from 'src/services/http';

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: typeof http;
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$api = http;
});

export { http as api };
