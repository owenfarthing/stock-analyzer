import "bootstrap-icons/font/bootstrap-icons.css";
import useAuth from "../util/use-auth";
import styles from "./SideNav.module.css";

const SideNav = () => {
  const auth = useAuth();
  const role = auth.getRole();

  return (
    <div className={styles["nav-container"]}>
      <ul className={`nav nav-pills ${styles.nav}`}>
        <li className="nav-item">
          <a href="/home/dashboard" className="nav-link">
            <i className="bi-speedometer2"></i>
            <span className={styles.label}>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/home/lab" className="nav-link">
            <i className="bi-robot"></i>
            <span className={styles.label}>Lab</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/home/experiments" className="nav-link">
            <i className="bi-clock-experiments"></i>
            <span className={styles.label}>Experiments</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/home/data" className="nav-link">
            <i className="bi-activity"></i>
            <span className={styles.label}>
              {role === "admin" ? "Data" : "My Data"}
            </span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/home/settings" className="nav-link">
            <i className="bi-gear-wide-connected"></i>
            <span className={styles.label}>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
