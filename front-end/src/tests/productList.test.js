import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import render from './helpers/renderWithContext';
import App from '../App';
import { loginResponse } from './mocks/mock';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

describe.only('1 - Testa a pagina de Produtos', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
  beforeEach(() => {
    jest.mock('../services/api');
  });
  const PATH = '/customer/products';
  it('Testa se os produtos aparecem', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        quantity: 0,
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        quantity: 0,
      },
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        quantity: 0,
      },
      {
        id: 4,
        name: 'Brahma 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
        quantity: 0,
      },
      {
        id: 5,
        name: 'Skol 269ml',
        price: '2.19',
        urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
        quantity: 0,
      },
      {
        id: 6,
        name: 'Skol Beats Senses 313ml',
        price: '4.49',
        urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
        quantity: 0,
      },
      {
        id: 7,
        name: 'Becks 330ml',
        price: '4.99',
        urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
        quantity: 0,
      },
      {
        id: 8,
        name: 'Brahma Duplo Malte 350ml',
        price: '2.79',
        urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
        quantity: 0,
      },
      {
        id: 9,
        name: 'Becks 600ml',
        price: '8.89',
        urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
        quantity: 0,
      },
      {
        id: 10,
        name: 'Skol Beats Senses 269ml',
        price: '3.57',
        urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
        quantity: 0,
      },
      {
        id: 11,
        name: 'Stella Artois 275ml',
        price: '3.49',
        urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
        quantity: 0,
      },
    ] });
    localStorage.setItem('user', JSON.stringify(loginResponse));
    render(<App />, PATH);
    await waitFor(() => {
      expect(CartContext).toBeDefined();
    }, { timeout: 4000 });

    const item1 = await screen
      .findByTestId('customer_products__img-card-bg-image-1');
    expect(item1).toBeInTheDocument();
    const spinBtn = screen.getByTestId('customer_products__input-card-quantity-1');
    userEvent.clear(spinBtn);
    userEvent.type(spinBtn, '1');
    expect(spinBtn.value).toBe('1');
    const add = screen.getByTestId('customer_products__button-card-add-item-1');
    userEvent.click(add);
    const remove = screen.getByTestId('customer_products__button-card-rm-item-1');
    userEvent.click(remove);
    userEvent.click(add);
    const btn = screen.getByTestId('customer_products__button-cart');
    act(() => {
      api.get = jest.fn().mockResolvedValue({ data:
        [
          {
            id: 2,
            name: 'Fulana Pereira',
            email: 'fulana@deliveryapp.com',
            password: '3c28d2b0881bf46457a853e0b07531c6',
            role: 'seller',
          },
        ],
      });
      userEvent.click(btn);
    });
  });

  it('Testa se o console do error', async () => {
    // arrange
    const mockError = new Error('mock error');
    api.get = jest.fn().mockRejectedValue(mockError);
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('user', JSON.stringify(loginResponse));
    render(<App />, PATH);
    // act
    // assert
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(mockError);
    }, { timeout: 4000 });
  });
});
