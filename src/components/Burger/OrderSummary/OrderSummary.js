import React, { Fragment } from 'react';

import Button from '@src/components/UI/Button/Button';

const OrderSummary = props => {
  const { ingredients, closePurchase, continuePurchase, totalPrice } = props;

  const ingredientsSummary = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
      </li>
    );
  });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price:</strong> {totalPrice}
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="danger" uppercase clicked={closePurchase}>
        Cancel
      </Button>
      <Button btnType="success" uppercase clicked={continuePurchase}>
        Continue
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
