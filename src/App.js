import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router";
import { Route, Switch } from "react-router-dom";
import { CheckoutComponent } from "./components/containers/checkout_component";
class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Layout>
          <Switch>
            <Route
              path="/"
              render={() => <p>BurgerBuilder</p>}
              exact
              component={BurgerBuilder}
            />
            <Route path="/checkout" component={CheckoutComponent} />
          </Switch>
          {/*<BurgerBuilder />
            <CheckoutComponent />*/}
        </Layout>
      </div>
    );
  }
}

export default App;
