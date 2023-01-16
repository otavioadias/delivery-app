import App from '../App';
import render from './helpers/renderWithContext';

// mock useParams hook

describe('ProductDetail', () => {
  it('should render the product id in the h1 header', () => {
    render(<App />, '/customer/products/1');
  });
});
