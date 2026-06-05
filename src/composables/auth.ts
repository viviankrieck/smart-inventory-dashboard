import { Notify } from 'quasar';
import { authLoginValidateMock, authLogoutMock } from 'src/mocks/auth';
import { ref } from 'vue';

export function useAuth() {
  const email = ref('');
  const password = ref('');
  const remember_me = ref(false);

  async function login(): Promise<void> {
    try {
      const response = authLoginValidateMock(email.value, password.value);
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Logging in with:', {
      email: email.value,
      password: password.value,
      remember_me: remember_me.value,
    });
  }

  async function logout(): Promise<void> {
    // Implement your logout logic here, e.g., clear user session, tokens, etc.
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      Notify.create({
        type: 'info',
        message: authLogoutMock().message,
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
