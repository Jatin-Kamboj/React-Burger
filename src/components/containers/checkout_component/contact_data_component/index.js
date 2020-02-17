import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import Classes from "./style.module.css";
import { axiosInstance } from "../../../../axios/axios";
import Spinner from "../../../UI/Spinner/Spinner";
export class ContactDataComponent extends Component {
  state = {
    name: "",
    email: "",
    address: { street: "", postalCode: "" },
    isLoading: false
  };

  orderHandler = event => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerData: {
        name: "Jatin",
        address: {
          street: "Lodhi Road",
          zipcode: 112233,
          country: "india"
        },
        email: "test@gmail.com",
        deliveryMethod: "Fastest"
      }
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
    const { isLoading } = this.state;
    let form = (
      <form action="">
        <input type="text" name="name" placeholder="Your Name" />
        <input type="text" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postalCode" placeholder="Your PostalCode" />
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
