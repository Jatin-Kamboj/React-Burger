import React, { Component } from "react";
import { OrderComponent } from "../order";
import { axiosInstance } from "../../axios/axios";
import Spinner from "../UI/Spinner/Spinner";

export class OrdersComponent extends Component {
  state = {
    orders: [],
    loading: false
  };
  componentDidMount() {
    this.setState({ loading: true });
    axiosInstance
      .get("/orders.json")
      .then(response => {
        let fetchOrders = [];
        for (const key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { orders } = this.state;
    let orderView = null;
    if (orders) {
      orderView = orders.map((element, index) => {
        return (
          <OrderComponent
            key={element.id}
            price={element.price}
            ingredients={element.ingredients}
          />
        );
      });
    }

    return <div>{orderView}</div>;
  }
}

export default OrdersComponent;
