import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { authService } from 'src/services/authService';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from 'src/constants/storage-keys';
import type { AuthUser, LoginCredentials } from 'src/interfaces/auth';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: LocalStorage.getItem<AuthUser>(AUTH_USER_KEY) ?? null,
    token: LocalStorage.getItem<string>(AUTH_TOKEN_KEY) ?? null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    fullName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''),
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await authService.login(credentials);
        const { accessToken, ...user } = response;

        this.token = accessToken;
        this.user = user;

        LocalStorage.set(AUTH_TOKEN_KEY, accessToken);
        LocalStorage.set(AUTH_USER_KEY, user);
      } catch {
        this.error = 'Usuário ou senha inválidos.';
        throw new Error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      LocalStorage.remove(AUTH_TOKEN_KEY);
      LocalStorage.remove(AUTH_USER_KEY);
    },
  },
});
