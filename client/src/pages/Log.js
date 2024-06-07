//Log.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLogs from "../hooks/logs/useLogs";


const Log = () => {
  const {
    // isLoading,
    loadLog,
  } = useLogs();

  let { id: logId } = useParams();

  const [log, setLog] = useState();

  const handleLoadLog = async () => {
    const logData = await loadLog(logId);
    if (logData) {
      setLog(logData);
    }
  }

  useEffect(() => {
    if (logId) {
      handleLoadLog();
    }
  }, [logId]);

  return (
    <>
      <h1>{log?.title}</h1>
      <p>{log?.entry}</p>
    </>
  );
};

export default Log;