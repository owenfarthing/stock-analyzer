import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ExperimentsNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";

const ExperimentsNav = () => {
  const sortDesc = useSelector((state) => state.experiments.sortDesc);
  const selectAll = useSelector((state) => state.experiments.selectAll);
  const dispatch = useDispatch();

  const toggleSortOrder = () => {
    dispatch(experimentsActions.toggleSortOrder());
  };

  const toggleSelectAll = () => {
    dispatch(experimentsActions.toggleSelectAll());
  };

  return (
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
  );
};

export default ExperimentsNav;
