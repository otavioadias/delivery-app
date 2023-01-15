import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CartProvider from '../../context/CartContext';

export default function renderRouter(component, route = '/') {
  window.history.pushState({}, '', route);

  const history = window.location;

  return {
    ...render(
      <BrowserRouter>
        <CartProvider>{ component }</CartProvider>
      </BrowserRouter>,
    ),
    history,
  };
}
