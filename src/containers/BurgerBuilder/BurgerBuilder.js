import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Burger from '@src/components/Burger/Burger';
import BuildControls from '@src/components/Burger/BuildControls/BuildControls';
import axios from '@src/axios-orders';
import Modal from '@src/components/UI/Modal/Modal';
import OrderSummary from '@src/components/Burger/OrderSummary/OrderSummary';
import Spinner from '@src/components/UI/Spinner/Spinner';
import withErrorHandler from '@src/hoc/withErrorHandler/withErrorHandler';

import {
  addIngredient,
  initialPrice,
  initIngredients,
  removeIngredient,
} from '@src/store/actions/burgerBuilder';
import { purchaseInit } from '@src/store/actions/order';
import { setAuthRedirectPath } from '@src/store/actions/auth';

export const BurgerBuilder = props => {
  const history = useHistory();
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const ing = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const onIngredientAdded = ingName => dispatch(addIngredient(ingName));
  const onIngredientRemoved = ingName => dispatch(removeIngredient(ingName));
  const onInitPrice = useCallback(() => dispatch(initialPrice()), [dispatch]);
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(purchaseInit());
  const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

  useEffect(() => {
    onInitPrice();
    onInitIngredients();
  }, [onInitPrice, onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const closeModalHandler = () => {
    setPurchasing(false);
  };

  const continuePurchaseHandler = () => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disabledInfo = { ...ing };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p style={{ textAlign: 'center' }}>Ingredient's can't be a loaded</p> : <Spinner />;

  if (ing && price) {
    burger = (
      <Fragment>
        <Burger ingredients={ing} />
        <BuildControls
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ing)}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ing}
        continuePurchase={continuePurchaseHandler}
        closePurchase={closeModalHandler}
        totalPrice={price.toFixed(2)}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} closeModal={closeModalHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
