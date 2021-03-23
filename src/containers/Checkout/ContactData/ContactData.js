import React, { Component } from 'react';
import Button from '@Src/components/UI/Button/Button';
import './ContactData.css';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import Input from '@Src/components/UI/Input/Input';
import { connect } from 'react-redux';
import { purchaseBurger } from '@Src/store/actions/order';
import withErrorHandler from '@Src/hoc/withErrorHandler/withErrorHandler';
import axios from '@Src/axios-orders';
import { checkValidity, updateObject } from '@Src/shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'none', displayValue: 'None' },
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'none',
        valid: false,
        validation: {
          isSelect: true,
        },
      },
    },
    formIsValid: false,
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormEl = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormEl,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    return (
      <div className="contact-data">
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ing: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
