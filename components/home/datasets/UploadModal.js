import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./UploadModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { datasetsActions } from "../../../store/datasets-slice";
import useInput from "../../util/use-input";
import Modal from "../../ui/Modal";
import useReader from "../../util/use-reader";
import ProgressBar from "../../ui/ProgressBar";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import useProcess from "../../util/use-process";

const MAX_FILE_SIZE = 50;
const ACCEPTED_FILE_TYPES = ["csv", "xlsx"];
const MAX_COLUMNS_SHOWN = 10;
const MAX_ROWS_SHOWN = 100;

const onFileLoad = (rawFileContents) => {
  return rawFileContents.split("\n").map((row) => row.split(","));
};

const UploadModal = () => {
  const dispatch = useDispatch();
  const fileReader = useReader(onFileLoad);
  const fileProcessor = useProcess();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [invalidFileMsg, setInvalidFileMsg] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [choosingFile, setChoosingFile] = useState(true);
  const [invalidParamsMsg, setInvalidParamsMsg] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const numberValidator = (input) => {
    const inputStripped = Number(input.trim());

    if (inputStripped === NaN) return { valid: false, msg: "" };

    if (fileReader?.fileContents) {
      if (inputStripped < 0 || inputStripped >= fileReader.fileContents.length)
        return {
          valid: false,
          msg: "",
        };
    }

    return { valid: true, msg: "" };
  };

  const offsetInput = useInput(numberValidator);

  useEffect(() => {
    if (Number(offsetInput.input) > fileReader?.fileContents?.length)
      setInvalidParamsMsg(
        `The max number of selectable records is ${fileReader?.fileContents?.length}. Please adjust your offset.`
      );
    else {
      setInvalidParamsMsg("");

      if (offsetInput.isValid && xAxis !== "" && yAxis !== "")
        setConfirmDisabled(false);
    }
  }, [offsetInput.input, fileReader.fileContents, xAxis, yAxis]);

  const onSelectHandler = (event) => {
    if (!event.target.files[0]) {
      setIsFileSelected(false);
      return;
    }

    const file = event.target.files[0];
    setIsFileSelected(true);

    if (file.size > MAX_FILE_SIZE * 10 ** 6) {
      setInvalidFileMsg(`File size must be less than ${MAX_FILE_SIZE}MB.`);
      return;
    }

    if (
      !ACCEPTED_FILE_TYPES.includes(
        file.name.slice(file.name.lastIndexOf(".") + 1)
      )
    ) {
      setInvalidFileMsg(
        `File type must be one of: ${ACCEPTED_FILE_TYPES.join(", ")}`
      );
      return;
    }

    setUploadDisabled(false);
    setInvalidFileMsg("");
    setSelectedFile(event.target.files[0]);
  };

  const getColumnNames = () => {
    return fileReader.fileContents?.[0]?.slice(0, MAX_COLUMNS_SHOWN) || [];
  };

  const getRows = () => {
    return fileReader.fileContents?.slice(0, MAX_ROWS_SHOWN) || [];
  };

  const onSelectXHandler = (col) => {
    setXAxis(col);
  };

  const onSelectYHandler = (col) => {
    setYAxis(col);
  };

  const onUploadHandler = () => {
    setChoosingFile(false);
    setUploadDisabled(true);
    fileReader.readFile(selectedFile);
  };

  const onFileProcessed = (data) => {
    // Upload file to S3
    // Post file metadata to database
    console.log(data);
  };

  const onConfirmHandler = () => {
    setConfirmDisabled(true);
    fileProcessor.processColumns(
      fileReader.fileContents,
      xAxis,
      yAxis,
      offsetInput.input || 0,
      onFileProcessed
    );
  };

  const sizeCalculator = (sizeInBytes) => {
    const kilobytes = 10 ** 3;
    const megabytes = 10 ** 6;
    if (sizeInBytes >= megabytes)
      return `${Math.ceil(sizeInBytes / megabytes).toLocaleString()}MB`;
    if (sizeInBytes >= kilobytes && sizeInBytes <= megabytes)
      return `${Math.ceil(sizeInBytes / kilobytes).toLocaleString()}KB`;
    return `${sizeInBytes.toLocaleString()} bytes`;
  };

  const showFileDetails = () => {
    return (
      <div className={styles.file}>
        <p>Filename: {`"${selectedFile.name}"`}</p>
        <p>
          Last modified: {selectedFile.lastModifiedDate.toLocaleDateString()}
        </p>
        <p style={{ margin: 0 }}>Size: {sizeCalculator(selectedFile.size)}</p>
      </div>
    );
  };

  const showFileUploadError = () => {
    return (
      <div
        className={styles.file}
        style={{ textAlign: "center", color: "red", fontStyle: "italic" }}
      >
        <p>{invalidFileMsg}</p>
      </div>
    );
  };

  const showProgressBar = () => {
    return (
      <div className={styles.progress}>
        <div style={{ textAlign: "center" }}>{fileReader.uploadMsg}</div>
        <ProgressBar progress={fileReader.progress} />
      </div>
    );
  };

  const showColumnSelect = () => {
    return (
      fileReader.uploadStatus === "loaded" && (
        <>
          <p style={{ textAlign: "center" }}>
            Please select your X and Y columns:
          </p>
          <div className="form-group">
            <div className={styles.inputs}>
              <Select
                title="X-axis"
                options={getColumnNames().filter((e) => e !== yAxis)}
                onSelectHandler={onSelectXHandler}
              />
              <Select
                title="Y-axis"
                options={getColumnNames().filter((e) => e !== xAxis)}
                onSelectHandler={onSelectYHandler}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                placeholder="Offset"
                type="number"
                input={offsetInput}
                containerStyles={{ width: "120px" }}
              />
            </div>
          </div>
          {invalidParamsMsg && (
            <p className={styles.invalid}>{invalidParamsMsg}</p>
          )}
        </>
      )
    );
  };

  const displayStatusWindow = () => {
    if (!isFileSelected) return <i className={`bi-card-text ${styles.icon}`} />;

    if (isFileSelected && !invalidFileMsg && fileReader.uploadStatus === "")
      return showFileDetails();

    if (isFileSelected && invalidFileMsg) return showFileUploadError();

    if (fileReader.uploadStatus === "loading") return showProgressBar();

    if (fileReader.uploadStatus === "loaded") return showColumnSelect();
  };

  return (
    <Modal
      toggleModalHandler={() => dispatch(datasetsActions.toggleUploadModal())}
      styles={{
        width: "40%",
        left: "30%",
        minHeight: "0px",
      }}
    >
      <div className={styles.container}>
        <h4 className={styles.header}>
          {fileReader.uploadMsg || "Upload a dataset..."}
        </h4>
        <div
          className={`${fileReader.uploadStatus === "" && "card"} ${
            styles.info
          }`}
        >
          {displayStatusWindow()}
        </div>
        {choosingFile && (
          <form className={styles.form}>
            <input
              type="file"
              className={styles.selector}
              onChange={onSelectHandler}
            />
          </form>
        )}
        {fileReader.uploadStatus !== "loaded" && (
          <button
            type="submit"
            className={`btn btn-primary ${uploadDisabled && "disabled"} ${
              styles.button
            }`}
            onClick={onUploadHandler}
          >
            Upload
          </button>
        )}
        {fileReader.uploadStatus === "loaded" && (
          <button
            type="submit"
            className={`btn btn-primary ${confirmDisabled && "disabled"} ${
              styles.button
            }`}
            onClick={onConfirmHandler}
          >
            Confirm
          </button>
        )}
      </div>
    </Modal>
  );
};

export default UploadModal;
