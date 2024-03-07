//Crop.jsx
import React from "react";

const Crop = (props) => {
  const { crop } = props;

  return (
    <>
      <h3 key={crop.cropId}>{crop.name}</h3>
      <ul>

        {crop.varietals && crop.varietals.length > 0
          && (crop.varietals.map((varietal) => (
            <li key={varietal.varietalId}>{varietal.name}</li>
          )))}
      </ul>
    </>
  )
}

export default Crop;