import { useState } from "react";
import Modal from "../ui/Modal";
import useInput from "../util/use-input";
import styles from "./Authenticate.module.css";
import Input from "../ui/Input";
import { roleActions } from "../../store/role-slice";

const Authenticate = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const toggleSignUpHandler = () => {
    setIsSigningUp(true);
  };

  // Validators
  const emailValidator = (input) => {
    const validDomains = [".com", ".net", ".co", ".org", ".info"];
    const emailRegex = `^[^.-][A-Za-z0-9!#$%&'*+/=?^_\`{|}~.-]+@[^.-][A-Za-z0-9.-]+`;
    const inputStripped = input.trim();
    const msg = "Please enter a valid email.";

    if (inputStripped.length > 64) return { valid: false, msg };

    if (
      inputStripped.split(".").includes("") ||
      inputStripped.split(".").length === 1
    )
      return { valid: false, msg };

    if (
      !validDomains.includes(
        inputStripped.slice(inputStripped.lastIndexOf("."))
      )
    )
      return { valid: false, msg };

    let match = inputStripped.match(emailRegex);
    if (match === null || match[0] !== inputStripped)
      return { valid: false, msg };

    return { valid: true, msg: "" };
  };

  const emailInput = useInput(emailValidator);

  const passValidator = (input) => {
    const inputStripped = input.trim();
    const passRegexSpecial = `^(?=.*[!@#$%^&*]+).*`;
    const passRegexNum = `^(?=.*[0-9]+).*`;
    let msg = "";

    if (inputStripped.length < 7) {
      msg = "Password must be at least 7 characters long.";
      return { valid: false, msg };
    }

    if (inputStripped.length > 32) {
      msg = "Password must be no more than 32 characters long.";
      return { valid: false, msg };
    }

    if (inputStripped.includes("<") || inputStripped.includes(">")) {
      msg = "Password cannot contain < or >.";
      return { valid: false, msg };
    }

    let match1 = inputStripped.match(passRegexSpecial);
    if (match1 === null || match1[0] !== inputStripped) {
      msg =
        "Password must contain at least 1 special character (!, @, #, $, %, ^, &, or *).";
      return { valid: false, msg };
    }

    let match2 = inputStripped.match(passRegexNum);
    if (match2 === null || match2[0] !== inputStripped) {
      msg = "Password must contain at least 1 numeric character (0-9).";
      return { valid: false, msg };
    }

    return { valid: true, msg };
  };

  const passInput = useInput(passValidator);

  const confirmPassValidator = (input) => {
    const inputStripped = input.trim();
    let msg = "";

    if (passInput.input && inputStripped !== passInput.input) {
      msg = "Passwords do not match.";
      return { valid: false, msg };
    }

    return { valid: true, msg };
  };

  const confirmPassInput = useInput(confirmPassValidator);
  // End validators

  const onAuthHandler = () => {
    emailInput.onFormSubmit();
    passInput.onFormSubmit();
    isSigningUp && confirmPassInput.onFormSubmit();
  };

  const description = isSigningUp
    ? "Provide a valid email for your username and create a password."
    : "Please sign in with your username and password.";

  return (
    <Modal toggleModalHandler={roleActions.toggleAuth}>
      <div className={styles.container}>
        <h1 className={styles.header}>{isSigningUp ? "Sign Up" : "Sign In"}</h1>
        <div className={styles.description}>{description}</div>
        <form onSubmit={onAuthHandler} className={styles.form}>
          <Input label={"Email:"} type={"email"} input={emailInput} />
          <Input label={"Password:"} type={"password"} input={passInput} />
          {isSigningUp && (
            <Input
              label={"Confirm Password:"}
              type={"password"}
              input={confirmPassInput}
            />
          )}
          {!isSigningUp && (
            <div className={styles.button}>
              <button
                type="button"
                className="btn btn-link"
                style={{ padding: 0 }}
                onClick={toggleSignUpHandler}
              >
                Not a user? Sign up now!
              </button>
            </div>
          )}
          <div className={styles.button}>
            <button type="submit" className="btn btn-primary">
              {isSigningUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Authenticate;
