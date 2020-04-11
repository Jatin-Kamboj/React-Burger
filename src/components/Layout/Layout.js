import React, { Component, Fragment } from "react";
import Aux from "../hoc/auxilary_component";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import { BurgerBuilder } from "../containers/BurgerBuilder/BurgerBuilder";
import { CheckoutComponent } from "../containers/checkout_component";
import classnames from "./Layout.module.css";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    let { showSideDrawer } = this.state;
    showSideDrawer = !showSideDrawer;
    this.setState({ showSideDrawer: showSideDrawer });
  };

  render() {
    const { isUserAuthorised } = this.props;
    console.log("isUserAuthorised :", isUserAuthorised);
    return (
      <Aux>
        <Toolbar
          isUserAuthorised={isUserAuthorised}
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classnames.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthorised: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
