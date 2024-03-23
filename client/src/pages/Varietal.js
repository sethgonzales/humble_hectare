//CropList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Group,
  Text,
  Accordion,
  Button,
  HoverCard,
  LoadingOverlay,
  Tooltip,
  Skeleton,
  Blockquote
} from '@mantine/core';
import axios from "axios";
import { useParams } from 'react-router-dom';
import VarietalForm from "../components/VarietalForm";
import { IconInfoCircle, IconPencil, IconPlus } from '@tabler/icons-react';

// import { useNavigate } from "react-router-dom";

const Varietal = () => {
  const [varietal, setVarietal] = useState();
  let { id: varietalId } = useParams();

  console.log('id', varietalId);
  // const [selectedCrop, setSelectedCrop] = useState();
  const [showVarietalModal, setShowVarietalModal] = useState(false);
  // const [addNewCrop, setAddNewCrop] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loadVarietal = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`https://localhost:5001/api/varietals/${varietalId}`);
      const varietal = response.data;
      console.log('Get varietal ', response.data);

      setVarietal(varietal);
    } catch (error) {
      console.error('Error fetching data:', error);
    };
    setIsLoading(false);
  }

  useEffect(() => {
    loadVarietal();
  }, []);

  const handleUpdateVarietal = (updatedVarietal) => {
    setVarietal(updatedVarietal);
    // setAddNewCrop(false);
    // setSelectedCrop();
    console.log('varietal was updated', updatedVarietal);
  };

  const handleDeleteVarietal = (varietalId) => {
    // setCrops((prevCrops) => prevCrops.filter((crop) => crop.cropId !== cropId));
    console.log('varietal was deleted, id:', varietalId);
  };

  return (
    <>
      <Skeleton visible={isLoading}> 
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>{varietal ? `${varietal?.name} ${varietal?.crop?.name}` : "Variety"}</h1>
          <Tooltip label="Click to edit" openDelay={500}>
            <IconPencil
              onClick={() => setShowVarietalModal(true)}
              size="1.5rem"
              stroke={2}
              color="black"
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
        {varietal?.description && (
          <Blockquote color="blue" mt="xl">
            {varietal?.description}
          </Blockquote>
        )}

        <h2>Event Log</h2>
        {varietal?.events?.length > 0 ? (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {varietal.events.map((event) => (
                <Table.Tr
                  key={event.eventId}
                // onClick={() => seeVarietal(varietal)}
                >
                  <Table.Td>{event?.eventType}</Table.Td>
                  <Table.Td>{event?.dateStart} {event?.dateEnd ? ` - ${event?.dateEnd}` : ''}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Text size="sm">No events have been logged for {varietal ? ` ${varietal.name}` : 'this variety'}</Text>
        )}
      </Skeleton>


      <VarietalForm
        varietal={varietal}
        isOpen={showVarietalModal}
        onDismissVarietal={() => setShowVarietalModal(false)}
        onUpdateVarietal={handleUpdateVarietal}
        onDeleteVarietal={handleDeleteVarietal}
      />
    </>
  )
}

export default Varietal;