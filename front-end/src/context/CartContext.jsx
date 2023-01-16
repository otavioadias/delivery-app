import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// const defaultValue = {
//   cart: [],
//   setCart: () => {},
//   products: [],
//   setProducts: () => {},
// };

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const { value } = useLocalStorage('cart', '');
  const [cart, setCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  console.log('CONTEXT', products);

  const controllers = React.useMemo(() => ({
    cart,
    setCart,
    products,
    setProducts,
  }), [cart, setCart, products, setProducts]);

  React.useEffect(() => {
    setCart(value ?? []);
  }, [value]);

  return (
    <CartContext.Provider value={ controllers }>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
