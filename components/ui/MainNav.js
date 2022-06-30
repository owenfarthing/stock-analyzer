import styles from "./MainNav.module.css";
import homeSlice from "../../store/home-slice";
import profileSlice from "../../store/profile-slice";
import settingsSlice from "../../store/settings-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "../../store/role-slice";
import useAuth from "../util/use-auth";

const sizes = {
  logoWidth: 200,
  navHeight: 50,
  tabWidth: 100,
};

const MainNav = (props) => {
  const [tabSelected, setTabSelected] = useState("home");
  const auth = useAuth();
  const role = auth.getRole();
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

  const countTabsShowing = () => {
    let numTabs = 2;
    if (role === "user") numTabs++;
    if (role === "admin") numTabs += 2;

    return numTabs;
  };

  return (
    <div
      id="header"
      className={styles["nav-container"]}
      style={{
        minWidth: `${sizes.logoWidth + countTabsShowing() * sizes.tabWidth}px`,
      }}
    >
      <div
        className={styles.logo}
        style={{
          width: `${sizes.logoWidth}px`,
          height: `${sizes.navHeight}px`,
          lineHeight: `${sizes.navHeight}px`,
        }}
      >
        Logo Placeholder
      </div>
      <ul
        id="header-nav"
        className={`nav nav-tabs justify-content-end ${styles["header-nav"]}`}
        style={{
          height: `${sizes.navHeight}px`,
        }}
      >
        <li className="nav-item" style={{ width: `${sizes.tabWidth}px` }}>
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
          <li className="nav-item" style={{ width: `${sizes.tabWidth}px` }}>
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
          <li className="nav-item" style={{ width: `${sizes.tabWidth}px` }}>
            <a
              className={`nav-link ${tabSelected === "settings" && "active"} ${
                styles["tab-text"]
              }`}
              aria-current="page"
              onClick={onSelectTab.bind(null, "settings")}
            >
              Settings
            </a>
          </li>
        )}
        <li className="nav-item" style={{ width: `${sizes.tabWidth}px` }}>
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
