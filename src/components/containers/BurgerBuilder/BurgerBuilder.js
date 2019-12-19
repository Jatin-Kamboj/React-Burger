import React, { Component } from "react";
import Aux from "../../hoc/auxilary_component";
import Burger from "../../Burger/Burger";
import Modal from "../../../components/UI/Modal/Modal";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary.js";
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  updatePurchase = ingredients => {
    console.log(ingredients);

    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 }, e => {
      console.log(this.state);
    });
    console.log("sum => ", sum);
  };

  addInggredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = priceAddition + oldPrice;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };

    if (oldCount <= 0) {
      return;
    }

    updatedIngredients[type] = oldCount - 1;

    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchase(updatedIngredients);
  };

  purchaseHandler = () => {
    console.log("purchaseHandler => ");
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    console.log("purchaseHandler => ");
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You Continue!");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (const ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            summary={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}>Burger</Burger>
        <BuildControls
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ingredientAdded={this.addInggredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
