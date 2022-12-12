import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { email, password, baseUrl, loginResponse } from './mocks/mock';

describe('1 - Testa a pagina de Login', () => {
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
    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/Senha/i);
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
    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/Senha/i);
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
    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/Senha/i);
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

  it('Testa se eh possivel fazer login', async () => {
    // arrange
    jest.mock('axios');
    axios.post.mockResolvedValueOnce(loginResponse);
    const { history } = render(<App />, '/login');
    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/Senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    // act
    userEvent.type(loginInput, email);
    userEvent.type(passwordInput, password);
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    // assert
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/login`);
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });
});
