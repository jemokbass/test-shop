import React from 'react';
import Logo from '@Src/components/Logo/Logo';
import Backdrop from '@Src/components/UI/Backdrop/Backdrop';
import Aux from '@Src/hoc/Aux';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';

const SideDrawer = ({ show, closed }) => {
  let attachedClasses = ['side-drawer', 'close'];

  if (show) {
    attachedClasses = ['side-drawer', 'open'];
  }

  return (
    <Aux>
      <Backdrop show={show} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
