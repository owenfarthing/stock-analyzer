import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DatasetsTable.module.css";
import DatasetItem from "./DatasetItem";
import { datasetsActions } from "../../../store/datasets-slice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const DatasetsTable = () => {
  const sortDesc = useSelector((state) => state.datasets.sortDesc);
  const displayedItems = useSelector((state) => state.datasets.displayedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sortDesc) dispatch(datasetsActions.sortItemsDesc());
    if (!sortDesc) dispatch(datasetsActions.sortItemsAsc());
  }, [sortDesc]);

  return (
    <>
      {displayedItems.length > 0 ? (
        <div className={`container ${styles.container}`}>
          <div className="row">
            {displayedItems.map((e) => (
              <DatasetItem data={e} key={e.fileId} />
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No datasets found.</p>
      )}
    </>
  );
};

export default DatasetsTable;
