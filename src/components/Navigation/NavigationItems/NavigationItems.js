import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const NavigationItems = () => {
  const navigation = [
    { title: 'Burger Builder', active: true, link: '/' },
    { title: 'Checkout', link: '/' },
  ];
  return (
    <ul className="navigation-items">
      {navigation.map(item => {
        return (
          <NavigationItem
            key={item.title}
            children={item.title}
            link={item.link}
            active={item.active}
          />
        );
      })}
    </ul>
  );
};

export default NavigationItems;
