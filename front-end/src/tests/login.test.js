import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import API from '../API';
import render from './helpers/renderWithContext';
import App from '../App';
import { email, password, loginResponse, loginResponseAdm } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Login', () => {
  const LOGIN_ID = 'common_login__input-email';
  const PASSWORD_ID = 'common_login__input-password';

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../API');
    jest.mock('../services/api');
  });

  it('Testa se o caminho / leva para a rota /login', () => {
    // arrange
    const { history: { pathname } } = render(<App />);

    // act

    // assert
    expect(pathname).toBe('/login');
  });

  it('Testa se os elementos da pagina de login estao na tela', () => {
    // arrange
    render(<App />, '/login');
    const loginInput = screen.getByTestId(LOGIN_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /ainda não tenho uma conta/i });

    // act

    // assert
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('Testa se o botao de login comeca desabilitado.', () => {
    // arrange
    render(<App />, '/login');
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act

    // assert
    expect(loginButton).toBeDisabled();
  });

  it('Testa se o botao de login fica habilitado quando se cumpre os requisitos.', () => {
    // arrange
    render(<App />, '/login');
    const loginInput = screen.getByTestId(LOGIN_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act
    userEvent.type(loginInput, email);
    userEvent.type(passwordInput, password);
    // assert
    expect(loginButton).not.toBeDisabled();
  });

  it(`Testa se aparece uma mensagem de usuario invalido se 
    inserir credenciais incorretas`, async () => {
    // arrange
    render(<App />, '/login');
    const wrongPassword = '$#zebiritinha';
    const loginInput = screen.getByTestId(LOGIN_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act
    userEvent.type(loginInput, email);
    userEvent.type(passwordInput, wrongPassword);
    userEvent.click(loginButton);
    const alert = await screen.findByTestId('common_login__element-invalid-email');
    // assert
    expect(alert).toBeInTheDocument();
  });

  it('Testa se eh possivel ir para a tela de registro', async () => {
    // arrange
    const { history } = render(<App />, '/login');
    const registerButton = screen.getByTestId('common_login__button-register');
    // act
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/register');
    });
  });

  it('Testa se eh possivel fazer login como customer', async () => {
    // arrange
    API.post = jest.fn().mockResolvedValue({ data: loginResponse });
    const { history } = render(<App />, '/login');
    const loginInput = screen.getByTestId(LOGIN_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act
    userEvent.type(loginInput, email);
    userEvent.type(passwordInput, password);
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    // assert
    expect(API.post)
      .toHaveBeenCalledWith(
        '/login',
        { email: 'zebirita@email.com', password: '$#zebirita#$' },
      );
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });

  it('Testa se eh possivel fazer login como adm', async () => {
    // arrange
    API.post = jest.fn().mockResolvedValue({ data: loginResponseAdm });
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const { history } = render(<App />, '/login');
    const loginInput = screen.getByTestId(LOGIN_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act
    userEvent.type(loginInput, loginResponseAdm.email);
    userEvent.type(passwordInput, '--adm2@21!!--');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    // assert
    expect(API.post)
      .toHaveBeenCalledWith(
        '/login',
        { email: loginResponseAdm.email, password: '--adm2@21!!--' },
      );
    await waitFor(() => {
      expect(history.pathname).toBe('/admin/manage');
    });
  });

  it('Testa se ja logado eh redirecionado', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponseAdm));
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const { history } = render(<App />, '/login');
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/admin/manage');
    });
  });
});
