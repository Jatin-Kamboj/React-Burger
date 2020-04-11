import React, { Component } from "react";
import Aux from "../../hoc/auxilary_component";
import Burger from "../../Burger/Burger";
import Modal from "../../../components/UI/Modal/Modal";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary.js";
import { axiosInstance } from "../../../axios/axios";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";
import * as burgerBuilderActionCreators from "../../../store/actions/burger_builder_actioncreators";
import * as actionCreators from "../../../store/actions";
import { applicationUrls } from "../../../common";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  // addInggredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];

  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = priceAddition + oldPrice;
  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients
  //   });

  //   this.updatePurchase(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };

  //   if (oldCount <= 0) {
  //     return;
  //   }

  //   updatedIngredients[type] = oldCount - 1;

  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchase(updatedIngredients);
  // };

  purchaseHandler = () => {
    console.log("purchaseHandler");
    if (!this.props.isAuthorised) {
      this.props.history.push(applicationUrls.auth);
      this.props.onsetAuthRedirectPath(applicationUrls.auth);
    } else {
      this.setState({ purchasing: true });
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const { ingredients } = this.state;
    // let queryParams = [];
    // for (const key in ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(key) + "=" + encodeURIComponent(ingredients[key])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // let queryString = queryParams.join("&");
    // console.log("queryString => ", queryString);

    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onPurchaseInit();
    if (this.props.isAuthorised) {
      this.props.history.push(applicationUrls.checkout);
    }
    // else {
    //   this.props.history.push(applicationUrls.root);
    // }

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
    this.props.onInitIngredients(this.props.isAuthorised);

    // axiosInstance.get("ingredientsInitialCost.json").then(response => {
    //   console.log(response);
    // });
    // axiosInstance
    //   .get("/Ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     this.setState({ error: error });
    //   });
  }

  render() {
    // console.log("Props => ", this.props);
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (const ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;

    burger = this.props.error ? (
      <p>{this.state.props.errorMessage}</p>
    ) : (
      <Spinner />
    );
    // if (this.state.ingredients) {
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}>Burger</Burger>
          <BuildControls
            price={this.props.totalPrice}
            purchaseable={this.props.isPurchaseAble}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            ordered={this.purchaseHandler}
            isAuthorised={this.props.isAuthorised}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          summary={this.props.ingredients}
          isAuthorised={this.props.isAuthorised}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isPurchaseAble: state.burgerBuilder.purchaseable,
    error: state.burgerBuilder.error,
    errorMessage: state.burgerBuilder.errorMessage,
    isAuthorised: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredient) =>
      dispatch(burgerBuilderActionCreators.add_ingredient(ingredient)),
    onIngredientRemoved: (ingredient) =>
      dispatch(burgerBuilderActionCreators.remove_ingredient(ingredient)),
    onInitIngredients: (isAuthorised) =>
      dispatch(burgerBuilderActionCreators.initIngredients(isAuthorised)),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onsetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

// export default withErrorHandler(BurgerBuilder, axiosInstance);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
// export default connect(mapStateToProps)(
//   withErrorHandler(BurgerBuilder, axiosInstance)
// );
