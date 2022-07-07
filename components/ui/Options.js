import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Options.module.css";

const Options = (props) => {
  return (
    <div className={styles.container}>
      <ul className="list-group">
        {props.options.map((e) => (
          <li className="list-group-item" onClick={e.action}>
            {e.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
