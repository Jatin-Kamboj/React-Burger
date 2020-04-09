import React from "react";
import { BrowserRouter, Redirect, NavLink } from "react-router-dom";
// import { Route, Switch } from "react-router";
import { Route, Switch, Router } from "react-router-dom";
import CheckoutComponent from "../../components/containers/checkout_component";
import OrdersComponent from "../../components/orders";
import BurgerBuilder from "../../components/containers/BurgerBuilder/BurgerBuilder";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/checkout" component={CheckoutComponent} />
        <Route path="/orders" exact component={OrdersComponent} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route
          render={() => (
            <h1>
              <NavLink to="/">Not Found</NavLink>
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
