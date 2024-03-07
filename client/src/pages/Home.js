//Home.js
import axios from 'axios';
import Crop from '../components/Crop';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [crops, setCrops] = useState();

  const loadCrops = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/crops');
      const crops = response.data;

      console.log(crops);
      setCrops(crops);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadCrops();
  }, []);

  return (
    <>
      {/* <Welcome /> */}
      {/* <ColorSchemeToggle /> */}
      <h1>Humble Hectare</h1>
      <h2>My Crops</h2>
      {crops
        && (crops.map((crop) => (
          <Crop
            key={crop.cropId}
            crop={crop}
          />
        )))}
    </>
  );
}
