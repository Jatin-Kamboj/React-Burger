import React from "react";
import classnames from "./NavigationItem.module.css";

const NavigationItem = props => {
  return (
    <li className={classnames.NavigationItem}>
      <a href={props.link} className={props.active ? classnames.active : null}>
        {props.children}
      </a>
    </li>
  );
};
export default NavigationItem;
