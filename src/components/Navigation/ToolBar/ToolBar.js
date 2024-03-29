import React from 'react';
import Logo from '@src/components/Logo/Logo';
import './ToolBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const ToolBar = ({ drawerToggleClicked, isAuthenticated }) => {
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
