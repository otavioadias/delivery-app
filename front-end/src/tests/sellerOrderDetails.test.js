import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { loginResponseSeller } from './mocks/mock';
import api from '../services/api';

describe('Seller', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../services/api');
  });

  it('Testa se aparece os pedidos', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponseSeller));
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 1,
        userId: 3,
        sellerId: 2,
        totalPrice: '9.38',
        deliveryAddress: 'asdassdsdsd',
        deliveryNumber: '1212',
        saleDate: '2023-01-15T20:35:38.000Z',
        status: 'Pendente',
      },
      {
        id: 2,
        userId: 3,
        sellerId: 2,
        totalPrice: '9.38',
        deliveryAddress: 'asasas',
        deliveryNumber: '123',
        saleDate: '2023-01-15T20:43:36.000Z',
        status: 'Pendente',
      },
    ] });
    const { history } = render(<App />, '/login');
    // act
    // assert
    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders');
    });
    const order1 = await screen.findByTestId('seller_orders__element-order-id-1');
    userEvent.click(order1);
    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders/1');
    });
    api.put = jest.fn().mockResolvedValue({ data: {
      message: 'UPDATED',
    } });
    const prepare = screen.getByTestId('seller_order_details__button-preparing-check');
    userEvent.click(prepare);
    const delivery = screen.getByTestId('seller_order_details__button-dispatch-check');
    userEvent.click(delivery);
  });
});
