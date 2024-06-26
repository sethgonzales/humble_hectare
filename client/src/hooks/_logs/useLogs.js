import { useState } from 'react';
import axios from "axios";

const useLogs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://localhost:5001/api/logs');
      const _logs = response.data;
      setIsLoading(false);
      return _logs;
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      return null;
    };
  };

  const loadLog = async (logId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:5001/api/logs/${logId}`);
      const _log = response.data;
      setIsLoading(false);
      return _log;
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate("/logs");
      setIsLoading(false);
      return null;
    };
  };


  const addLog = async (newLog) => {
    try {
      setIsLoading(true);
      const data = {
        logId: newLog.logId,
        title: newLog.title,
        entry: newLog.entry,
        createdAt: new Date(),
      };

      const response = await axios.post(
        `https://localhost:5001/api/logs`,
        data
      );
      return response.data;

    } catch (error) {
      console.error("Error adding log:", error);
    }
    setIsLoading(false);
  };

  const updateLog = async (log, updatedLog) => {
    try {
      setIsLoading(true);
      const data = {
        logId: log.logId,
        createdAt: log.createdAt,
        title: updatedLog.title,
        entry: updatedLog.entry,
      };

      await axios.put(
        `https://localhost:5001/api/logs/${log.logId}`,
        data
      );

    } catch (error) {
      console.error("Error updating log:", error);
    }
    setIsLoading(false);
  };

  const deleteLog = async (logId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://localhost:5001/api/logs/${logId}`
      );
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return {
    isLoading,
    loadLogs,
    loadLog,
    addLog,
    updateLog,
    deleteLog,
  };
};

export default useLogs;