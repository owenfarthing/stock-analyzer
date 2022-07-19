import styles from "./DeleteModal.module.css";
import Modal from "./Modal";

const DeleteModal = (props) => {
  return (
    <Modal
      styles={{
        top: "25%",
        width: "50%",
        left: "25%",
        height: "25%",
        minHeight: "200px",
        minWidth: "500px",
      }}
      toggleModalHandler={props.toggleModalHandler}
    >
      <div className={styles.container}>
        <h4 className={styles.header}>
          {props.singleSelected
            ? `Delete "${props.singleSelected}"?`
            : "Delete selected items?"}
        </h4>
        <p className={styles.desc}>This action cannot be undone.</p>
        <button
          type="button"
          className={`btn btn-danger ${styles.button}`}
          onClick={props.deleteItemsHandler}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
