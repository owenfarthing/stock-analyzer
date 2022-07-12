import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DatasetItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { datasetsActions } from "../../../store/datasets-slice";

const DatasetItem = (props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.datasets.selectedItems);

  const viewItem = () => {
    dispatch(datasetsActions.setCurrentItem(props.data));
    dispatch(datasetsActions.toggleSynopsis());
  };

  const toggleSelectItem = (event) => {
    if (event.target.checked)
      dispatch(datasetsActions.addSelectedItem(props.data.fileId));
    if (!event.target.checked)
      dispatch(datasetsActions.removeSelectedItem(props.data.fileId));
  };

  return (
    <div className="col">
      <div className={`card ${styles.container1}`}>
        <div className="form-check" style={{ marginLeft: "5px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={toggleSelectItem}
            checked={selectedItems[props.data.fileId] || false}
          />
        </div>
        <div className={styles.container2}>
          <i className={`bi-file-earmark-bar-graph ${styles.icon}`} />
        </div>
        <div className={`card-body ${styles.container3}`}>
          <h5 className={`card-title ${styles.title}`}>
            {props.data.filename}
          </h5>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={viewItem}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetItem;
