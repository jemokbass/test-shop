import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux';
import Burger from '@Src/components/Burger/Burger';

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;