import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/logo.svg';

import { Container, Cart  } from './styles';
import { useSelector } from 'react-redux';

import { IState } from '../../store';
import { ICartItem } from '../../store/modules/cart/types';

const Header: React.FC = () => {
  const cartSize = useSelector<IState, ICartItem[]>(state => state.cart.items);
  
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt=""/>
      </Link>
      
      <Cart to="/cart">
        <div>
          <strong>Menu carrinho</strong>
          <span>{cartSize.length} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
