import React from "react";
import classes from "./style.module.css";
import PropTypes from "prop-types";

export const InputComponent = props => {
  let inputField = null;
  switch (props.elementType) {
    case "input":
      inputField = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
      break;
    case "textarea":
      inputField = (
        <textarea
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
    default:
      inputField = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
      break;
  }

  return (
    <div>
      <label htmlFor="" className={classes.label}>
        {props.label}
      </label>
      {inputField}
    </div>
  );
};

InputComponent.prototype = {
  inputElement: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string
};
