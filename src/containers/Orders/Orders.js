import React, { Component } from 'react';
import axios from '@Src/axios-orders';
import Order from '@Src/components/Order/Order';
import withErrorHandler from '@Src/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    allOrders: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(result => {
        const fetchedOrders = [];
        for (let key in result.data) {
          fetchedOrders.push({ ...result.data[key], id: key });
        }
        this.setState({ allOrders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.allOrders.map(order => (
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
