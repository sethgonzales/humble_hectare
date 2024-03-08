//CropList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Crop from '../components/Crop';
import { useNavigate } from "react-router-dom";

const CropList = (props) => {
  const { seeCrops } = props;
  const [crops, setCrops] = useState();
  const navigate = useNavigate();

  const loadCrops = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/crops');
      const crops = response.data;

      console.log('crops', crops);
      setCrops(crops);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadCrops();
  }, [seeCrops]);

  return (
    <>
      <h3>Crops</h3>
      <ul>
        {crops
          && (crops.map((crop) => (
            <li key={crop.cropId}
            // navigate(`/${loggedInUser.role}/listings/${lid}/wines`)
            >
              <Crop crop={crop} />
            </li>
          )))}
      </ul>
    </>
  )
}

export default CropList;