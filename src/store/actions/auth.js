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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
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
      const expirationDate = new Date(
        new Date().getTime() + result.data.expiresIn * 1000
      );
      console.log(result);
      localStorage.setItem('token', result.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', result.data.localId);
      dispatch(authSuccess(result.data.idToken, result.data.localId));
      dispatch(checkAuthTimeout(result.data.expiresIn));
    })
    .catch(err => {
      dispatch(authError(err.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token) {
    dispatch(logout());
  } else {
    const expDate = new Date(localStorage.getItem('expirationDate'));

    if (expDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};
