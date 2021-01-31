import React from 'react';
import Aux from '@Src/hoc/Aux';

const Layout = ({ children }) => {
  return (
    <Aux>
      <header>Test header</header>
      <main>{children}</main>
    </Aux>
  );
};

export default Layout;
