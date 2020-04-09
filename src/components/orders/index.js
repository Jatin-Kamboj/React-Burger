import React, { Component } from "react";
import { OrderComponent } from "../order";
import { axiosInstance } from "../../axios/axios";
import Spinner from "../UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

class OrdersComponent extends Component {
  state = {
    orders: [],
    loading: false
  };
  componentDidMount() {
    // this.setState({ loading: true });
    this.props.getOrdersInit();
  }
  render() {
    let isOrdersLoaded = <Spinner />;
    console.log("Orders => ", this.props);
    const { orders } = this.state;
    // let orderView = null;
    if (orders) {
      isOrdersLoaded =
        this.props.orders &&
        this.props.orders.map((element, index) => {
          return (
            <OrderComponent
              key={element.id}
              price={element.price}
              ingredients={element.ingredients}
            />
          );
        });
    }

    return <div>{isOrdersLoaded}</div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    orders: state.order.orders,
    error: state.order.error,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrdersInit: () => dispatch(actionCreators.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
