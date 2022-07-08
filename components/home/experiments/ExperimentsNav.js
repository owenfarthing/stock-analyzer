import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ExperimentsNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";
import Modal from "../../ui/Modal";
import Synopsis from "./Synopsis";
import { useState } from "react";

const ExperimentsNav = () => {
  const dispatch = useDispatch();
  const [singleSelected, setSingleSelected] = useState("");
  const [selected, setSelected] = useState([]);
  const items = useSelector((state) => state.experiments.items);
  const selectedItems = useSelector((state) => state.experiments.selectedItems);
  const sortDesc = useSelector((state) => state.experiments.sortDesc);
  const selectAll = useSelector((state) => state.experiments.selectAll);
  const synopsisShowing = useSelector(
    (state) => state.experiments.synopsisShowing
  );
  const deleteModalShowing = useSelector(
    (state) => state.experiments.deleteModalShowing
  );

  const toggleSortOrder = () => {
    dispatch(experimentsActions.toggleSortOrder());
  };

  const toggleSelectAll = () => {
    dispatch(experimentsActions.toggleSelectAll());
  };

  const toggleDeleteModal = () => {
    let ids = [];

    for (let e in selectedItems) {
      if (selectedItems[e]) ids.push(e);
    }
    setSelected(ids);

    if (ids.length === 0) return;
    if (ids.length === 1)
      setSingleSelected(items.filter((e) => e.id === ids[0])[0]?.name);

    dispatch(experimentsActions.toggleDeleteModal());
  };

  const deleteItems = () => {
    console.log(selected);
    dispatch(experimentsActions.deleteItems(selected));
    dispatch(experimentsActions.toggleDeleteModal());
  };

  return (
    <>
      {synopsisShowing && (
        <Modal
          styles={{ minWidth: "800px" }}
          toggleModalHandler={() => {
            dispatch(experimentsActions.toggleSynopsis());
            dispatch(experimentsActions.setCurrentItem(null));
          }}
        >
          <Synopsis />
        </Modal>
      )}
      {deleteModalShowing && (
        <Modal
          styles={{
            top: "25%",
            width: "50%",
            left: "25%",
            height: "25%",
            minHeight: "200px",
            minWidth: "500px",
          }}
          toggleModalHandler={() => {
            setSingleSelected("");
            dispatch(experimentsActions.toggleDeleteModal());
            dispatch(experimentsActions.setCurrentItem(null));
          }}
        >
          <div className={styles["delete-modal-container"]}>
            <h4 className={styles["delete-modal-header"]}>
              {singleSelected
                ? `Delete "${singleSelected}"?`
                : "Delete selected items?"}
            </h4>
            <p className={styles["delete-modal-desc"]}>
              This action cannot be undone.
            </p>
            <button
              type="button"
              className={`btn btn-danger ${styles["delete-modal-button"]}`}
              onClick={deleteItems}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      <div>
        <div className={styles.container}>
          <div style={{ display: "inline-flex", width: "fit-content" }}>
            <div>
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.button}`}
                onClick={toggleSelectAll}
              >
                {`${selectAll ? "Deselect All" : "Select All"}`}
              </button>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.button}`}
                onClick={toggleDeleteModal}
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            <div style={{ display: "inline-flex" }}>
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.button}`}
                onClick={toggleSortOrder}
              >
                <i
                  className={`${
                    sortDesc ? "bi-arrow-up-short" : "bi-arrow-down-short"
                  }`}
                  style={{ fontSize: "30px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperimentsNav;
