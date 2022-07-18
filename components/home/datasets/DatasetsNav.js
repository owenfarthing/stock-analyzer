import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DatasetsNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { datasetsActions } from "../../../store/datasets-slice";
import Modal from "../../ui/Modal";
import Synopsis from "./Synopsis";
import { useState } from "react";
import { useEffect } from "react";
import DeleteModal from "../../ui/DeleteModal";
import UploadModal from "./UploadModal";

const DatasetsNav = () => {
  const dispatch = useDispatch();
  const [singleSelected, setSingleSelected] = useState("");
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const items = useSelector((state) => state.datasets.items);
  const selectedItems = useSelector((state) => state.datasets.selectedItems);
  const sortDesc = useSelector((state) => state.datasets.sortDesc);
  const selectAll = useSelector((state) => state.datasets.selectAll);
  const uploadModalShowing = useSelector(
    (state) => state.datasets.uploadModalShowing
  );
  const synopsisShowing = useSelector(
    (state) => state.datasets.synopsisShowing
  );
  const deleteModalShowing = useSelector(
    (state) => state.datasets.deleteModalShowing
  );

  const toggleSortOrder = () => {
    dispatch(datasetsActions.toggleSortOrder());
  };

  const toggleSelectAll = () => {
    dispatch(datasetsActions.toggleSelectAll());
  };

  const toggleDeleteModal = () => {
    let ids = [];

    for (let e in selectedItems) {
      if (selectedItems[e]) ids.push(e);
    }
    setSelected(ids);

    if (ids.length === 0) return;
    if (ids.length === 1)
      setSingleSelected(items.filter((e) => e.fileId === ids[0])[0]?.filename);

    dispatch(datasetsActions.toggleDeleteModal());
  };

  const toggleUploadModal = () => {
    dispatch(datasetsActions.toggleUploadModal());
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const deleteItems = () => {
    console.log(selected);
    dispatch(datasetsActions.deleteItems(selected));
    dispatch(datasetsActions.toggleDeleteModal());
  };

  useEffect(() => {
    let filtered = items.filter((e) =>
      e.filename.toLowerCase().includes(search.trim().toLowerCase())
    );
    dispatch(datasetsActions.setDisplayedItems(filtered));
  }, [items, search]);

  return (
    <>
      {uploadModalShowing && <UploadModal />}
      {synopsisShowing && (
        <Modal
          styles={{ minWidth: "800px", height: "50%", minHeight: "500px" }}
          toggleModalHandler={() => {
            dispatch(datasetsActions.toggleSynopsis());
            dispatch(datasetsActions.setCurrentItem(null));
          }}
        >
          <Synopsis />
        </Modal>
      )}
      {deleteModalShowing && (
        <DeleteModal
          toggleModalHandler={() => {
            setSingleSelected("");
            dispatch(datasetsActions.toggleDeleteModal());
            dispatch(datasetsActions.setCurrentItem(null));
          }}
          deleteItemsHandler={deleteItems}
          singleSelected={singleSelected}
        />
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
            <div style={{ paddingLeft: "10px" }}>
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
          <div style={{ display: "inline-flex", width: "fit-content" }}>
            <div
              className="input-group rounded"
              style={{ paddingRight: "20px" }}
            >
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                value={search}
                onChange={updateSearch}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="bi-search"></i>
              </span>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.button}`}
                onClick={toggleUploadModal}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatasetsNav;
