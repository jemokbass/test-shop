import React, { Component } from 'react';
import axios from '@Src/axios-orders';
import Button from '@Src/components/UI/Button/Button';
import './ContactData.css';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import { withRouter } from 'react-router';
import Input from '@Src/components/UI/Input/Input';

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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-Mail',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: 'Russia',
        },
        email: this.state.email,
      },
      deliveryMethod: 'Fastest',
    };
    this.setState({ loading: true });

    axios
      .post('/orders.json', order)
      .then(result => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form>
        {formElementsArr.map(formElement => (
          <Input
            elementType={formElement.config.elementType}
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button btnType="success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;

    return (
      <div className="contact-data">
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
