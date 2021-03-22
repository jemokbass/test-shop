import React, { Component } from 'react';
import axios from '@Src/axios-orders';
import Order from '@Src/components/Order/Order';
import withErrorHandler from '@Src/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrders } from '@Src/store/actions/order';
import Spinner from '@Src/components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.allOrders.map(order => (
        <Order
          key={order.id}
          price={+order.price}
          ingredients={order.ingredients}
        />
      ));
    }

    return orders;
  }
}

const mapStateToProps = state => ({
  allOrders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
