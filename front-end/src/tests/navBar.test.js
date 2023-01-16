import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { loginResponse, loginResponseSeller } from './mocks/mock';
import api from '../services/api';

describe('testa a navbar', () => {
  it('Testa navbar orders, products e logout', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponse));
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const { history } = render(<App />, '/login');
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
    const orders = screen.getByTestId('customer_products__element-navbar-link-orders');
    userEvent.click(orders);
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/orders');
    });
    const products = screen
      .getByTestId('customer_products__element-navbar-link-products');
    userEvent.click(products);
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
    const logout = screen.getByTestId('customer_products__element-navbar-link-logout');
    userEvent.click(logout);
    await waitFor(() => {
      expect(history.pathname).toBe('/login');
    });
  });

  it('Testa navbar orders, products e logout', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponseSeller));
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const { history } = render(<App />, '/login');
    const orders = screen.getByTestId('customer_products__element-navbar-link-orders');
    userEvent.click(orders);
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders');
    });
  });
});
