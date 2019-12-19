import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
