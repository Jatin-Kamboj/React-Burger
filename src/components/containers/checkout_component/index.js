import React, { Component } from "react";
import { CheckoutSummary } from "../../order/checkout_summary";
import { Route } from "react-router-dom";
import { ContactDataComponent } from "./contact_data_component";

export class CheckoutComponent extends Component {
  state = {
    ingredients: null,
    price: ""
  };

  componentWillMount() {
    // console.log("checkoutContinue => ", this.props);
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = null;

    for (const param of query.entries()) {
      console.log("Param values => ", param);
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log("checkoutContinue price=> ", price, ingredients);
    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutContinue = () => {
    // console.log("checkoutContinue => ", this.props);
    // console.log("checkoutContinue => ", this.props.history.location.pathname);
    if (this.props.history.location.pathname === "/checkout/contact-data") {
      return;
    } else {
      this.props.history.replace("checkout/contact-data");
    }
  };

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  render() {
    const { ingredients, price } = this.state;
    console.log("CheckoutComponent=> ", ingredients);
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinue={this.checkoutContinue}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactDataComponent
              ingredients={ingredients}
              price={price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckoutComponent;
