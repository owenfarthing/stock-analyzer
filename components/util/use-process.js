import { useState } from "react";

const MIN_RECORDS = 0;

const useProcess = () => {
  const [columns, setColumns] = useState([]);
  const [numRecords, setNumRecords] = useState(0);
  const [span, setSpan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Data pipeline
  const processColumns = async (file, xAxis, yAxis, offset, callback) => {
    let err = "";
    let sortedColumns = [];
    setIsLoading(true);

    try {
      let extractedColumns = await setDataForColumns(
        file,
        xAxis,
        yAxis,
        offset
      );
      let cleanColumns = await dropNullRows(extractedColumns);
      let castColumns = await convertData(cleanColumns);
      let uniqueColumns = await dropDuplicates(castColumns);
      sortedColumns = await sortByDate(uniqueColumns);
    } catch (e) {
      err = e.name;
      console.log(e);
    }
    setIsLoading(false);

    if (err) {
      setError(err);
      return;
    }
    if (!err && sortedColumns.length < MIN_RECORDS) {
      setError(`A minimum of ${MIN_RECORDS} records must be selected`);
      return;
    }
    setNumberOfRecords(sortedColumns);
    computeSpan(sortedColumns);
    callback(sortedColumns);
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
  const setDataForColumns = (data, xAxis, yAxis, offset) => {
    const xIndex = data[offset || 0].indexOf(xAxis);
    const yIndex = data[offset || 0].indexOf(yAxis);
    return data
      .slice([(offset || 0) + 1], data.length)
      .map((e) => [e[xIndex], e[yIndex]]);
  };

  const dropNullRows = (columns) => {
    return columns
      .filter((e) => e[0] && new Date(e[0]).getTime())
      .filter((e) => e[1] && Number(e[1]) !== NaN && Number(e[1]) > 0);
  };

  const dropDuplicates = (columns) => {
    columns.forEach((a, i) => {
      columns.forEach((b, j) => {
        if (i !== j) {
          if (
            a[0].toLocaleDateString() === b[0].toLocaleDateString() &&
            a[1] === b[1]
          )
            columns.splice(j, 1);
        }
      });
    });

    return columns;
  };

  const convertData = (columns) => {
    return columns.map((e) => [new Date(e[0]), Number(e[1])]);
  };

  const sortByDate = (columns) => {
    return columns.sort((a, b) => b[0] - a[0]);
  };

  const computeSpan = (columns) => {
    let yearSpan =
      Number(columns[columns.length - 1][0]?.getFullYear()) -
      Number(columns[0][0]?.getFullYear());
    let monthSpan =
      Number(columns[columns.length - 1][0]?.getMonth()) -
      Number(columns[0][0]?.getMonth());
    setSpan({ years: yearSpan, months: monthSpan });
  };

  const setNumberOfRecords = (columns) => {
    setNumRecords(columns.length);
  };

  return {
    columns,
    numRecords,
    span,
    isLoading,
    error,
    processColumns,
    getXAxis,
    getYAxis,
  };
};

export default useProcess;
