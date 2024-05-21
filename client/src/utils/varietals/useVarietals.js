import { useEffect, useState } from 'react';
import { calculateNextDate } from "../DateTime";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const useVarietals = () => {
  const [varietal, setVarietal] = useState();
  const [nextWaterDate, setNextWaterDate] = useState('');
  const [nextFertilizeDate, setNextFertilizeDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let { id: varietalId } = useParams();

  const navigate = useNavigate();

  const loadVarietal = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`https://localhost:5001/api/varietals/${varietalId}`);
      const _varietal = response.data;
      console.log('Get varietal ', response.data);

      setVarietal(_varietal);

      if (_varietal.waterStart && _varietal.waterStart !== '' && _varietal.waterEvery && _varietal.waterEvery !== 'Never') {
        const nxtWaterDt = calculateNextDate(_varietal.waterStart, _varietal.waterEvery);
        setNextWaterDate(nxtWaterDt);
      } else {
        setNextWaterDate('');
      }

      if (_varietal.fertilizeStart && _varietal.fertilizeStart !== '' && _varietal.fertilizeEvery && _varietal.fertilizeEvery !== 'Never') {
        const nxtFertDt = calculateNextDate(_varietal.fertilizeStart, _varietal.fertilizeEvery);
        setNextFertilizeDate(nxtFertDt);
      } else {
        setNextFertilizeDate('');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      navigate("/crops");
    };
    setIsLoading(false);
  };

  useEffect(() => {
    if (varietalId) {
      loadVarietal();
    }
  }, []);

  const addVarietal = async (varietal) => {

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
        fertilizeStart: varietal.fertilizeStart ? varietal.fertilizeStart.toISOString() : "",
        fertilizeEvery: varietal.fertilizeEvery,
      };

      await axios.put(
        `https://localhost:5001/api/crops/${cropId}/varietals/${varietalId}`,
        data
      );

      setVarietal(data);
      await loadVarietal();

    } catch (error) {
      console.error("Error updating varietal:", error);
    }
    setIsLoading(false);
  }

  const deleteVarietal = async (varietal) => {

  };

  return {
    isLoading,
    varietal,
    nextWaterDate,
    nextFertilizeDate,
    loadVarietal,
    loadVarietal,
    addVarietal,
    updateVarietal,
    deleteVarietal,
  };
};

export default useVarietals;