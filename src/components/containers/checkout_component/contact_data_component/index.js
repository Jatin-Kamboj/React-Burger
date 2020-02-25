import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import Classes from "./style.module.css";
import { axiosInstance } from "../../../../axios/axios";
import Spinner from "../../../UI/Spinner/Spinner";
import { InputComponent } from "../../../UI/input_components/input_component";

export class ContactDataComponent extends Component {
  state = {
    orderForm: {
      name: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        }
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        }
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your zipCode"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "india",
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" }
          ],
          placeholder: "Delivery Method"
        },
        value: "fastest"
      }
    }
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderForm: formData
    };

    axiosInstance
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });

        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputOnChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const { isLoading, orderForm } = this.state;

    let formInputArray = [];
    for (const key in orderForm) {
      formInputArray.push({ id: key, config: orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputArray.map(element => {
          return (
            <InputComponent
              key={element.id}
              inputElement={element.config.elementtype}
              elementConfig={element.config}
              value={element.config.value}
              changed={event => this.inputOnChangeHandler(event, element.id)}
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

export default ContactDataComponent;
