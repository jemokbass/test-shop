import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from '@Src/components/Burger/Burger';
import BuildControls from '@Src/components/Burger/BuildControls/BuildControls';
import Modal from '@Src/components/UI/Modal/Modal';
import OrderSummary from '@Src/components/Burger/OrderSummary/OrderSummary';
import axios from '@Src/axios-orders';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import withErrorHandler from '@Src/hoc/withErrorHandler/withErrorHandler';
import {
  addIngredient,
  initialPrice,
  initIngredients,
  removeIngredient,
} from '@Src/store/actions/burgerBuilder';
import { purchaseInit } from '@Src/store/actions/order';
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitPrice();
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Ingredient's can't be a loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ing && this.props.price) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          continuePurchase={this.continuePurchaseHandler}
          closePurchase={this.closeModalHandler}
          totalPrice={this.props.price.toFixed(2)}
        />
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} closeModal={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ing: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(removeIngredient(ingName)),
  onInitPrice: () => dispatch(initialPrice()),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
