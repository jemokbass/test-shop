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

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then(result => {
      console.log(result.data);
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
  orders: orders,
});

export const fetchOrderError = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
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
