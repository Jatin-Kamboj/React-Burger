import React from "react";
import { Field, reduxForm } from "redux-form";

const form = "";

let WrapperFormComponent = (props) => {
  const { handleSubmit, className } = props;

  return (
    <form onSubmit={handleSubmit} className={className}>
      {props.children}
    </form>
  );
};

export const FormComponent = reduxForm({
  form: form,
})(WrapperFormComponent);
