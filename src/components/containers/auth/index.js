import React, { Component } from "react";
import { FormComponent } from "../../forms";
import { TextFieldComponent, LabelComponent } from "../../forms";
import { required, validateEmail } from "../../../validations";
import Button from "../../UI/Button/Button";
import { auth } from "../../../store/actions";
import { connect } from "react-redux";

export class Auth extends Component {
  state = {
    isSignIn: false,
  };

  formSubmitHandler = (values) => {
    console.log("formSubmitHandler => ", values);
    if (values) {
      this.props.getAuth(values, this.state.isSignIn);
    }
  };
  toggleSignButton = () => {
    this.setState((prevState) => {
      return {
        isSignIn: !prevState.isSignIn,
      };
    });
  };

  componentDidMount() {}

  render() {
    console.log("Auth => ", this.state);
    const { isSignIn } = this.state;
    return (
      <div>
        <FormComponent onSubmit={this.formSubmitHandler} form="Auth">
          <div className="form-group">
            <LabelComponent
              labelFor="email"
              className="float-left"
              labelName="Email"
            />
            <TextFieldComponent
              name="email"
              type="text"
              validate={[required, validateEmail]}
            />
          </div>
          <div className="form-group">
            <LabelComponent
              labelFor="password"
              className="float-left"
              labelName="password"
            />
            <TextFieldComponent
              name="password"
              type="password"
              validate={required}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isSignIn ? "SignIn" : "SignUp"}
          </button>
          <button
            type="button"
            onClick={this.toggleSignButton}
            className="btn ml-3 btn-danger"
          >
            Switch To {isSignIn ? "SignUp" : "SignIn"}
          </button>
        </FormComponent>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuth: (authData, isSignIn) => {
      dispatch(auth(authData, isSignIn));
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
