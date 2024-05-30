//Crops.jsx
import React, { useEffect, useState } from "react";
import {
  Group,
  Text,
  Accordion,
  Button,
  Skeleton,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import VarietalForm from "../components/varietals/VarietalForm";
import CropList from "../components/crops/CropList";
import CropForm from '../components/crops/CropForm';
import useCrops from '../hooks/crops/useCrops';

const Crops = () => {
  const {
    loadCrops,
    isLoading,
  } = useCrops();

  // State for viewing, adding, and updating crops
  const [crops, setCrops] = useState();
  const [cropToShow, setCropToShow] = useState();
  const [showCropModal, setShowCropModal] = useState(false);

  // State for adding a varietal
  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [cropToAddVarietal, setCropToAddVarietal] = useState();

  const handleLoadCrops = async () => {
    const cropList = await loadCrops();
    if (cropList) {
      setCrops(cropList);
    }
  };

  useEffect(() => {
    handleLoadCrops();
  }, []);

  const handleAddCrop = (newCrop) => {
    setCrops((prevCrops) => [...prevCrops, newCrop]);
  };

  const handleUpdateCrop = (cropId, updatedCrop) => {
    const updatedList = [...crops].map((crp) => (crp.cropId === cropId ? {...crp, ...updatedCrop} : crp));
    setCrops(updatedList);
  };

  const handleDeleteCrop = (cropId) => {
    const updatedList = [...crops].filter((crp) => crp.cropId !== cropId) 
    setCrops(updatedList);
  };

  const showCropForm = (_crop) => {
    setCropToShow(_crop);
    setShowCropModal(true);
  };

  const showNewVarietalForm = (_crop) => {
    setCropToAddVarietal(_crop);
    setShowVarietalModal(true);
  };

  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Crops</h1>
          <Group>
            <Button onClick={() => setShowCropModal(true)} color="gray" variant="outline" radius="xl">
              <IconPlus size="1.5rem" stroke={2} color="black" />
            </Button>
          </Group>
        </div>
        <Text size="md" style={{ color: 'gray' }}>{crops?.length > 0 ? 'Click through each crop to see what has been planted' : 'No crops have been added yet'}</Text>
        <Accordion chevronPosition="right" variant="contained">
          {crops
            && (crops.map((crop) => (
              <CropList
                key={crop?.cropId}
                crop={crop}
                showCropForm={() => showCropForm(crop)}
                showNewVarietalForm={() => showNewVarietalForm(crop)}
              />
            )))}
        </Accordion>
      </Skeleton>

      <CropForm
        crops={crops}
        crop={cropToShow}
        isOpen={showCropModal}
        dismissCropForm={() => {
          setCropToShow(null);
          setShowCropModal(false);
        }}
        // handlers for updating local crop state
        onAddCrop={(newCrop) => handleAddCrop(newCrop)}
        onUpdateCrop={(cropId, updatedCrop) => handleUpdateCrop(cropId, updatedCrop)}
        onDeleteCrop={(cropId) => handleDeleteCrop(cropId)}
      />

      <VarietalForm
        isOpen={showVarietalModal}
        onDismissVarietal={() => {
          setShowVarietalModal(false);
          setCropToAddVarietal(null);
        }}
        reloadCrops={handleLoadCrops}
        crop={cropToAddVarietal}
      />
    </>
  )
};

export default Crops;
