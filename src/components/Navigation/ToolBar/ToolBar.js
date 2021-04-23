import React from 'react';

import Logo from '@src/components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import './ToolBar.css';

const ToolBar = props => {
  const { drawerToggleClicked, isAuthenticated } = props;

  return (
    <header className="toolbar">
      <DrawerToggle clicked={drawerToggleClicked} />
      <Logo />
      <nav className="desktop-only">
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

export default ToolBar;
