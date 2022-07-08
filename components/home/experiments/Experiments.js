import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Experiments.module.css";
import ExperimentsNav from "./ExperimentsNav";
import { useSelector, useDispatch } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";
import Pagination from "../../ui/Pagination";
import ExperimentsTable from "./ExperimentsTable";

const Experiments = () => {
  const pages = useSelector((state) => state.experiments.pages);
  const currentPage = useSelector((state) => state.experiments.currentPage);
  const dispatch = useDispatch();

  const setCurrentPage = (page) => {
    dispatch(experimentsActions.setCurrentPage(page));
  };

  return (
    <div className={styles.container}>
      <ExperimentsNav />
      <ExperimentsTable />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Experiments;
