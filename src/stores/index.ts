import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';

/**
 * Ponto único de criação da instância do Pinia.
 * Detectado automaticamente pelo Quasar CLI (@quasar/app-vite).
 */
export default store(() => {
  return createPinia();
});
