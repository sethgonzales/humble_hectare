//CropList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Group,
  Text,
  Accordion,
  Button,
  Tooltip,
  Skeleton
} from '@mantine/core';
import axios from "axios";
import CropForm from '../components/CropForm';
import { useNavigate } from "react-router-dom";

import { IconPencil, IconPlus } from '@tabler/icons-react';
import VarietalForm from "../components/VarietalForm";

// import { useNavigate } from "react-router-dom";

const CropList = (props) => {
  const { seeCrops } = props;
  const navigate = useNavigate();

  // State for viewing, adding, and updating crops
  const [crops, setCrops] = useState();
  const [selectedCrop, setSelectedCrop] = useState();
  const [showCropModal, setShowCropModal] = useState(false);
  const [addNewCrop, setAddNewCrop] = useState(false);

  // State for adding a varietal
  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [addNewVarietal, setAddNewVarietal] = useState(false);
  const [cropToAddVarietal, setCropToAddVarietal] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const loadCrops = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get('https://localhost:5001/api/crops');
      const crops = response.data;

      setCrops(crops);

    } catch (error) {
      console.error('Error fetching data:', error);
    };
    setIsLoading(false);
  }

  const showCropForm = (crop) => {
    setSelectedCrop(crop);
    setShowCropModal(true);
  }

  const dismissCropForm = () => {
    setSelectedCrop();
    setShowCropModal(false);
    setAddNewCrop(false);
  }

  const addCropForm = () => {
    setSelectedCrop();
    setAddNewCrop(true);
    setShowCropModal(true);
  };

  const handleAddCrop = (newCrop) => {
    setCrops((prevCrops) => [...prevCrops, newCrop.data]);
    setSelectedCrop();
  };

  const handleUpdateCrop = (updatedCrop) => {
    setCrops((prevCrops) =>
      prevCrops.map((crop) =>
        crop.cropId === updatedCrop.cropId ? updatedCrop : crop
      )
    );
    setAddNewCrop(false);
    setSelectedCrop();
  };

  const handleDeleteCrop = (cropId) => {
    setCrops((prevCrops) => prevCrops.filter((crop) => crop.cropId !== cropId));
  };

  const seeVarietal = (varietal) => {
    navigate(`/varietal/${varietal?.varietalId}`)
  };

  const showVarietalForm = (crop) => {
    setCropToAddVarietal(crop);
    setShowVarietalModal(true);
  }

  const handleAddVarietal = (newVarietal) => {
    setCropToAddVarietal();
    setAddNewVarietal(false);
    loadCrops();
  };

  const dismissVarietalForm = () => {
    setShowVarietalModal(false);
    setAddNewVarietal(false);
  }

  useEffect(() => {
    loadCrops();
  }, [seeCrops]);

  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Crops</h1>
          <Button onClick={() => addCropForm()} color="gray" variant="outline" radius="xl">
            <IconPlus size="1.5rem" stroke={2} color="black" />
          </Button>
        </div>
        <Text size="md">{crops?.length > 0 ? 'Click through each crop to see what has been planted' : 'No crops have been added yet'}</Text>
        <Accordion chevronPosition="right" variant="contained">
          {crops
            && (crops.map((crop) => (
              <Accordion.Item value={crop?.name} key={crop?.cropId}>
                <Accordion.Control>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <Group justify="center">
                      <Tooltip label="Click to edit" openDelay={500}>
                        <IconPencil onClick={() => showCropForm(crop)} size="1rem" stroke={2} color="black" />
                      </Tooltip>
                    </Group>
                    <Text>{crop?.name}</Text>


                  </div>
                </Accordion.Control>
                <Accordion.Panel>
                  {crop?.varietals?.length > 0 ? (
                    <>
                      <Table striped highlightOnHover>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Variety</Table.Th>
                            <Table.Th>Water Frequency</Table.Th>
                            <Table.Th>Fertilize Frequency</Table.Th>
                            <Table.Th>Events Logged</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {crop.varietals.map((varietal) => (
                            <Table.Tr
                              key={varietal.varietalId}
                              onClick={() => seeVarietal(varietal)}
                              style={{ cursor: "pointer" }}
                            >
                              <Table.Td>{varietal?.name}</Table.Td>
                              <Table.Td>{varietal?.waterEvery} {varietal?.waterEveryUnit ? ` ${varietal?.waterEveryUnit}` : ''}</Table.Td>
                              <Table.Td>{varietal?.fertilizeEvery} {varietal?.fertilizeEveryUnit ? ` ${varietal?.fertilizeEveryUnit}` : ''}</Table.Td>
                              <Table.Td>{varietal?.events ? `${varietal?.events.length}` : '0'}</Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                      <Button onClick={() => showVarietalForm(crop)} variant="filled" size="xs" color="green" style={{ marginTop: '30px', marginLeft: '10px' }}>Add</Button>
                    </>
                  ) : (
                    <>
                      <Text size="sm">No varieties of {crop ? ` ${crop.name}` : 'this crop'} have been planted</Text>
                      <Button onClick={() => showVarietalForm(crop)} variant="filled" size="xs" color="green" style={{ marginTop: '30px' }}>Add</Button>
                    </>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            )))}
        </Accordion>
      </Skeleton>

      <CropForm
        crops={crops}
        crop={selectedCrop}
        isOpen={showCropModal}
        onDismissCrop={dismissCropForm}
        addNewCrop={addNewCrop}
        onAddNewCrop={handleAddCrop}
        onUpdateCrop={handleUpdateCrop}
        onDeleteCrop={handleDeleteCrop}
      />

      <VarietalForm
        isOpen={showVarietalModal}
        addNewVarietal={addNewVarietal}
        onDismissVarietal={dismissVarietalForm}
        onAddNewVarietal={handleAddVarietal}
        crop={cropToAddVarietal}
      />
    </>
  )
}

export default CropList;