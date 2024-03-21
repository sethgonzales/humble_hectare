//CropList.jsx
import React, { useEffect, useState } from "react";
import { Table, Group, Text, Accordion, Button } from '@mantine/core';
import axios from "axios";
import CropForm from '../components/CropForm';
// import { useNavigate } from "react-router-dom";

const CropList = (props) => {
  const { seeCrops } = props;
  const [crops, setCrops] = useState();
  console.log('crops', crops);

  const [selectedCrop, setSelectedCrop] = useState();
  const [showCropModal, setShowCropModal] = useState(false);

  const loadCrops = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/crops');
      const crops = response.data;

      setCrops(crops);

    } catch (error) {
      console.error('Error fetching data:', error);
    };
  }

  const handleShowCrop = (crop) => {
    setSelectedCrop(crop);
    setShowCropModal(true);
  }

  const handleUpdateCrop = (updatedCrop) => {
    setCrops((prevCrops) =>
      prevCrops.map((crop) =>
        crop.cropId === updatedCrop.cropId ? updatedCrop : crop
      )
    );
    console.log('crop was updated');
  };

  useEffect(() => {
    loadCrops();
  }, [seeCrops]);

  return (
    <>
      <h1>Crops</h1>
      <Text size="md">Click through each crop to see what has been planted</Text>
      <Accordion chevronPosition="right" variant="contained">
        {crops
          && (crops.map((crop) => (
            <Accordion.Item value={crop?.name} key={crop?.cropId}>
              <Accordion.Control>
                <Group wrap="nowrap">
                  <div>
                    <Text>{crop?.name}</Text>
                    <Text size="sm" c="dimmed" fw={400}>
                      {/* {crop.description} */}
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {/* <Text size="sm">{crop.content}</Text> */}
                {crop?.varietals?.length > 0 ? (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Varietal</Table.Th>
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
                  <Text size="sm">No varietals of {crop ? ` ${crop.name}` : 'this crop'} have been planted</Text>
                )}
                <Button onClick={() => handleShowCrop(crop)} variant="filled" size="xs" color="green">Edit</Button>
              </Accordion.Panel>
            </Accordion.Item>
          )))}
      </Accordion>

      <CropForm
        crop={selectedCrop}
        isOpen={showCropModal}
        onDismissCrop={() => setShowCropModal(false)}
        onUpdateCrop={handleUpdateCrop}
      />
    </>
  )
}

export default CropList;