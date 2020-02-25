import React from "react";
import classes from "./style.module.css";
import PropTypes from "prop-types";

export const InputComponent = props => {
  let inputField = null;
  // console.log("select => ", props);

  switch (props.inputElement) {
    case "input":
      inputField = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          onChange={props.changed}
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
          onChange={props.changed}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
      break;
    case "select":
      // console.log("select => ", props.elementConfig.elementconfig.options);

      inputField = (
        <select
          className={classes.inputElement}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
          placeholder={props.placeholder}
        ></select>
      );
      break;
    default:
      inputField = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          onChange={props.changed}
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
