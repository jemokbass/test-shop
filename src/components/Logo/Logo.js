import React from 'react';
import { Link } from 'react-router-dom';

import BurgerLogo from '@src/assets/images/burger-logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={BurgerLogo} alt="burger logotype" />
    </Link>
  );
};

export default Logo;
