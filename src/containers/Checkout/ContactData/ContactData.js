import React, { Component } from 'react';
import axios from '@Src/axios-orders';
import Button from '@Src/components/UI/Button/Button';
import './ContactData.css';
import Spinner from '@Src/components/UI/Spinner/Spinner';
import { withRouter } from 'react-router';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
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
    let form = (
      <form>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Your Name"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Your Mail"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          className="input"
          type="text"
          name="street"
          placeholder="Your street"
          value={this.state.address.street}
          //onChange={e => this.setState({ address: e.target.value })}
        />
        <input
          className="input"
          type="text"
          name="postal"
          placeholder="Your postal code"
          value={this.state.address.postalCode}
          //onChange={e => this.setState({ address: e.target.value })}
        />
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
