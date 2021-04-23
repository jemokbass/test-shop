import React, { Fragment } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import OrderCheckoutSummary from '@src/components/Order/OrderCheckoutSummary/OrderCheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const { match } = props;
  const history = useHistory();
  const ing = useSelector(state => state.burgerBuilder.ingredients);
  const purchased = useSelector(state => state.order.purchased);
  const checkoutCancelHandler = () => {
    history.goBack();
  };

  const checkoutContinueHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (ing) {
    const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <Fragment>
        {purchaseRedirect}
        <OrderCheckoutSummary
          ingredients={ing}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
        />
        <Route path={match.path + '/contact-data'} component={ContactData} />
      </Fragment>
    );
  }

  return summary;
};

export default Checkout;
