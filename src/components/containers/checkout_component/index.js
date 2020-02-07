import React, { Component } from "react";
import { CheckoutSummary } from "../../order/checkout_summary";

export class CheckoutComponent extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1
    }
  };
  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    );
  }
}

export default CheckoutComponent;
