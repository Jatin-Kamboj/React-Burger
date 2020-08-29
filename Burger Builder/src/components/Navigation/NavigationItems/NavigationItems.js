import React from "react";
import classnames from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { applicationUrls } from "../../../common";

const NavigationItems = (props) => {
  const { isUserAuthorised } = props;
  return (
    <ul className={classnames.NavigationItems}>
      <NavigationItem exact link="/">
        BurgerBuilder
      </NavigationItem>
      {isUserAuthorised ? (
        <NavigationItem link={applicationUrls.orders}>Orders</NavigationItem>
      ) : null}
      <NavigationItem
        link={isUserAuthorised ? applicationUrls.logout : applicationUrls.auth}
      >
        {isUserAuthorised ? "Logout" : "Authentication"}
      </NavigationItem>
    </ul>
  );
};
export default NavigationItems;
