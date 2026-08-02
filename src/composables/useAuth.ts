import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth';
export { AUTH_TOKEN_KEY, AUTH_USER_KEY } from 'src/constants/storage-keys';

/**
 * Ponto único de leitura do estado de autenticação a partir de componentes.
 * Evita que páginas/componentes acoplem diretamente na store do Pinia.
 */
export function useAuth() {
  const authStore = useAuthStore();
  const { user, isAuthenticated, isLoading, error, fullName } = storeToRefs(authStore);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    fullName,
    login: authStore.login,
    logout: authStore.logout,
  };
}
