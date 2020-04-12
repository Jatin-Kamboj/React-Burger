import React, { Component } from "react";
import { OrderComponent } from "../order";
import { axiosInstance } from "../../axios/axios";
import Spinner from "../UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { applicationUrls } from "../../common";
import { get } from "../../Utils";

class OrdersComponent extends Component {
  state = {
    orders: [],
    loading: false,
  };
  componentDidMount() {
    console.log("componentDidMount");
    // this.setState({ loading: true });
    // if (this.props.isUserAuthorised) {
    get("token") && this.props.getOrdersInit(get("token"));
    // }
  }

  render() {
    let isOrdersLoaded = <Spinner />;
    // console.log("Orders => ", this.props);
    const { orders, isUserAuthorised } = this.state;

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
    /**
     * else if (!isUserAuthorised) {
      // console.log("isUserAuthorised :", isUserAuthorised);
      isOrdersLoaded = <Redirect to={applicationUrls.root} />;
    }
     */

    return <div>{isOrdersLoaded}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    error: state.order.error,
    loading: state.order.loading,
    token: state.auth.token,
    isUserAuthorised: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersInit: (token) => dispatch(actionCreators.fetchOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
