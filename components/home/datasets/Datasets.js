import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Datasets.module.css";
import DatasetsNav from "./DatasetsNav";
import { useSelector, useDispatch } from "react-redux";
import { datasetsActions } from "../../../store/datasets-slice";
import Pagination from "../../ui/Pagination";
import DatasetsTable from "./DatasetsTable";
import useSizes from "../../util/use-sizes";

const Datasets = () => {
  const sizeUtils = useSizes();
  const dispatch = useDispatch();

  const setCurrentPage = (page) => {
    dispatch(datasetsActions.setCurrentPage(page));
  };

  return (
    <div
      className={`card ${styles.container}`}
      style={{ minWidth: sizeUtils.calculateBodyWidth() }}
    >
      <DatasetsNav />
      <DatasetsTable />
    </div>
  );
};

export default Datasets;
