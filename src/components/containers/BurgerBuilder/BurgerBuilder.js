import React, { Component } from "react";
import Aux from "../../hoc/auxilary_component";
import Burger from "../../Burger/Burger";
import Modal from "../../../components/UI/Modal/Modal";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary.js";
import { axiosInstance } from "../../../axios/axios";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Axios from "axios";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  updatePurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { ingredients } = this.state;
    let queryParams = [];
    for (const key in ingredients) {
      queryParams.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(ingredients[key])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    let queryString = queryParams.join("&");
    console.log("queryString => ", queryString);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
    // console.log("purchaseContinueHandler =>", this.state);
    // this.setState({ loading: true, purchasing: true }, e => {
    //   console.log(this.state);
    // });

    // const order = {

    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customerData: {
    //     name: "Jatin",
    //     address: {
    //       street: "Lodhi Road",
    //       zipcode: 112233,
    //       country: "india"
    //     },
    //     email: "test@gmail.com",
    //     deliveryMethod: "Fastest"
    //   }
    // };

    // axiosInstance
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({
    //       loading: false
    //     });

    //     console.log("purchaseContinueHandler => ", response);
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //     console.log("error => ", error);
    //   });
  };

  componentDidMount() {
    axiosInstance
      .get("/Ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
        console.log(response);
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (const ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;
    burger = this.state.error ? <p>{this.state.error.message}</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}>Burger</Burger>
          <BuildControls
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ingredientAdded={this.addInggredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          summary={this.state.ingredients}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
