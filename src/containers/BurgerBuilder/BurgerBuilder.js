import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux/Aux';
import Burger from '@Src/components/Burger/Burger';
import BuildControls from '@Src/components/Burger/BuildControls/BuildControls';
import Modal from '@Src/components/UI/Modal/Modal';
import OrderSummary from '@Src/components/Burger/OrderSummary/OrderSummary';
import axios from '@Src/axios-orders';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import withErrorHandler from '@Src/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS } from '@Src/store/actions';
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    //axios
    //  .get(
    //    'https://mytestreact-8ebdb-default-rtdb.firebaseio.com/ingredients.json'
    //  )
    //  .then(result => {
    //    this.setState({ ingredients: result.data });
    //  })
    //  .catch(err => {
    //    this.setState({ error: true });
    //  });
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
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: 'center' }}>Ingredient's can't be a loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
          />
        </Aux>
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} closeModal={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ing: state.ingredients,
  price: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName =>
    dispatch({ type: ADD_INGREDIENTS, ingredientName: ingName }),
  onIngredientRemoved: ingName =>
    dispatch({ type: REMOVE_INGREDIENTS, ingredientName: ingName }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
