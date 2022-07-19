import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";
import CreateModal from "../../../components/ui/CreateModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { labActions } from "../../../store/lab-slice";
import { useRouter } from "next/router";

const ChooseDataPage = () => {
  const auth = useAuth();
  const role = auth.getRole();
  const dispatch = useDispatch();
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const [params, setParams] = useState({});

  const onBack = () => {
    dispatch(labActions.moveCurrentStage(-1));
    router.push("create-experiment");
  };

  const onNext = () => {
    dispatch(labActions.moveCurrentStage(1));
    dispatch(labActions.setDatasetParams(params));
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
          ></div>
        </CreateModal>
      </div>
    </Navigation>
  );
};

export default ChooseDataPage;
