import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux';

export class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Build controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
