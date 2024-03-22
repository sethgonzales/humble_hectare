//CropList.jsx
import React, { useEffect, useState } from "react";
import { Table, Group, Text, Accordion, Button, HoverCard, LoadingOverlay, Tooltip } from '@mantine/core';
import axios from "axios";
import CropForm from '../components/CropForm';
import { IconPencil, IconPlus } from '@tabler/icons-react';

// import { useNavigate } from "react-router-dom";

const CropList = (props) => {
  const { seeCrops } = props;
  const [crops, setCrops] = useState();

  const [selectedCrop, setSelectedCrop] = useState();
  const [showCropModal, setShowCropModal] = useState(false);
  const [addNewCrop, setAddNewCrop] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  console.log('selected crop', selectedCrop);

  const loadCrops = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('https://localhost:5001/api/crops');
      const crops = response.data;

      setCrops(crops);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    };
  }

  const showCropDetail = (crop) => {
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
    console.log('crop was updated');
  };

  const handleDeleteCrop = (cropId) => {
    setCrops((prevCrops) => prevCrops.filter((crop) => crop.cropId !== cropId));
  };


  useEffect(() => {
    loadCrops();
  }, [seeCrops]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Crops</h1>
        <Button onClick={() => addCropForm()} color="gray" variant="outline" radius="xl">
          <IconPlus size="1.5rem" stroke={2} color="black" />
        </Button>
      </div>
      <Text size="md">Click through each crop to see what has been planted</Text>
      <Accordion chevronPosition="right" variant="contained">
        {crops
          && (crops.map((crop) => (
            <Accordion.Item value={crop?.name} key={crop?.cropId}>
              <Accordion.Control>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <Text>{crop?.name}</Text>

                  <Group justify="center">
                    <Tooltip label="Click to edit" openDelay={500}>
                      <IconPencil onClick={() => showCropDetail(crop)} size="1rem" stroke={2} color="black" />
                    </Tooltip>
                  </Group>

                </div>
              </Accordion.Control>
              <Accordion.Panel>
                {/* <Text size="sm">{crop.content}</Text> */}
                {crop?.varietals?.length > 0 ? (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Variety</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Water Frequency</Table.Th>
                        <Table.Th>Fertilize Frequency</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {crop.varietals.map((varietal) => (
                        <Table.Tr key={varietal.varietalId}>
                          <Table.Td>{varietal?.name}</Table.Td>
                          <Table.Td>{varietal?.description}</Table.Td>
                          <Table.Td>{varietal?.waterEvery} {varietal?.waterEveryUnit ? ` ${varietal?.waterEveryUnit}` : ''}</Table.Td>
                          <Table.Td>{varietal?.fertilizeEvery} {varietal?.fertilizeEveryUnit ? ` ${varietal?.fertilizeEveryUnit}` : ''}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                ) : (
                  <Text size="sm">No varieties of {crop ? ` ${crop.name}` : 'this crop'} have been planted</Text>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          )))}
      </Accordion>

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
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </>
  )
}

export default CropList;