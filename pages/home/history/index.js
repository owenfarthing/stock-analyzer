import Synopsis from "../../../components/home/experiments/Synopsis";
import Experiments from "../../../components/home/experiments/Experiments";
import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";
import Modal from "../../../components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { experimentsActions } from "../../../store/experiments-slice";
import styles from "./index.module.css";

const ExperimentsPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const role = auth.getRole();
  const synopsisShowing = useSelector(
    (state) => state.experiments.synopsisShowing
  );
  const deleteModalShowing = useSelector(
    (state) => state.experiments.deleteModalShowing
  );
  const currentItem = useSelector((state) => state.experiments.currentItem);

  const deleteSelectedItem = () => {
    dispatch(experimentsActions.setCurrentItem(null));
    dispatch(experimentsActions.toggleDeleteModal());
  };

  return (
    <>
      {synopsisShowing && (
        <Modal
          styles={{ minWidth: "800px" }}
          toggleModalHandlers={[
            experimentsActions.toggleSynopsis,
            experimentsActions.setCurrentItem.bind(null, null),
          ]}
        >
          <Synopsis />
        </Modal>
      )}
      {deleteModalShowing && (
        <Modal
          styles={{
            top: "25%",
            width: "50%",
            left: "25%",
            height: "25%",
            minHeight: "200px",
            minWidth: "500px",
          }}
          toggleModalHandlers={[
            experimentsActions.toggleDeleteModal,
            experimentsActions.setCurrentItem.bind(null, null),
          ]}
        >
          <div className={styles["delete-modal-container"]}>
            <h4
              className={styles["delete-modal-header"]}
            >{`Delete experiment "${currentItem.name}"?`}</h4>
            <p className={styles["delete-modal-desc"]}>
              This action cannot be undone.
            </p>
            <button
              type="button"
              className={`btn btn-danger ${styles["delete-modal-button"]}`}
              onClick={deleteSelectedItem}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      <Navigation>
        <div style={{ width: "100%", display: "inline-flex" }}>
          {(role === "user" || role === "admin") && <SideNav />}
          <Experiments />
        </div>
      </Navigation>
    </>
  );
};

export default ExperimentsPage;
