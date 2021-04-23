import React from 'react';

import './DrawerToggle.css';

const DrawerToggle = props => {
  const { clicked } = props;

  return (
    <div className="drawer-toggle" onClick={clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
