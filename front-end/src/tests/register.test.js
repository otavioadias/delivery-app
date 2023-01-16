import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import API from '../API';
import render from './helpers/renderWithContext';
import App from '../App';
import { registerUser } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Registro', () => {
  const REGISTER_NAME = 'common_register__input-name';
  const REGISTER_EMAIL = 'common_register__input-email';
  const REGISTER_PASSWORD = 'common_register__input-password';
  const REGISTER_BTN = 'common_register__button-register';
  const SPAN = 'common_register__element-invalid_register';

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../API');
    jest.mock('../services/api');
  });

  it('Testa se eh possivel registrar uma conta', async () => {
    // arrange
    API.post = jest.fn().mockResolvedValue({ data: registerUser });
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const { history } = render(<App />, '/register');
    const nameInput = screen.getByTestId(REGISTER_NAME);
    const emailInput = screen.getByTestId(REGISTER_EMAIL);
    const passwordInput = screen.getByTestId(REGISTER_PASSWORD);
    const registerButton = screen.getByTestId(REGISTER_BTN);
    // act
    userEvent.type(nameInput, 'Joaozin cabra da peste');
    userEvent.type(emailInput, 'joaozin@gmail.com');
    userEvent.type(passwordInput, 'joaozin123');
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // assert
    expect(API.post)
      .toHaveBeenCalledWith(
        '/register',
        registerUser,
      );
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });

  it('Testa se aparece msg de erro', async () => {
    // arrange
    API.post = jest.fn().mockResolvedValue({ data: null });
    render(<App />, '/register');
    const nameInput = screen.getByTestId(REGISTER_NAME);
    const emailInput = screen.getByTestId(REGISTER_EMAIL);
    const passwordInput = screen.getByTestId(REGISTER_PASSWORD);
    const registerButton = screen.getByTestId(REGISTER_BTN);
    // act
    userEvent.type(nameInput, 'Joaozin cabra da peste');
    userEvent.type(emailInput, 'joaozin@gmail.com');
    userEvent.type(passwordInput, 'joaozin123');
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // assert
    expect(API.post)
      .toHaveBeenCalledWith(
        '/register',
        registerUser,
      );
    await waitFor(() => {
      const span = screen.queryByTestId(SPAN);
      expect(span).toBeVisible();
    });
  });

  it('Testa se o botao volta pra login', async () => {
    // arrange
    const { history } = render(<App />, '/register');
    const backBtn = screen.getByRole('button', { name: /back to login/i });
    // act
    // assert
    userEvent.click(backBtn);
    await waitFor(() => {
      expect(history.pathname).toBe('/login');
    });
  });
});
