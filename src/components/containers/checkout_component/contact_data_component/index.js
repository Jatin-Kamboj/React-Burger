import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import Classes from "./style.module.css";
import { axiosInstance } from "../../../../axios/axios";
import Spinner from "../../../UI/Spinner/Spinner";
import { InputComponent } from "../../../UI/input_components/input_component";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as ActionCreators from "../../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactDataComponent extends Component {
  state = {
    orderForm: {
      name: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your zipCode",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "india",
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
          placeholder: "Delivery Method",
        },
        value: "fastest",
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }
  };

  orderHandler = (event) => {
    event.preventDefault();
    const { userId } = this.props;
    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    // console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderForm: formData,
      userId: userId,
    };
    this.props.purchaseBurgerStart(order, this.props.token);
    this.props.history.push("/");
  };

  inputOnChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    // console.log("contact => ", this.props);
    const { isLoading, orderForm } = this.state;

    let formInputArray = [];
    for (const key in orderForm) {
      formInputArray.push({ id: key, config: orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputArray.map((element) => {
          return (
            <InputComponent
              key={element.id}
              inputElement={element.config.elementtype}
              elementConfig={element.config}
              value={element.config.value}
              changed={(event) => this.inputOnChangeHandler(event, element.id)}
              label={element.id}
              placeholder={element.config.elementconfig.placeholder}
            />
          );
        })}
        <Button buttonClass="Success">Save Order</Button>
      </form>
    );

    if (isLoading) {
      form = <Spinner />;
    }
    return (
      <div className={`${Classes.contactData} ${Classes.contact}`}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    token: state.auth.token,
    userId: state.auth.localId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurgerStart: (orderData, token) =>
      dispatch(ActionCreators.purchaseBurgerStart(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactDataComponent), axiosInstance));
