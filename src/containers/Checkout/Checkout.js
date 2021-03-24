import React, { Component, Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderCheckoutSummary from '@src/components/Order/OrderCheckoutSummary/OrderCheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <Fragment>
          {purchaseRedirect}
          <OrderCheckoutSummary
            ingredients={this.props.ing}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </Fragment>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => ({
  ing: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
