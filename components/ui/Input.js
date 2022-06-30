import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`form-group ${styles.entry}`}>
      <label>{props.label}</label>
      <input
        type={props.type}
        className={`form-control ${!props.input.isValid && styles.invalid}`}
        onBlur={props.input.onInputBlur}
        onChange={props.input.onInputChange}
      />
      {!props.input.isValid && (
        <p className={styles["invalid-msg"]}>{props.input.msg}</p>
      )}
    </div>
  );
};

export default Input;
