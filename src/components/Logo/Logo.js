import React from 'react';
import BurgerLogo from '@src/assets/images/burger-logo.png';
import './Logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={BurgerLogo} alt="burger logotype" />
    </Link>
  );
};

export default Logo;
