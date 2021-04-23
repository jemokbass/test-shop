import React, { Fragment } from 'react';

import Logo from '@src/components/Logo/Logo';
import Backdrop from '@src/components/UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';

const SideDrawer = props => {
  const { show, closed, isAuthenticated } = props;

  let attachedClasses = ['side-drawer', 'close'];

  if (show) {
    attachedClasses = ['side-drawer', 'open'];
  }

  return (
    <Fragment>
      <Backdrop show={show} clicked={closed} />
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <Logo />
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
