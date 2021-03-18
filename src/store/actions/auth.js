import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authError = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 10);
};

export const auth = (email, password, isSignUp) => dispatch => {
  dispatch(authStart());
  const authData = { email, password, returnSecureToken: true };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2YnAsRXpFnDLSKvIWzx8CDlL8SBXDZgo';
  if (!isSignUp) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2YnAsRXpFnDLSKvIWzx8CDlL8SBXDZgo';
  }
  axios
    .post(url, authData)
    .then(result => {
      console.log(result);
      dispatch(authSuccess(result.data.idToken, result.data.localId));
      dispatch(checkAuthTimeout(result.data.expiresIn));
    })
    .catch(err => {
      dispatch(authError(err.response.data.error));
    });
};
