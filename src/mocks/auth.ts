export function authLoginMock() {
  return {
    email: 'user@example.com',
    password: 'password123',
    remember_me: false,
  };
}

export function authLoginResponseMock() {
  return {
    token: 'mocked-jwt-token',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'user@example.com',
    },
  };
}

export function authLogoutMock() {
  return {
    message: 'Logout executado com sucesso.',
  };
}

export function authLoginErrorMock() {
  return {
    message: 'Credenciais inválidas. Por favor, tente novamente.',
  };
}

export function authLoginValidateMock(email: string, password: string) {
  if (email === authLoginMock().email && password === authLoginMock().password) {
    return authLoginResponseMock();
  } else {
    throw new Error(authLoginErrorMock().message);
  }
}
