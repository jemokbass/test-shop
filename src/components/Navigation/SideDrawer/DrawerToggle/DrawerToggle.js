import React from 'react';
import './DrawerToggle.css';

const DrawerToggle = ({ clicked }) => {
  return (
    <div className="drawer-toggle" onClick={clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
