import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./UploadModal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { datasetsActions } from "../../../store/datasets-slice";
import Modal from "../../ui/Modal";

const UploadModal = (props) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const onSelectHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const onUploadHandler = () => {
    // Post file to database
    console.log(selectedFile);
  };

  return (
    <Modal
      toggleModalHandler={() => dispatch(datasetsActions.toggleUploadModal())}
    >
      <div className={styles.container}>
        <h4 className={styles.header}>Upload a dataset...</h4>
        <div className={`card ${styles.info}`}>
          {!isFileSelected && (
            <i
              className={`bi-card-text ${styles.icon}`}
              style={{ fontSize: "300px", color: "lightgray" }}
            />
          )}
        </div>
        <form className={styles.form}>
          <input
            type="file"
            className={styles.input}
            onChange={onSelectHandler}
          />
        </form>
        <button
          type="submit"
          className={`btn btn-primary ${styles.button}`}
          onClick={onUploadHandler}
        >
          Upload
        </button>
      </div>
    </Modal>
  );
};

export default UploadModal;
