import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import CheckoutComponent from "../../../components/containers/checkout_component";
import OrdersComponent from "../../../components/orders";
import LogOutComponent from "../../../components/containers/auth/logout_component";

export const AuthorisedRoutes = () => {
  return (
    <Switch>
      <Route path="/checkout" component={CheckoutComponent} />
      <Route path="/orders" component={OrdersComponent} />
      <Route path="/logout" component={LogOutComponent} />
    </Switch>
  );
};
