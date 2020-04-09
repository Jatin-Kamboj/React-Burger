import React, { Component } from "react";
import { FormComponent } from "../../forms";
import { TextFieldComponent, LabelComponent } from "../../forms";
import { required } from "../../../validations";
export class Auth extends Component {
  formSubmitHandler = (values) => {
    console.log("formSubmitHandler => ", values);
  };

  render() {
    console.log("Auth => ", this.props);
    return (
      <div>
        <FormComponent onSubmit={this.formSubmitHandler} form="Auth">
          <div className="form-group">
            <LabelComponent
              labelFor="email"
              className="float-left"
              labelName="Email"
            />
            <TextFieldComponent name="email" type="text" validate={required} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </FormComponent>
      </div>
    );
  }
}

export default Auth;
