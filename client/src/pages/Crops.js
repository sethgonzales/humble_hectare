//Crops.jsx
import React, { useState } from "react";
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
    crops,
    addCrop,
    updateCrop,
    deleteCrop,
    isLoading,
  } = useCrops();

  // State for viewing, adding, and updating crops
  const [crop, setCrop] = useState();
  const [showCropModal, setShowCropModal] = useState(false);

  // State for adding a varietal
  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [cropToAddVarietal, setCropToAddVarietal] = useState();

  const showCropForm = (_crop) => {
    setCrop(_crop);
    setShowCropModal(true);
  };

  const showNewVarietalForm = (crop) => {
    setCropToAddVarietal(crop);
    setShowVarietalModal(true);
  };

  // const handleAddVarietal = () => {
  //   setCropToAddVarietal(null);
  //   loadCrops();
  // };

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
                showNewVarietalForm={showNewVarietalForm}
              />
            )))}
        </Accordion>
      </Skeleton>

      <CropForm
        crops={crops}
        crop={crop}
        isOpen={showCropModal}
        dismissCropForm={() => {
          setCrop(null);
          setShowCropModal(false);
        }}
        addCrop={addCrop}
        updateCrop={updateCrop}
        deleteCrop={deleteCrop}
      />

      <VarietalForm
        isOpen={showVarietalModal}
        onDismissVarietal={() => {
          setShowVarietalModal(false);
          setCropToAddVarietal(null);
        }}
        // onAddNewVarietal={handleAddVarietal}
        crop={cropToAddVarietal}
      />
    </>
  )
};

export default Crops;
