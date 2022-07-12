import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./Synopsis.module.css";

const Synopsis = () => {
  const currentItem = useSelector((state) => state.experiments.currentItem);
  const router = useRouter();

  const calculateSplit = (train) => {
    return `${train}/${100 - train}`;
  };

  const viewInLab = () => {
    router.push(`/home/lab/${currentItem.id}`);
  };

  return (
    <>
      {currentItem && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>{`Viewing Experiment "${currentItem.name}"`}</h4>
            <p>{`Created ${new Date(
              currentItem.date
            ).toLocaleDateString()}`}</p>
          </div>
          <div className={styles.row} style={{ top: "15%" }}>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {`"${currentItem.dataset.filename}"` || "-"}
              </h4>
              <div className={styles.text}>Dataset</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.dataset.recordCount.toLocaleString() || "-"}
              </h4>
              <div className={styles.text}>Records</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.dataset.span.toString() || "-"}
              </h4>
              <div className={styles.text}>Years</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {calculateSplit(currentItem.params.split)}
              </h4>
              <div className={styles.text}>Split</div>
            </div>
          </div>
          <div className={styles.row} style={{ top: "20%" }}>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.params.iterations.toString() || "-"}
              </h4>
              <div className={styles.text}>Iterations</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.params.patience.toString() || "-"}
              </h4>
              <div className={styles.text}>Patience</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.results.rmse.toString() || "-"}
              </h4>
              <div className={styles.text}>RMSE</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.results.duration.toString() || "-"}
              </h4>
              <div className={styles.text}>Duration</div>
            </div>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              className={`btn btn-primary ${styles.button}`}
              onClick={viewInLab}
            >
              View in Lab
            </button>
          </div>
        </div>
      )}
      {!currentItem && <p>No data found.</p>}
    </>
  );
};

export default Synopsis;
