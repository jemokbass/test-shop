import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import './Layout.css';

const Layout = props => {
  const { children } = props;
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => {
      return { showSideDrawer: !prevState };
    });
  };

  return (
    <Fragment>
      <ToolBar isAuthenticated={isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer show={showSideDrawer} closed={sideDrawerClosedHandler} isAuthenticated={isAuthenticated} />
      <main className="content">{children}</main>
    </Fragment>
  );
};

export default Layout;
