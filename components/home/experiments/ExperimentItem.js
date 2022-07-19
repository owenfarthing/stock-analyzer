import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ExperimentItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";

const ExperimentItem = (props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.experiments.selectedItems);

  const viewItem = () => {
    dispatch(experimentsActions.setCurrentItem(props.data));
    dispatch(experimentsActions.toggleSynopsis());
  };

  const toggleSelectItem = (event) => {
    if (event.target.checked)
      dispatch(experimentsActions.addSelectedItem(props.data.id));
    if (!event.target.checked)
      dispatch(experimentsActions.removeSelectedItem(props.data.id));
  };

  return (
    <li className={`list-group-item ${styles.container1}`} key={props.data.id}>
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
            <div>{new Date(props.data.date).toLocaleDateString()}</div>
          </div>
        </div>
        <div style={{ paddingTop: 5 }}>
          <button type="button" className="btn" onClick={viewItem}>
            <i className="bi-three-dots" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ExperimentItem;
