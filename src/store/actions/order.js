import * as actionTypes from './actionTypes';
import axios from '@Src/axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerError = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json?auth=' + token, orderData)
    .then(result => {
      dispatch(purchaseBurgerSuccess(result.data, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurgerError(error));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrderError = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());
  const queryParams =
    '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

  axios
    .get('/orders.json' + queryParams)
    .then(result => {
      const fetchedOrders = [];
      for (let key in result.data) {
        fetchedOrders.push({ ...result.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrderError(err));
    });
};
