import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import userEvent from '@testing-library/user-event';
import render from './helpers/renderWithContext';
import App from '../App';
import { loginResponseAdm, usersAdm } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Login', () => {
  const URL = '/admin/manage';
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    jest.mock('../API');
    jest.mock('../services/api');
  });

  it('Testa se aparece a galera', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponseAdm));
    api.get = jest.fn().mockResolvedValue({ data: usersAdm });
    const { history } = render(<App />, '/login');
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe(URL);
    });
    const list1 = await screen
      .findByTestId('admin_manage__element-user-table-item-number-0');
    const list2 = await screen
      .findByTestId('admin_manage__element-user-table-item-number-1');
    expect(list1).toBeInTheDocument();
    expect(list2).toBeInTheDocument();
  });

  it('register', async () => {
    localStorage.setItem('user', JSON.stringify(loginResponseAdm));
    api.get = jest.fn().mockResolvedValue({ data: usersAdm });
    const { history } = render(<App />, '/login');
    await waitFor(() => {
      expect(history.pathname).toBe(URL);
    });
    api.post = jest.fn().mockResolvedValue({ data: 'registered' });
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
      {
        id: 4,
        name: 'Patati Patata da Silva',
        email: 'patati@gmail.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
    ] });
    const nameSurname = screen.getByTestId('admin_manage__input-name');
    const email = screen.getByTestId('admin_manage__input-email');
    const password = screen.getByTestId('admin_manage__input-password');
    const role = screen.getByTestId('admin_manage__select-role');
    const submit = screen.getByTestId('admin_manage__button-register');
    userEvent.type(nameSurname, 'Patati Patata da Silva');
    userEvent.type(email, 'patati@gmail.com');
    userEvent.type(password, 'seVcQuerSorrirEBrincar');
    userEvent.selectOptions(role, 'customer');
    userEvent.click(submit);
    // const deleteUser = screen.getByTestId('admin_manage__element-user-table-remove-1');
    // userEvent.click(deleteUser);
  });

  it('delete', async () => {
    localStorage.setItem('user', JSON.stringify(loginResponseAdm));
    api.get = jest.fn().mockResolvedValue({ data: usersAdm });
    const { history } = render(<App />, '/login');
    await waitFor(() => {
      expect(history.pathname).toBe(URL);
    });
    api.delete = jest.fn().mockResolvedValue({ data: 'USER DELETED' });
    const deleteUser = screen.getByTestId('admin_manage__element-user-table-remove-1');
    userEvent.click(deleteUser);
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
    ] });
  });
});
