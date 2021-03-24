import React from 'react';
import './Order.css';

const Order = ({ price, ingredients }) => {
  const allIngredients = [];

  for (let ingredientName in ingredients) {
    allIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientOutput = allIngredients.map(ig => {
    return (
      <span className="order__ingredients" key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
