import "bootstrap/dist/css/bootstrap.min.css";

const ProgressBar = (props) => {
  const progress = props.progress?.toString() || "0";

  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {`${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
