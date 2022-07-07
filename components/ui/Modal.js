import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const dispatch = useDispatch();

  const toggleModalHandler = () => {
    const handlers = Array.isArray(props.toggleModalHandlers)
      ? props.toggleModalHandlers
      : [props.toggleModalHandlers];
    handlers.forEach((action) => dispatch(action()));
  };

  return (
    <div className={styles.backdrop}>
      <div className={`card ${styles.modal}`} style={props.styles}>
        <div className={styles["close-div"]}>
          <button
            type="button"
            className={`btn btn-close ${styles.close}`}
            aria-label="Close"
            onClick={toggleModalHandler}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
