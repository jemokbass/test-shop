import React from 'react';
import BurgerLogo from '@Assets/images/burger-logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <a className="logo">
      <img src={BurgerLogo} alt="burger logotype" />
    </a>
  );
};

export default Logo;
