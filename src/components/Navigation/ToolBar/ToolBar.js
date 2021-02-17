import React from 'react';
import Logo from '@Src/components/Logo/Logo';
import './ToolBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const ToolBar = ({ drawerToggleClicked }) => {
  return (
    <header className="toolbar">
      <DrawerToggle clicked={drawerToggleClicked} />
      <Logo />
      <nav className="desktop-only">
        <NavigationItems />
      </nav>
    </header>
  );
};

export default ToolBar;
