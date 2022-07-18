import { useState } from "react";
import * as XLSX from "xlsx";

const useReader = (onFileLoadHandler) => {
  const [fileContents, setFileContents] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({ status: "", msg: "" });
  const [progress, setProgress] = useState(0);

  // Private functions
  const onFileLoad = (fileData) => {
    if (!!fileData) {
      setFileContents(onFileLoadHandler(fileData));
    }
  };

  const abortLoadHandler = () => {
    setUploadStatus({ status: "abort", msg: "" });
  };

  const errorHandler = (event) => {
    setUploadStatus({
      status: "error",
      msg: `Error while loading dataset: ${event.target.error.name}`,
    });
  };

  const loadStartHandler = () => {
    setUploadStatus({ status: "loading", msg: "Loading dataset..." });
  };

  const progressHandler = (event) => {
    setProgress(Math.floor(100 * (event.loaded / event.total)));
  };

  // Public functions
  const readExcelFile = async (file) => {
    const reader = new FileReader();
    let fileData = {};

    reader.onload = (event) => {
      setUploadStatus({ status: "loaded", msg: "Finished uploading!" });
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const fileData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      onFileLoad(fileData);
    };

    reader.onabort = abortLoadHandler;
    reader.onerror = errorHandler;
    reader.onloadstart = loadStartHandler;
    reader.onprogress = progressHandler;

    reader.readAsBinaryString(file);
  };

  const readCSVFile = (file) => {
    const reader = new FileReader();
    let fileData = {};

    reader.onload = (event) => {
      setUploadStatus("loaded");
      fileData = event.target.result;
      onFileLoad(fileData);
    };

    reader.onabort = abortLoadHandler;
    reader.onerror = errorHandler;
    reader.onloadstart = loadStartHandler;
    reader.onprogress = progressHandler;

    reader.readAsBinaryString(file);
  };

  const readFile = (file) => {
    if (file.name.slice(file.name.lastIndexOf(".")) === ".xlsx") {
      readExcelFile(file);
    }
    if (file.name.slice(file.name.lastIndexOf(".")) === ".csv")
      readCSVFile(file);
  };

  // Return utilities
  return {
    fileContents,
    uploadStatus: uploadStatus.status,
    uploadMsg: uploadStatus.msg,
    progress,
    readFile,
    readExcelFile,
    readCSVFile,
  };
};

export default useReader;
