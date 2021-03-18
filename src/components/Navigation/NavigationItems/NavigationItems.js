import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const NavigationItems = ({ isAuthenticated }) => {
  let navigation = [
    { title: 'Burger Builder', link: '/', exact: true },
    { title: 'Authenticate', link: '/login' },
  ];

  if (isAuthenticated) {
    const authIndex = navigation.findIndex(el => el.title === 'Authenticate');
    navigation[authIndex] = { title: 'Logout', link: '/logout' };
    navigation.splice(-1, 0, { title: 'Orders', link: '/orders' });
  }

  return (
    <ul className="navigation-items">
      {navigation.map(item => {
        return (
          <NavigationItem
            key={item.title}
            children={item.title}
            link={item.link}
            exact={item.exact}
          />
        );
      })}
    </ul>
  );
};

export default NavigationItems;
