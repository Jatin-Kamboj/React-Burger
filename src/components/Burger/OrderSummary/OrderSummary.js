import React from "react";
import classes from "./OrderSummary.module.css";
import Aux from "../../hoc/auxilary_component";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  componentWillUpdate(prevState, newState) {
    console.log("OrderSummary => ", newState, " => ", prevState);
  }

  render() {
    const ingredientSummary = Object.keys(this.props.summary).map(
      (igkeys, index) => {
        return (
          <li key={igkeys + index}>
            <span style={{ textTransform: "capitalize" }}>{igkeys}</span> :{" "}
            {this.props.summary[igkeys]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Delicious Burger</h3>
        <p>A Delicious burger with following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout</p>
        <Button class="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button class="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
