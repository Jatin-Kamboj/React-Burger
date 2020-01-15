import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/auxilary_component";

const Modal = props => {
  console.log("Modal => ", props.BackdropHandler);
  return (
    <Aux>
      <Backdrop show={props.show} BackdropHandler={props.modalClose}>
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0"
          }}
        >
          {props.children}
        </div>
      </Backdrop>
    </Aux>
  );
};

// export default React.memo(Modal);
export default Modal;
