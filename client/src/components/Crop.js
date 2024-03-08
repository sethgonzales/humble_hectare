//Crop.jsx
import React from "react";
import { useParams } from "react-router-dom";

const Crop = (props) => {
  let { id } = useParams(); 
  const { crop } = props;
  console.log('crop', crop);
  return (
    <>
    {crop
    && (
      <p>{crop.name}</p>
    )}
    </>
  )
}

export default Crop;