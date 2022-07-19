import { useSelector } from "react-redux";
import styles from "./Synopsis.module.css";

const Synopsis = () => {
  const currentItem = useSelector((state) => state.datasets.currentItem);

  return (
    <>
      {currentItem && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>{`Viewing Dataset "${currentItem.filename}"`}</h4>
            <p>{`Uploaded ${new Date(
              currentItem.date
            ).toLocaleDateString()}`}</p>
          </div>
          <div className={`card ${styles.preview}`}>
            <p style={{ textAlign: "center" }}>File preview goes here.</p>
          </div>
          <div className={styles.row} style={{ top: "20%" }}>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.recordCount.toLocaleString() || "-"}
              </h4>
              <div className={styles.text}>Records</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {currentItem.span.toString() || "-"}
              </h4>
              <div className={styles.text}>Years</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {`"${currentItem.timeColumn}"` || "-"}
              </h4>
              <div className={styles.text}>X-axis</div>
            </div>
            <div className={styles.cell}>
              <h4 className={styles.text}>
                {`"${currentItem.dataColumn}"` || "-"}
              </h4>
              <div className={styles.text}>Y-axis</div>
            </div>
          </div>
        </div>
      )}
      {!currentItem && <p>No data found.</p>}
    </>
  );
};

export default Synopsis;
