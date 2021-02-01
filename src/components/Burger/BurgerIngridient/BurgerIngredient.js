import React from 'react';
import './BurgerIngredient.css';

const BurgerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className="bread__bottom"></div>;
      break;
    case 'bread-top':
      ingredient = (
        <div className="bread__top">
          <div className="seeds1"></div>
          <div className="seeds2"></div>
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className="meat"></div>;
      break;
    case 'bacon':
      ingredient = <div className="bacon"></div>;
      break;
    case 'salad':
      ingredient = <div className="salad"></div>;
      break;
    case 'cheese':
      ingredient = <div className="cheese"></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

export default BurgerIngredient;
