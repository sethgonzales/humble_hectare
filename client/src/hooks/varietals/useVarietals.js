import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

const useVarietals = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadVarietal = async (varietalId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:5001/api/varietals/${varietalId}`);
      const _varietal = response.data;
      setIsLoading(false);
      return _varietal;
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate("/crops");
      setIsLoading(false);
      return null;
    };
  };

  const addVarietal = async (varietal, cropId) => {
    try {
      const data = {
        cropId: cropId,
        name: varietal.name,
        description: varietal.description,
        waterStart: varietal.waterStart ? varietal.waterStart.toISOString() : "",
        waterEvery: varietal.waterEvery,
        waterTime: varietal.waterTime ? varietal.waterTime : 0,
        waterNotes: varietal.waterNotes,
        fertilizeStart: varietal.fertilizeStart ? varietal.fertilizeStart.toISOString() : "",
        fertilizeEvery: varietal.fertilizeEvery,
        fertilizeNotes: varietal.fertilizeNotes,
      };

      const response = await axios.post(
        `https://localhost:5001/api/crops/${cropId}/varietals`,
        data
      );
    } catch (error) {
      console.error("Error adding varietal:", error);
    }
    setIsLoading(false);
  };

  const updateVarietal = async (varietalId, cropId, varietal) => {
    setIsLoading(true);
    try {
      const data = {
        varietalId: varietalId,
        cropId: cropId,
        name: varietal.name,
        description: varietal.description,
        waterStart: varietal.waterStart ? varietal.waterStart.toISOString() : "",
        waterEvery: varietal.waterEvery,
        waterTime: varietal.waterTime ? varietal.waterTime : 0,
        waterNotes: varietal.waterNotes,
        fertilizeStart: varietal.fertilizeStart ? varietal.fertilizeStart.toISOString() : "",
        fertilizeEvery: varietal.fertilizeEvery,
        fertilizeNotes: varietal.fertilizeNotes,
      };

      await axios.put(
        `https://localhost:5001/api/crops/${cropId}/varietals/${varietalId}`,
        data
      );

    } catch (error) {
      console.error("Error updating varietal:", error);
    }
    setIsLoading(false);
  }

  const deleteVarietal = async (varietalId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://localhost:5001/api/varietals/${varietalId}`
      );
    } catch (error) {
      console.error("Error deleting varietal:", error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    loadVarietal,
    addVarietal,
    updateVarietal,
    deleteVarietal,
  };
};

export default useVarietals;