import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import useAuth from "../util/use-auth";
import styles from "./SideNav.module.css";

const SideNav = () => {
  const auth = useAuth();
  const role = auth.getRole();

  return (
    <div className={styles["nav-container"]}>
      <ul className={`nav nav-pills ${styles.nav}`}>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="bi-speedometer2"></i>
            <span className={styles.label}>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="bi-robot"></i>
            <span className={styles.label}>Lab</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="bi-clock-history"></i>
            <span className={styles.label}>History</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="bi-activity"></i>
            <span className={styles.label}>
              {role === "admin" ? "Data" : "My Data"}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
