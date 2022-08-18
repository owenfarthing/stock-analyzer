import { useState } from "react";

const useInput = (validationHandler) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  let { valid, msg } = validationHandler(input);
  let isValid = valid || !inputTouched;

  const setInputValue = (val) => {
    setInput(val);
  };

  const onInputBlurHandler = () => {
    setInputTouched(true);
  };

  const onInputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  return {
    input,
    msg,
    isValid,
    setInputValue,
    onInputBlur: onInputBlurHandler,
    onInputChange: onInputChangeHandler,
  };
};

export default useInput;
