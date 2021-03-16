import axios from '@Src/axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name,
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const setInitialPrice = price => ({
  type: actionTypes.SET_INITIAL_PRICE,
  price,
});

export const errorInitialPrice = () => ({
  type: actionTypes.ERROR_INITIAL_PRICE,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initialPrice = () => dispatch => {
  axios
    .get(
      'https://mytestreact-8ebdb-default-rtdb.firebaseio.com/initialPrice.json'
    )
    .then(result => {
      dispatch(setInitialPrice(result.data));
    })
    .catch(err => {
      dispatch(errorInitialPrice());
    });
};

export const initIngredients = () => dispatch => {
  axios
    .get(
      'https://mytestreact-8ebdb-default-rtdb.firebaseio.com/ingredients.json'
    )
    .then(result => {
      dispatch(setIngredients(result.data));
    })
    .catch(err => {
      dispatch(fetchIngredientsFailed());
    });
};
