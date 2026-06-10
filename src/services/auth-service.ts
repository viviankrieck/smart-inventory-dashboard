import { AUTH_USER, authLoginResponseMock } from 'src/mocks/auth';
import { delay } from 'src/utils/delay';

export async function login(email: string, password: string) {
  await delay(1000);
  if (email === AUTH_USER.email && password === AUTH_USER.password) {
    return authLoginResponseMock();
  } else {
    throw new Error('Credenciais inválidas. Por favor, tente novamente.');
  }
}
