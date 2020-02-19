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
        value: ""
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your email"
        },
        value: ""
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your street"
        },
        value: ""
      },
      zipCode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your zipCode"
        },
        value: ""
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "india"
      },
      deliveryMethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" }
          ],
          placeholder: "Your country"
        },
        value: ""
      }
    }
  };

  orderHandler = event => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    console.log("order => ", this.props);

    event.preventDefault();
    axiosInstance
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });

        console.log("purchaseContinueHandler => ", response);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log("error => ", error);
      });
  };

  render() {
    const { isLoading, orderForm } = this.state;

    let formInputArray = [];
    for (const key in orderForm) {
      formInputArray.push({ id: key, config: orderForm[key] });
    }
    console.log("formInputArray => ", formInputArray);

    let form = (
      <form action="">
        {formInputArray.map(element => {
          console.log(
            "Contract Data => ",
            element.config.elementconfig.placeholder
          );
          return (
            <InputComponent
              key={element.id}
              inputElement={element.config.elementtype}
              elementConfig={element.config}
              value={element.config.value}
              label={element.id}
              placeholder={element.config.elementconfig.placeholder}
            />
          );
        })}
        <Button buttonClass="Success" clicked={this.orderHandler}>
          Save Order
        </Button>
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
