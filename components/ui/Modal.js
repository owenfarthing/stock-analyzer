import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={`card ${styles.modal}`} style={props.styles}>
        <div className={styles["close-div"]}>
          <button
            type="button"
            className={`btn btn-close ${styles.close}`}
            aria-label="Close"
            onClick={props.toggleModalHandler}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
