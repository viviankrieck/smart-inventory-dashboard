import { delay } from 'src/utils/delay';

export const AUTH_USER = {
  email: 'user@example.com',
  password: 'password123',
  remember_me: false,
};

export function authLoginMock() {
  return AUTH_USER;
}

export async function authLoginResponseMock() {
  await delay(1000);
  return {
    token: 'mocked-jwt-token',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'user@example.com',
    },
  };
}

export async function authLogoutMock() {
  await delay(1000);
  return {
    message: 'Logout executado com sucesso.',
  };
}

export async function authLoginErrorMock() {
  await delay(1000);
  return {
    message: 'Credenciais inválidas. Por favor, tente novamente.',
  };
}

export async function authLoginValidateMock(email: string, password: string) {
  await delay(1000);
  if (email === authLoginMock().email && password === authLoginMock().password) {
    return authLoginResponseMock();
  } else {
    const error = await authLoginErrorMock();
    throw new Error(error.message);
  }
}
