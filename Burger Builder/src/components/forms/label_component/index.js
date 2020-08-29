import React from "react";
import PropTypes from "prop-types";

export const LabelComponent = (props) => (
  <label htmlFor={props.labelFor} className={props.className}>
    {props.labelName}
  </label>
);

LabelComponent.propTypes = {
  labelFor: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  className: PropTypes.string,
};
