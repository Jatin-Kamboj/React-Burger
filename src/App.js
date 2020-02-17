import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router";
import { Route, Switch } from "react-router-dom";
import { CheckoutComponent } from "./components/containers/checkout_component";
import { OrdersComponent } from "./components/orders";
// import {  } from "./components/Prac";
class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckoutComponent} />
            <Route path="/orders" exact component={OrdersComponent} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
          {/*<BurgerBuilder />
            <CheckoutComponent />*/}
        </Layout>
      </div>
    );
  }
}

export default App;
