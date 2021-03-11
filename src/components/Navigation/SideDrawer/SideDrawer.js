import React, { Fragment } from 'react';
import Logo from '@Src/components/Logo/Logo';
import Backdrop from '@Src/components/UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';

const SideDrawer = ({ show, closed }) => {
  let attachedClasses = ['side-drawer', 'close'];

  if (show) {
    attachedClasses = ['side-drawer', 'open'];
  }

  return (
    <Fragment>
      <Backdrop show={show} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
