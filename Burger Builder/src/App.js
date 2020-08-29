import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import { Redirect, withRouter } from "react-router-dom";
import { Route, Switch, Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { UserRoutes, AuthorisedRoutes } from "./Utils/routes";
import jwtDecode from "jwt-decode";
import { get } from "./Utils/localStorage";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {
    // console.log("jwtDecode()", jwtDecode(get("token")));
    const { isUserAuthorised } = this.props;
    return (
      <div className="text-center">
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <UserRoutes {...this.props} />
          {isUserAuthorised ? <AuthorisedRoutes {...this.props} /> : null}
          <Redirect to="/" />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthorised: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actionCreators.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
