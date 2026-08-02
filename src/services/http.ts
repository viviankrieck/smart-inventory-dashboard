import axios, { type InternalAxiosRequestConfig } from 'axios';
import { LocalStorage } from 'quasar';
import { AUTH_TOKEN_KEY } from 'src/constants/storage-keys';

/**
 * Instância única do axios usada em toda a aplicação.
 * Mantemos a configuração de baseURL e os interceptors num único lugar
 * para evitar repetição e facilitar manutenção/testes.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com',
  timeout: 15000,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = LocalStorage.getItem<string>(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Centraliza o tratamento de erro de autenticação: se o token expirar
    // ou for inválido, limpamos a sessão local. A store de auth decide
    // o que fazer (ex: redirecionar para o login).
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      LocalStorage.remove(AUTH_TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);
