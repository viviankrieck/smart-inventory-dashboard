import { Notify } from 'quasar';
import { AUTH_USER, authLoginValidateMock, authLogoutMock } from 'src/mocks/auth';
import { ref } from 'vue';

export function useAuth() {
  const email = ref(AUTH_USER.email);
  const password = ref(AUTH_USER.password);
  const remember_me = ref(AUTH_USER.remember_me);

  async function login(): Promise<void> {
    try {
      const response = await authLoginValidateMock(email.value, password.value);
      Notify.create({
        type: 'positive',
        message: `Bem-vindo, ${response.user.name}!`,
      });
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
      return;
    }
    // Implement your login logic here, e.g., call an API to authenticate the user
    console.log('Logging in with:', {
      email: email.value,
      password: password.value,
      remember_me: remember_me.value,
    });
  }

  async function logout(): Promise<void> {
    // Implement your logout logic here, e.g., clear user session, tokens, etc.
    try {
      Notify.create({
        type: 'info',
        message: (await authLogoutMock()).message,
      });
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  return {
    email,
    password,
    remember_me,
    login,
    logout,
  };
}
