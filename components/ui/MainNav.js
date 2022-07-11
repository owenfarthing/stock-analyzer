import styles from "./MainNav.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { roleActions } from "../../store/role-slice";
import useAuth from "../util/use-auth";
import useSizes from "../util/use-sizes";

const MainNav = () => {
  const [tabSelected, setTabSelected] = useState("home");
  const auth = useAuth();
  const role = auth.getRole();
  const sizeUtils = useSizes();
  const { logoWidth, navHeight, tabWidth } = sizeUtils.sizes;
  const dispatch = useDispatch();

  const onSelectTab = (tab) => {
    setTabSelected(tab);
  };

  const onSignOut = () => {
    dispatch(
      roleActions.setPrivileges({
        isAuthenticated: false,
        isUser: false,
        isAdmin: false,
      })
    );
  };

  const toggleModalHandler = () => {
    dispatch(roleActions.toggleAuth());
  };

  return (
    <div
      id="header"
      className={styles["nav-container"]}
      style={{
        minWidth: `${logoWidth + sizeUtils.calculateBodyWidth()}px`,
      }}
    >
      <div
        className={styles.logo}
        style={{
          width: `${logoWidth}px`,
          height: `${navHeight}px`,
          lineHeight: `${navHeight}px`,
        }}
      >
        Logo Placeholder
      </div>
      <ul
        id="header-nav"
        className={`nav nav-tabs justify-content-end ${styles["header-nav"]}`}
        style={{
          height: `${navHeight}px`,
        }}
      >
        <li className="nav-item" style={{ width: `${tabWidth}px` }}>
          <a
            className={`nav-link ${tabSelected === "home" && "active"} ${
              styles["tab-text"]
            }`}
            aria-current="page"
            onClick={onSelectTab.bind(null, "home")}
          >
            Home
          </a>
        </li>
        {(role === "user" || role === "admin") && (
          <li className="nav-item" style={{ width: `${tabWidth}px` }}>
            <a
              className={`nav-link ${tabSelected === "profile" && "active"} ${
                styles["tab-text"]
              }`}
              aria-current="page"
              onClick={onSelectTab.bind(null, "profile")}
            >
              Profile
            </a>
          </li>
        )}
        {role === "admin" && (
          <li className="nav-item" style={{ width: `${tabWidth}px` }}>
            <a
              className={`nav-link ${tabSelected === "manage" && "active"} ${
                styles["tab-text"]
              }`}
              aria-current="page"
              onClick={onSelectTab.bind(null, "manage")}
            >
              Manage
            </a>
          </li>
        )}
        <li className="nav-item" style={{ width: `${tabWidth}px` }}>
          <a
            className={`nav-link border-0 ${styles["tab-text"]}`}
            aria-current="page"
            onClick={
              role === "user" || role === "admin"
                ? onSignOut
                : toggleModalHandler
            }
          >
            {`${role === "user" || role === "admin" ? "Sign Out" : "Sign In"}`}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
