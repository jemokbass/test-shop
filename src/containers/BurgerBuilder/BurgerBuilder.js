import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux';
import Burger from '@Src/components/Burger/Burger';
import BuildControls from '@Src/components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.8,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.7,
};
export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2,
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  removeIngredientHandler = type => {};

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls addIngredient={this.addIngredientHandler} />
        <h2>{this.state.totalPrice}</h2>
      </Aux>
    );
  }
}

export default BurgerBuilder;
