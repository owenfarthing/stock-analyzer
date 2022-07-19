import styles from "./CreateModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateModal = (props) => {
  return (
    <div className={`card ${styles.container}`}>
      {props.children}
      <div className={styles.buttons}>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={props.cancelAction}
        >
          {props.cancelLabel || "Cancel"}
        </button>
        <button
          type="button"
          className={`btn btn-primary ${!props.canContinue && "disabled"}`}
          onClick={props.confirmAction}
        >
          {props.confirmLabel || "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
