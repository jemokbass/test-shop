import React from 'react';
import Aux from '@Src/hoc/Aux';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <Aux>
      <header>Test header</header>
      <main className="Content">{children}</main>
    </Aux>
  );
};

export default Layout;
