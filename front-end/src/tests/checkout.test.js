import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import render from './helpers/renderWithContext';
import App from '../App';
import { cart, loginResponse } from './mocks/mock';
import api from '../services/api';

describe('1 - Testa a pagina de Login', () => {
  const URL = '/customer/checkout';
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../services/api');
  });

  it('Faz o checkout', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponse));
    localStorage.setItem('cart', JSON.stringify(cart));
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
    ] });

    const { history } = render(<App />, URL);
    const address = screen.getByTestId('customer_checkout__input-address');
    const number = screen.getByTestId('customer_checkout__input-address-number');
    userEvent.type(address, 'casa dos bobos');
    expect(address.value).toBe('casa dos bobos');
    userEvent.type(number, '120');
    expect(number.value).toBe('120');
    const seller = screen.getByTestId('customer_checkout__select-seller');
    await waitFor(() => seller.options.length > 1, { timeout: 4000 });
    userEvent.selectOptions(seller, '2');
    expect(seller.value).toBe('2');
    api.post = jest.fn().mockResolvedValue({ data: {
      id: 2,
      userId: 3,
      sellerId: '2',
      totalPrice: 9.38,
      deliveryAddress: 'asasas',
      deliveryNumber: '123',
      saleDate: '2023-01-15T20:43:36.483Z',
      status: 'Pendente',
    } });
    const order = screen.getByTestId('customer_checkout__button-submit-order');
    userEvent.click(order);
    await waitFor(() => {
      expect(history.pathname).toBe('/customer/orders/2');
    }, { timeout: 4000 });
    // act

    // assert
  });

  it('Seller com erro', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponse));
    localStorage.setItem('cart', JSON.stringify(cart));
    const mockError = new Error('mock error');
    api.get = jest.fn().mockRejectedValue(mockError);
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />, URL);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(mockError);
    }, { timeout: 4000 });

    // act

    // assert
  });

  it('REmove item', async () => {
    // arrange
    localStorage.setItem('user', JSON.stringify(loginResponse));
    localStorage.setItem('cart', JSON.stringify(cart));
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
    ] });
    render(<App />, URL);
    const delete1 = screen.getByTestId('customer_checkout__element-order-table-remove-0');
    userEvent.click(delete1);
    // act
    // assert
  });
});
