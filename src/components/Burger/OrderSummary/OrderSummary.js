import React from 'react';
import Aux from '@Src/hoc/Aux';

const OrderSummary = ({ ingredients }) => {
  const ingredientsSummary = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
