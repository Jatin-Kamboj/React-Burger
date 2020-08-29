import React, { Component, Fragment } from "react";
import { CheckoutSummary } from "../../order/checkout_summary";
import { Route, Redirect, withRouter } from "react-router-dom";
import ContactDataComponent from "./contact_data_component";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../../store/actions";
import { axiosInstance } from "../../../axios/axios";
import Spinner from "../../UI/Spinner/Spinner";

class CheckoutComponent extends Component {
  state = {
    ingredients: null,
    price: "",
  };

  // componentWillMount() {
  //   // console.log("checkoutContinue => ", this.props);
  //   const query = new URLSearchParams(this.props.location.search);

  //   const ingredients = {};
  //   let price = null;

  //   for (const param of query.entries()) {
  //     // console.log("Param values => ", param);
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   // console.log("checkoutContinue price=> ", price, ingredients);
  //   this.setState({ ingredients: ingredients, price: price });
  // }

  checkoutContinue = () => {
    // console.log("checkoutContinue => ", this.props);
    // console.log("checkoutContinue => ", this.props.history.location.pathname);
    if (this.props.history.location.pathname === "/checkout/contact-data") {
      return;
    } else {
      this.props.history.replace("checkout/contact-data");
    }
  };

  componentDidMount() {
    // this.props.onPurchaseInit();
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  // <Route
  // path={this.props.match.path + "/contact-data"}
  // render={props => (
  //   <ContactDataComponent
  //     ingredients={ingredients}
  //     price={price}
  //     {...props}
  //   />
  // )}
  render() {
    const { ingredients, price } = this.props;
    const isIngLoaded = <Redirect to="/" />;
    const isBurgerPurchased =
      this.props.purchased && this.props.purchased ? <Redirect to="/" /> : null;
    // console.log("CheckoutComponent=> ", ingredients);
    return (
      <div>
        {this.props.ingredients ? (
          <Fragment>
            {isBurgerPurchased}
            <CheckoutSummary
              ingredients={ingredients}
              checkoutCancelled={this.checkoutCancelled}
              checkoutContinue={this.checkoutContinue}
            />
            <Route
              path={this.props.match.path + "/contact-data"}
              render={() => <ContactDataComponent />}
            />
          </Fragment>
        ) : (
          isIngLoaded
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
//   };
// };
export default withRouter(
  connect(
    mapStateToProps
    // ,mapDispatchToProps
  )(withErrorHandler(CheckoutComponent, axiosInstance))
);
