import "bootstrap/dist/css/bootstrap.min.css";
import useSizes from "../../util/use-sizes";
import ExperimentItem from "./ExperimentItem";
import styles from "./Experiments.module.css";
import ExperimentsNav from "./ExperimentsNav";
import { useSelector } from "react-redux";

const Experiments = () => {
  const sizeUtils = useSizes();
  const items = useSelector((state) => state.experiments.items);

  return (
    <div className={styles.container}>
      <ExperimentsNav />
      {items.length > 0 ? (
        <ul
          className={`list-group ${styles.list}`}
          style={{ minWidth: sizeUtils.calculateBodyWidth() }}
        >
          {items.map((e) => (
            <ExperimentItem data={e} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>
          No experiments found.{" "}
          <a href="/home/lab">Time to start your first project!</a>
        </p>
      )}
    </div>
  );
};

export default Experiments;
