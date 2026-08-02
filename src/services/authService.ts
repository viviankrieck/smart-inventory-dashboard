import { http } from 'src/services/http';
import type { LoginCredentials, LoginResponse, AuthUser } from 'src/interfaces/auth';

/**
 * Camada de acesso à API de autenticação.
 * Não conhece Pinia nem componentes: apenas traduz chamadas HTTP em dados tipados.
 */
export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    });
    return data;
  },

  async getCurrentUser(): Promise<AuthUser> {
    const { data } = await http.get<AuthUser>('/auth/me');
    return data;
  },
};
