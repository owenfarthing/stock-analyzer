import Navigation from "../../../components/ui/Navigation";
import useAuth from "../../../components/util/use-auth";
import SideNav from "../../../components/ui/SideNav";
import CreateModal from "../../../components/ui/CreateModal";
import useInput from "../../../components/util/use-input";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { labActions } from "../../../store/lab-slice";
import { useRouter } from "next/router";

export const nameValidator = (input) => {
  const nameRegex = `[A-Za-z0-9\-_]+`;
  const inputStripped = input.trim();

  if (input === "") {
    return {
      valid: false,
      msg: "Please enter a name.",
    };
  }

  let match = inputStripped.match(nameRegex);
  if (match === null || match[0] !== inputStripped) {
    return {
      valid: false,
      msg: 'Valid characters are letters, numbers, "-", and "_".',
    };
  }

  if (inputStripped.length > 32) {
    return {
      valid: false,
      msg: "Name cannot be more than 32 characters long.",
    };
  }

  return { valid: true, msg: "" };
};

const CreateExperimentPage = () => {
  const auth = useAuth();
  const role = auth.getRole();
  const dispatch = useDispatch();
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);

  const nameInput = useInput(nameValidator);

  useEffect(() => {
    setCanContinue(nameInput.isValid && nameInput.touched);
  }, [nameInput.isValid, nameInput.touched]);

  const onCancel = () => {
    dispatch(labActions.toggleCancelModal());
  };

  const onNext = () => {
    dispatch(labActions.moveCurrentStage(1));
    router.push(`choose-data?expname=${nameInput.input}`);
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
          confirmAction={onNext}
          cancelAction={onCancel}
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
            <h4 style={{ textAlign: "center" }}>
              Choose a name for your experiment!
            </h4>
            <Input
              containerStyles={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              inputStyles={{ width: "500px" }}
              label={"Name:"}
              type={"text"}
              input={nameInput}
            />
          </div>
        </CreateModal>
      </div>
    </Navigation>
  );
};

export default CreateExperimentPage;
