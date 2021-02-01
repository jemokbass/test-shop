import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux';
import Burger from '@Src/components/Burger/Burger';

export class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
