import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formattedPrice } from '../../utils/format';

import { ProductList } from './styles';

import { IState } from '../../store';
import { ICartItem } from '../../store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartRequest } from '../../store/modules/cart/actions';

interface Products {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  priceFormatted: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Products[]>([]);

  const amount = useSelector<IState, ICartItem[]>(state => state.cart.items).reduce((acum:any, {product, quantity}) => {
    acum[product.id] = quantity;

    return acum;
  }, {})

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Products[]>('products');

      const data = response.data.map(product => ({
        ...product,
        formatted: formattedPrice(product.price)
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            onClick={() => dispatch(addProductToCartRequest(product.id))}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
