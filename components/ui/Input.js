import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`form-group ${styles.entry}`} style={props.containerStyles}>
      <div style={props.inputStyles}>
        <label style={props.labelStyles}>{props.label}</label>
        <input
          type={props.type}
          className={`form-control ${!props.input.isValid && styles.invalid}`}
          style={props.textStyles}
          onBlur={props.input.onInputBlur}
          onChange={props.input.onInputChange}
          placeholder={props.placeholder}
          value={props.input.input}
        />
        {!props.input.isValid && (
          <p className={styles["invalid-msg"]}>{props.input.msg}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
