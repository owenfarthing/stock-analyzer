import { useState } from "react";

const useInput = (validationHandler) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  let { valid, msg } = validationHandler(input);
  let isValid = valid || !inputTouched;

  const onInputBlurHandler = () => {
    setInputTouched(true);
  };

  const onInputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmitHandler = () => {
    if (!isValid) return;

    setInputTouched(false);
    setInput("");
  };

  return {
    input,
    touched: inputTouched,
    msg,
    isValid,
    onInputBlur: onInputBlurHandler,
    onInputChange: onInputChangeHandler,
    onFormSubmit: onFormSubmitHandler,
  };
};

export default useInput;
