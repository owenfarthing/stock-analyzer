import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";
import CreateModal from "../../../components/ui/CreateModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { labActions } from "../../../store/lab-slice";
import { useRouter } from "next/router";
import Synopsis from "../../../components/home/datasets/Synopsis";
import Select from "../../../components/ui/Select";

const ChooseDataPage = () => {
  const auth = useAuth();
  const role = auth.getRole();
  const dispatch = useDispatch();
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const datasets = useSelector((state) => state.datasets.items);
  const currentData = useSelector((state) => state.lab.currentData);

  useEffect(() => {
    currentItem && setCanContinue(true);
  }, [currentItem]);

  const onSelectHandler = (option) => {
    const [item] = datasets.filter((e) => e.filename === option);
    setCurrentItem(item);
  };

  const onBack = () => {
    dispatch(labActions.moveCurrentStage(-1));
    router.push("create-experiment");
  };

  const onNext = () => {
    dispatch(labActions.moveCurrentStage(1));
    dispatch(labActions.setDataset(currentItem.id));
    router.push(`configure-network?expname=${router.query.expname}`);
  };

  return (
    <Navigation>
      <div
        style={{
          width: "100%",
          display: "inline-flex",
        }}
      >
        {(role === "user" || role === "admin") && <SideNav />}
        <CreateModal
          canContinue={canContinue}
          confirmLabel={"Next"}
          cancelLabel={"Back"}
          confirmAction={onNext}
          cancelAction={onBack}
        >
          <div
            style={{
              width: "100%",
              height: "inherit",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Choose a dataset...</h4>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Select
                title="Select Dataset"
                options={datasets.map((e) => e.filename)}
                default={
                  currentData.dataset_id
                    ? datasets.filter(
                        (e) => e.id === currentData.dataset_id
                      )?.[0]?.filename
                    : ""
                }
                onSelectHandler={onSelectHandler}
              />
            </div>
            {currentItem && (
              <div className="card" style={{ padding: "30px" }}>
                <Synopsis currentItem={currentItem} />
              </div>
            )}
          </div>
        </CreateModal>
      </div>
    </Navigation>
  );
};

export default ChooseDataPage;
