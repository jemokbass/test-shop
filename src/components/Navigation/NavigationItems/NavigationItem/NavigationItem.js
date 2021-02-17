import React from 'react';
import './NavigationItem.css';

const NavigationItem = ({ children, link, active }) => {
  return (
    <li className="navigation-item">
      <a className={active ? 'active' : null} href={link}>
        {children}
      </a>
    </li>
  );
};

export default NavigationItem;
