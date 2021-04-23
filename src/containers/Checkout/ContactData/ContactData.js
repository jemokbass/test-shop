import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '@src/axios-orders';
import { checkValidity, updateObject } from '@src/shared/utility';

import Button from '@src/components/UI/Button/Button';
import Spinner from '@src/components/UI/Spinner/Spinner';
import Input from '@src/components/UI/Input/Input';
import { purchaseBurger } from '@src/store/actions/order';
import withErrorHandler from '@src/hoc/withErrorHandler/withErrorHandler';
import './ContactData.css';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
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
  });
  const dispatch = useDispatch();
  const [formsIsValid, setFormsIsValid] = useState(false);
  const ing = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const loading = useSelector(state => state.order.loading);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const onOrderBurger = (orderData, token) => dispatch(purchaseBurger(orderData, token));

  const orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }
    const order = {
      ingredients: ing,
      price: price,
      orderData: formData,
      userId: userId,
    };
    onOrderBurger(order, token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormEl = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormEl,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormsIsValid(formIsValid);
  };

  const formElementsArr = [];
  for (let key in orderForm) {
    formElementsArr.push({ id: key, config: orderForm[key] });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArr.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="success" disabled={!formsIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (loading) form = <Spinner />;

  return (
    <div className="contact-data">
      <h4>Enter your contact data:</h4>
      {form}
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
