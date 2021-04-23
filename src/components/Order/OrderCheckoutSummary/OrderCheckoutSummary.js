import React from 'react';

import Burger from '@src/components/Burger/Burger';
import Button from '@src/components/UI/Button/Button';
import './OrderCheckoutSummary.css';

const OrderCheckoutSummary = props => {
  const { ingredients, checkoutCancel, checkoutContinue } = props;

  return (
    <div className="order-checkout-summary">
      <h1>We hope it tastes well!</h1>
      <div className="order-checkout-summary__burger">
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="danger" clicked={checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderCheckoutSummary;
