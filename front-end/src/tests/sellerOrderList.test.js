// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// // import axios from 'axios';
// import render from './helpers/renderWithContext';
// import App from '../App';
// import { loginResponseAdm } from './mocks/mock';
// import api from '../services/api';

// describe('Seller', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//     localStorage.clear();
//   });
//   beforeEach(() => {
//     jest.mock('../API');
//     jest.mock('../services/api');
//   });

//   it('Testa se aparece a galera', async () => {
//     // arrange
//     localStorage.setItem('user', JSON.stringify(loginResponseAdm));
//     api.get = jest.fn().mockResolvedValue();
//     const { history } = render(<App />, '/login');
//     // act
//     // assert
//     await waitFor(() => {
//       expect(history.pathname).toBe('/admin/manage');
//     });
//     const list1 = await screen
//       .findByTestId('admin_manage__element-user-table-item-number-0');
//     const list2 = await screen
//       .findByTestId('admin_manage__element-user-table-item-number-1');
//     expect(list1).toBeInTheDocument();
//     expect(list2).toBeInTheDocument();
//   });
// });
