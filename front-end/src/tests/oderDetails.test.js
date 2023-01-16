import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
// import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { cart, loginResponse } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Login', () => {
  const URL = '/customer/orders/1';
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../services/api');
  });

  it('marcar como entregue', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponse));
    localStorage.setItem('cart', JSON.stringify(cart));
    render(<App />, URL);
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        saleId: 1,
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 2,
      },
    ] });
    const deliveryCck = screen
      .getByTestId('customer_order_details__button-delivery-check');
    // act
    userEvent.click(deliveryCck);
    // assert
  });
});
