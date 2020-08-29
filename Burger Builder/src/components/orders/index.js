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
    // this.setState({ loading: true });
    // if (this.props.isUserAuthorised) {
    get("token") && this.props.getOrdersInit(get("token"), this.props.userId);
    // }
  }

  render() {
    let isOrdersLoaded = <Spinner />;

    const { orders, isUserAuthorised } = this.state;

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
    userId: state.auth.localId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersInit: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
