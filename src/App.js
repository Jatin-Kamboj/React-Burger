import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Redirect, NavLink } from "react-router-dom";
// import { Route, Switch } from "react-router";
import { Route, Switch } from "react-router-dom";
import CheckoutComponent from "./components/containers/checkout_component";
import OrdersComponent from "./components/orders";
import Auth from "./components/containers/auth";
import LogOutComponent from "./components/containers/auth/logout_component";
// import {  } from "./components/Prac";
class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckoutComponent} />
            <Route path="/orders" exact component={OrdersComponent} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={LogOutComponent} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route
              render={() => (
                <h1>
                  <NavLink to="/">Not Found</NavLink>
                </h1>
              )}
            />
          </Switch>
          {/*<BurgerBuilder />
            <CheckoutComponent />*/}
        </Layout>
      </div>
    );
  }
}

export default App;
