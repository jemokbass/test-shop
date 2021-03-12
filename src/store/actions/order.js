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
