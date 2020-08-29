import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavigationItem = (props) => {
  console.log("props", props);
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

NavigationItem.defaultProps = {
  exact: false,
};

NavigationItem.prototype = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.isRequired,
};
export default NavigationItem;
