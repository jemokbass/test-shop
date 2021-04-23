import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '@src/axios-orders';

import Order from '@src/components/Order/Order';
import withErrorHandler from '@src/hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '@src/store/actions/order';
import Spinner from '@src/components/UI/Spinner/Spinner';

const Orders = props => {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const onFetchOrders = useCallback((token, userId) => dispatch(fetchOrders(token, userId)), [dispatch]);

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orders = <Spinner />;

  if (!loading) {
    orders = allOrders.map(order => (
      <Order key={order.id} price={+order.price} ingredients={order.ingredients} />
    ));
  }

  return orders;
};

export default withErrorHandler(Orders, axios);
