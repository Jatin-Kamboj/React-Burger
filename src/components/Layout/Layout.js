import React, { Component, Fragment } from "react";
import Aux from "../hoc/auxilary_component";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import classnames from "./Layout.module.css";
class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    let { showSideDrawer } = this.state;
    showSideDrawer = !showSideDrawer;
    this.setState({ showSideDrawer: showSideDrawer });
  };

  render() {
    return (
      <Aux>
        <Toolbar
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
export default Layout;
