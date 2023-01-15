import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { loginResponseAdm } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Login', () => {
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
    ] });
    const { history } = render(<App />, '/login');
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/admin/manage');
    });
    const list1 = await screen
      .findByTestId('admin_manage__element-user-table-item-number-0');
    const list2 = await screen
      .findByTestId('admin_manage__element-user-table-item-number-1');
    expect(list1).toBeInTheDocument();
    expect(list2).toBeInTheDocument();
  });
});
