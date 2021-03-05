import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const NavigationItems = () => {
  const navigation = [
    { title: 'Burger Builder', link: '/', exact: true },
    { title: 'Orders', link: '/orders' },
  ];

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
