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
  ingredients: ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch => {
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
})
