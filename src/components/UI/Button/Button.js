import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  var buttonClass = props.class;

  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[buttonClass]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
