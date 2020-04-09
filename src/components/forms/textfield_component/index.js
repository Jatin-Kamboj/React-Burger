import React from "react";
import { Field } from "redux-form";
import { formTypes } from "../form_types";
const renderField = ({
  input,
  type,
  meta,
  meta: { touched, error, warning },
}) => {
  if (type === formTypes.textarea) {
    return (
      <div>
        <textarea {...input} className="form-control" type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  } else {
    return (
      <div>
        <input {...input} className="form-control" type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }
};

export const TextFieldComponent = (props) => {
  return (
    <Field
      name={props.name}
      validate={props.validate}
      component={renderField}
      type={props.type}
    />
  );
};

export default TextFieldComponent;
