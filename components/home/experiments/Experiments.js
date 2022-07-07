import "bootstrap/dist/css/bootstrap.min.css";
import useSizes from "../../util/use-sizes";
import ExperimentItem from "./ExperimentItem";
import styles from "./Experiments.module.css";
import ExperimentsNav from "./ExperimentsNav";

const dummyData = [
  {
    id: 1,
    uid: 12345678,
    name: "Untitled 1",
    date: "11/21/20",
    dataset: {
      fileId: 1234,
      filename: "mydata.xlsx",
      recordCount: 150000,
      span: 3,
    },
    params: {
      split: 60,
      iterations: 20,
      patience: 5,
    },
    results: {
      duration: "2 hrs 3 min",
      rmse: 0.95,
    },
  },
  {
    id: 2,
    uid: 87654321,
    name: "My data run",
    date: "06/05/21",
    dataset: {
      fileId: 4321,
      filename: "Dataset1.xlsx",
      recordCount: 120000,
      span: 4,
    },
    params: {
      split: 80,
      iterations: 35,
      patience: 3,
    },
    results: {
      duration: "1 hr 35 min",
      rmse: 3.21,
    },
  },
];

const Experiments = () => {
  const sizeUtils = useSizes();

  return (
    <div className={styles.container}>
      <ExperimentsNav />
      {dummyData.length > 0 ? (
        <ul
          className={`list-group ${styles.list}`}
          style={{ minWidth: sizeUtils.calculateBodyWidth() }}
        >
          {dummyData.map((e) => (
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
