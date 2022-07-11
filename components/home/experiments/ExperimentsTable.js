import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ExperimentsTable.module.css";
import ExperimentItem from "./ExperimentItem";
import useSizes from "../../util/use-sizes";
import { experimentsActions } from "../../../store/experiments-slice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MAX_ENTRIES_PER_PAGE = 8;
const MAX_PAGES = 5;

const ExperimentsTable = () => {
  const sizeUtils = useSizes();
  const items = useSelector((state) => state.experiments.items);
  const pages = useSelector((state) => state.experiments.pages);
  const currentPage = useSelector((state) => state.experiments.currentPage);
  const sortDesc = useSelector((state) => state.experiments.sortDesc);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      experimentsActions.setPages(
        items.length === 0 ? 1 : Math.ceil(items.length / MAX_ENTRIES_PER_PAGE)
      )
    );
  }, [items]);

  useEffect(() => {
    if (currentPage >= pages)
      dispatch(experimentsActions.setCurrentPage(pages - 1));
  }, [currentPage, pages]);

  useEffect(() => {
    if (sortDesc) dispatch(experimentsActions.sortItemsDesc());
    if (!sortDesc) dispatch(experimentsActions.sortItemsAsc());
  }, [sortDesc]);

  const pageStart = () => {
    return currentPage * MAX_ENTRIES_PER_PAGE;
  };

  const pageEnd = () => {
    return currentPage * MAX_ENTRIES_PER_PAGE + MAX_ENTRIES_PER_PAGE;
  };

  return (
    <>
      {items.length > 0 ? (
        <ul
          className={`list-group ${styles.list}`}
          style={{ minWidth: sizeUtils.calculateBodyWidth() }}
        >
          {items.slice(pageStart(), pageEnd()).map((e) => (
            <ExperimentItem data={e} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>
          No experiments found.{" "}
          <a href="/home/lab">Time to start your first project!</a>
        </p>
      )}
    </>
  );
};

export default ExperimentsTable;
