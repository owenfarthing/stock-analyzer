import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";
import CreateModal from "../../../components/ui/CreateModal";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { labActions } from "../../../store/lab-slice";
import { useRouter } from "next/router";
import useInput from "../../../components/util/use-input";
import * as CONFIG from "../../../components/config/config";

const iterationsValidator = (input) => {
  if (isNaN(input)) return { valid: false, msg: "Please enter a number." };

  if (input > CONFIG.NETWORK.MAX_ITERATIONS)
    return {
      valid: false,
      msg: `The maximum number of iterations is ${CONFIG.NETWORK.MAX_ITERATIONS}`,
    };

  if (input < CONFIG.NETWORK.MIN_ITERATIONS)
    return {
      valid: false,
      msg: `The minimum number of iterations is ${CONFIG.NETWORK.MIN_ITERATIONS}`,
    };

  return { valid: true, msg: "" };
};

const patienceValidator = (input) => {
  if (isNaN(input)) return { valid: false, msg: "Please enter a number." };

  if (input > CONFIG.NETWORK.MAX_PATIENCE)
    return {
      valid: false,
      msg: `The maximum patience is ${CONFIG.NETWORK.MAX_PATIENCE}`,
    };

  if (input < CONFIG.NETWORK.MIN_PATIENCE)
    return {
      valid: false,
      msg: `The minimum patience is ${CONFIG.NETWORK.MIN_PATIENCE}`,
    };

  return { valid: true, msg: "" };
};

const ConfigureNetworkPage = () => {
  const auth = useAuth();
  const role = auth.getRole();
  const dispatch = useDispatch();
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const [currentSplit, setCurrentSplit] = useState("");
  const currentData = useSelector((state) => state.lab.currentData);
  const iterationsInput = useInput(iterationsValidator);
  const patienceInput = useInput(patienceValidator);

  useEffect(() => {
    iterationsInput.setInputValue(
      currentData?.params?.iterations || CONFIG.NETWORK.MIN_ITERATIONS
    );
    patienceInput.setInputValue(
      currentData?.params?.patience || CONFIG.NETWORK.MIN_PATIENCE
    );
  }, []);

  useEffect(() => {
    setCanContinue(
      currentSplit && iterationsInput.isValid && patienceInput.isValid
    );
  }, [currentSplit, iterationsInput.isValid, patienceInput.isValid]);

  const onReview = () => {
    if (!iterationsInput.isValid || !patienceInput.isValid) {
      setCanContinue(false);
      return;
    }

    dispatch(labActions.moveCurrentStage(1));
    dispatch(
      labActions.setParams({
        split: currentSplit,
        iterations: iterationsInput.input,
        patience: patienceInput.input,
      })
    );
    router.push(`confirm-config?expname=${router.query.expname}`);
  };

  const onBack = () => {
    dispatch(labActions.moveCurrentStage(-1));
    router.push(`choose-data?expname=${router.query.expname}`);
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
          confirmLabel={"Review"}
          cancelLabel={"Back"}
          confirmAction={onReview}
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
            <h4 style={{ textAlign: "center" }}>Configure the Network...</h4>
            <form>
              <div
                className="form-group"
                style={{ width: "100%", display: "inline-flex" }}
              >
                <label>Split:</label>
                <Select
                  title="Train / Test"
                  options={CONFIG.NETWORK.SPLITS}
                  default={currentData?.params?.split || ""}
                  onSelectHandler={(option) => setCurrentSplit(option)}
                />
              </div>
              <Input
                // containerStyles={{
                //   width: "100%",
                //   display: "flex",
                //   justifyContent: "center",
                //   paddingTop: "0px",
                // }}
                inputStyles={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                labelStyles={{
                  paddingRight: "10px",
                  paddingTop: "5px",
                }}
                textStyles={{
                  width: "100px",
                }}
                label="Iterations:"
                placeholder="0"
                type="number"
                input={iterationsInput}
              />
              <Input
                // containerStyles={{
                //   width: "100%",
                //   display: "flex",
                //   justifyContent: "center",
                //   paddingTop: "0px",
                // }}
                inputStyles={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                labelStyles={{
                  paddingRight: "10px",
                  paddingTop: "5px",
                }}
                textStyles={{
                  width: "100px",
                }}
                label="Patience:"
                placeholder="0"
                type="number"
                input={patienceInput}
              />
            </form>
          </div>
        </CreateModal>
      </div>
    </Navigation>
  );
};

export default ConfigureNetworkPage;
