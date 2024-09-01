import { useState } from 'react';
import axios from "axios";

const useCrops = () => {
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const loadCrops = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/crops`);
      const _crops = response.data;
      setIsLoading(false);
      return _crops;
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      return null;
    };
  };

  const addCrop = async (crop) => {
    setIsLoading(true);
    try {
      const data = {
        name: crop?.name,
        type: crop?.type,
      };

      const response = await axios.post(
        `${apiUrl}/api/crops/`,
        data
      );

      setIsLoading(false);
      return response.data;

    } catch (error) {
      setIsLoading(false);
      console.error("Error adding crop:", error);
      return null;
    }
  };

  const updateCrop = async (cropId, crop) => {
    setIsLoading(true);
    try {
      const data = {
        cropId: cropId,
        name: crop.name,
        type: crop.type,
      };
      await axios.put(`${apiUrl}/api/crops/${cropId}`, data);
    } catch (error) {
      console.error("Error updating crop:", error);
    }
    setIsLoading(false);
  }

  const deleteCrop = async (cropId) => {
    try {
      setIsLoading(true);

      await axios.delete(
        `${apiUrl}/api/crops/${cropId}`
      );

    } catch (error) {
      console.error("Error deleting crop:", error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    loadCrops,
    addCrop,
    updateCrop,
    deleteCrop,
  };
};

export default useCrops;