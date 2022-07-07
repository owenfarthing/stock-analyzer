import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "./ExperimentItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";

const ExperimentItem = (props) => {
  const dispatch = useDispatch();
  const [optionsShowing, setOptionsShowing] = useState(false);
  const selectedItems = useSelector((state) => state.experiments.selectedItems);

  const toggleOptions = () => {
    setOptionsShowing((prev) => !prev);
  };

  const viewItem = () => {
    dispatch(experimentsActions.setCurrentItem(props.data));
    dispatch(experimentsActions.toggleSynopsis());
  };

  const deleteItem = () => {
    dispatch(experimentsActions.setCurrentItem(props.data));
    dispatch(experimentsActions.toggleDeleteModal());
  };

  const toggleSelectItem = (event) => {
    if (event.target.checked)
      dispatch(experimentsActions.addSelectedItem(props.data.id));
    if (!event.target.checked)
      dispatch(experimentsActions.removeSelectedItem(props.data.id));
  };

  return (
    <li className={`list-group-item ${styles.container1}`} id={props.data.id}>
      <div className={styles.container2}>
        <div className={styles.container3}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              style={{ marginTop: "15px" }}
              onChange={toggleSelectItem}
              checked={selectedItems[props.data.id] || false}
            />
          </div>
          <div style={{ paddingLeft: "10px" }}>
            {props.data.name}
            <div>{props.data.date}</div>
          </div>
        </div>
        {optionsShowing && (
          <div style={{ paddingTop: 5 }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewItem}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteItem}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
            <button type="button" className="btn" onClick={toggleOptions}>
              <i className="bi-three-dots-vertical" />
            </button>
          </div>
        )}
        {!optionsShowing && (
          <button type="button" className="btn" onClick={toggleOptions}>
            <i className="bi-three-dots" />
          </button>
        )}
      </div>
    </li>
  );
};

export default ExperimentItem;
