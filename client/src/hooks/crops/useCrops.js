import { useEffect, useState } from 'react';
import axios from "axios";

const useCrops = () => {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCrops = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get('https://localhost:5001/api/crops');
      const _crops = response.data;

      setCrops(_crops);

    } catch (error) {
      console.error('Error fetching data:', error);
    };
    setIsLoading(false);
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const addCrop = async (crop) => {
    setIsLoading(true);
    try {
      const data = {
        name: crop?.name,
        type: crop?.type,
      };

      const response = await axios.post(
        `https://localhost:5001/api/crops/`,
        data
      );

      setCrops((prevCrops) => [...prevCrops, response.data]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding crop:", error);
    }
    setIsLoading(false);
  };

  const updateCrop = async (cropId, crop) => {
    setIsLoading(true);
    try {
      const data = {
        cropId: cropId,
        name: crop.name,
        type: crop.type,
      };

      await axios.put(`https://localhost:5001/api/crops/${cropId}`, data);

      setCrops((prevCrops) => prevCrops.map((crp) => (crp.cropId === cropId ? data : crp)));

    } catch (error) {
      console.error("Error updating crop:", error);
    }
    setIsLoading(false);
  }

  const deleteCrop = async (crop) => {
    try {
      setIsLoading(true);

      await axios.delete(
        `https://localhost:5001/api/crops/${crop.cropId}`
      );

      setCrops((prevCrops) => prevCrops.filter((crp) => crp.cropId !== crop.cropId));

    } catch (error) {
      console.error("Error deleting crop:", error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    crops,
    loadCrops,
    addCrop,
    updateCrop,
    deleteCrop,
  };
};

export default useCrops;