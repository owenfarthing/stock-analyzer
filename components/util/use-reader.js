import { useState } from "react";
import * as XLSX from "xlsx";

const useReader = (onFileLoadHandler) => {
  const [fileContents, setFileContents] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({ status: "", msg: "" });
  const [progress, setProgress] = useState(0);

  // Public functions
  const readFile = (file, offset) => {
    if (file.name.slice(file.name.lastIndexOf(".")) === ".xlsx")
      readExcelFile(file, offset);
    if (file.name.slice(file.name.lastIndexOf(".")) === ".csv")
      readCSVFile(file, offset);
  };

  const readExcelFile = async (file, offset) => {
    const reader = new FileReader();
    let fileData = {};

    reader.onload = (event) => {
      setUploadStatus({ status: "loaded", msg: "Finished uploading!" });
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const fileData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      onFileLoad(fileData, offset);
    };

    reader.onabort = abortLoadHandler;
    reader.onerror = errorHandler;
    reader.onloadstart = loadStartHandler;
    reader.onprogress = progressHandler;

    reader.readAsBinaryString(file);
  };

  const readCSVFile = (file, offset) => {
    const reader = new FileReader();
    let fileData = {};

    reader.onload = (event) => {
      setUploadStatus("loaded");
      fileData = event.target.result;
      onFileLoad(fileData, offset);
    };

    reader.onabort = abortLoadHandler;
    reader.onerror = errorHandler;
    reader.onloadstart = loadStartHandler;
    reader.onprogress = progressHandler;

    reader.readAsBinaryString(file);
  };

  // Private functions
  const onFileLoad = (fileData, offset) => {
    if (!!fileData) {
      setFileContents(onFileLoadHandler(fileData).slice(offset));
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
