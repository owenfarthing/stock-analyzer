import { useState } from "react";

const MIN_RECORDS = 0;

const useProcess = () => {
  const [columns, setColumns] = useState([]);
  const [numRecords, setNumRecords] = useState(0);
  const [span, setSpan] = useState({});
  const [processStatus, setProcessStatus] = useState({ status: "", msg: "" });
  const [error, setError] = useState();

  // Data pipeline
  const processColumns = async (file, xAxis, yAxis, callback) => {
    let err = "";
    let sortedColumns = [];
    setProcessStatus({ status: "processing", msg: "Processing dataset..." });

    try {
      let extractedColumns = await setDataForColumns(file, xAxis, yAxis);
      let cleanColumns = await dropNullRows(extractedColumns);
      let castColumns = await convertData(cleanColumns);
      let uniqueColumns = await dropDuplicates(castColumns);
      sortedColumns = await sortByDate(uniqueColumns);
    } catch (e) {
      err = e.message;
      console.log(e);
    }

    if (err) {
      setError(err);
      setProcessStatus({ status: "failed", msg: "Failed to process dataset" });
      return;
    }
    if (sortedColumns.length < MIN_RECORDS) {
      setError(`A minimum of ${MIN_RECORDS} records must be selected`);
      setProcessStatus({ status: "failed", msg: "Failed to process dataset" });
      return;
    }

    const span = computeSpan(sortedColumns);
    callback(sortedColumns, span, sortedColumns.length);

    setProcessStatus({ status: "processed", msg: "Finished processing!" });
    setSpan(span);
    setNumRecords(sortedColumns.length);
    setColumns(sortedColumns);
  };

  // Getters
  const getXAxis = () => {
    return columns.map((e) => e[0]);
  };

  const getYAxis = () => {
    return columns.map((e) => e[1]);
  };

  // Private functions
  const setDataForColumns = (data, xAxis, yAxis) => {
    const xIndex = data[0].indexOf(xAxis);
    const yIndex = data[0].indexOf(yAxis);
    data = data.map((e) => [e[xIndex], e[yIndex]]);

    if (!data || data.length === 0)
      throw new Error("Could not interpret selected columns.");
    return data;
  };

  const dropNullRows = (cols) => {
    const cleanDates = cols.filter(
      (e) => e[0] && new Date(e[0]).getTime() && e[0].match(/[-/]+/)
    );
    if (cleanDates.length === 0) {
      throw new Error(
        "The selected X-axis column does not contain time-series data."
      );
    }

    const cleanValues = cleanDates.filter(
      (e) => e[1] && Number(e[1]) !== NaN && Number(e[1]) > 0
    );
    if (cleanValues.length === 0)
      throw new Error(
        "The selected Y-axis column does not contain numeric data."
      );

    return cleanValues;
  };

  const convertData = (cols) => {
    cols.forEach((e) => {
      e[0] = new Date(e[0]);
      e[1] = Number(e[1]);
    });

    if (!cols || cols.length === 0)
      throw new Error("Could not convert data for network.");
    return cols;
  };

  const dropDuplicates = (cols) => {
    cols.forEach((a, i) => {
      cols.forEach((b, j) => {
        if (i !== j) {
          if (
            a[0].toLocaleDateString() === b[0].toLocaleDateString() &&
            a[1] === b[1]
          )
            cols.splice(j, 1);
        }
      });
    });

    if (!cols || cols.length === 0)
      throw new Error("Failed to remove duplicates.");
    return cols;
  };

  const sortByDate = (cols) => {
    cols = cols.sort((a, b) => a[0] - b[0]);

    if (!cols || cols.length === 0)
      throw new Error("Could not sort data for network.");
    return cols;
  };

  const computeSpan = (cols) => {
    let yearSpan =
      Number(cols[cols.length - 1][0]?.getFullYear()) -
      Number(cols[0][0]?.getFullYear());
    let monthSpan =
      Number(cols[cols.length - 1][0]?.getMonth()) -
      Number(cols[0][0]?.getMonth());

    return { years: yearSpan, months: monthSpan };
  };

  return {
    columns,
    numRecords,
    span,
    processStatus: processStatus.status,
    processMsg: processStatus.msg,
    error,
    processColumns,
    getXAxis,
    getYAxis,
  };
};

export default useProcess;
