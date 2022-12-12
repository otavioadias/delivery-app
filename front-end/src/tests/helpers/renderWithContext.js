import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export default function renderRouter(component, route = '/') {
  window.history.pushState({}, '', route);

  const history = window.location;

  return {
    ...render(<BrowserRouter>{ component }</BrowserRouter>), history,
  };
}
