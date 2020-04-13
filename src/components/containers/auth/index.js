import React, { Component, Fragment } from "react";
import { FormComponent } from "../../forms";
import { TextFieldComponent, LabelComponent } from "../../forms";
import { required, validateEmail } from "../../../validations";
import Spinner from "../../UI/Spinner/Spinner";
import { auth, setAuthRedirectPath } from "../../../store/actions";
import { connect } from "react-redux";
import { reactNotification } from "../../../Utils/react_notification";
import { NotificationContainer } from "react-notifications";
import { Redirect } from "react-router";
import { applicationUrls } from "../../../common";

export class Auth extends Component {
  state = {
    isSignIn: false,
  };

  formSubmitHandler = (values) => {
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

  componentDidMount() {
    // var cc = reactNotification("info");
    let authUrl = applicationUrls.root;
    if (this.props.isBurgerBuilding) {
      authUrl = applicationUrls.checkout;
    } else {
      authUrl = applicationUrls.root;
    }
    this.props.onsetAuthRedirectPath(authUrl);
  }

  render() {
    const { isSignIn } = this.state;
    const {
      isLoading,
      isUserAuthorised,
      authRedirectPath,
      isBurgerBuilding,
    } = this.props;

    let form = <Spinner />;
    if (!isLoading) {
      form = (
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
      );
    }
    return (
      <Fragment>
        <NotificationContainer />
        {form}
        {isUserAuthorised ? <Redirect to={authRedirectPath} /> : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    token: state.auth.token,
    isLoading: state.auth.loading,
    isUserAuthorised: state.auth.token != null,
    isBurgerBuilding: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuth: (authData, isSignIn) => {
      dispatch(auth(authData, isSignIn));
    },
    onsetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
