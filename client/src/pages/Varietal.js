//CropList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Text,
  Tooltip,
  Skeleton,
  Blockquote
} from '@mantine/core';
import axios from "axios";
import { useParams } from 'react-router-dom';
import VarietalForm from "../components/VarietalForm";
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const Varietal = () => {
  const navigate = useNavigate();

  const [varietal, setVarietal] = useState();
  let { id: varietalId } = useParams();

  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [formattedWaterStart, setFormattedWaterStart] = useState('');
  const [formattedFertilizeStart, setFormattedFertilizeStart] = useState('');
  const [nextWaterDate, setNextWaterDate] = useState('');
  const [nextFertilizeDate, setNextFertilizeDate] = useState('');
  // const [addNewCrop, setAddNewCrop] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // helper function to find the next date
  const calculateNextDate = (startDate, frequency) => {
    const today = new Date();
    let daysToAdd;

    switch (frequency) {
      case 'Daily':
        daysToAdd = 1;
        break;
      case 'Twice per Day':
        daysToAdd = 0.5;
        break;
      case 'Every other Day':
        daysToAdd = 2;
        break;
      case 'Once per Week':
        daysToAdd = 7;
        break;
      case 'Once per Month':
        daysToAdd = 30;
        break;
      case 'Once per Year':
        daysToAdd = 365.25;
        break;
      default:
        daysToAdd = 0;
        break;
    }

    const firstDate = new Date(startDate);
    const diffInDays = (today - firstDate) / (1000 * 60 * 60 * 24);

    const nextDate = new Date(firstDate);
    nextDate.setDate(firstDate.getDate() + Math.ceil(diffInDays / daysToAdd) * daysToAdd);
    return `${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getDate().toString().padStart(2, '0')}/${nextDate.getFullYear()}`;
  };

  // on load, pass in the varietal and start formatting dates
  const formatDates = (varietal) => {
    if (varietal.waterStart && varietal.waterStart !== "") {
      const waterStartDate = new Date(varietal?.waterStart);
      setFormattedWaterStart(`${(waterStartDate.getMonth() + 1).toString().padStart(2, '0')}/${waterStartDate.getDate().toString().padStart(2, '0')}/${waterStartDate.getFullYear()}`);
      if (varietal.waterEvery && varietal.waterEvery !== "Never") {
        setNextWaterDate(calculateNextDate(varietal.waterStart, varietal.waterEvery));
      }
    } else {
      setFormattedWaterStart("")
      setNextWaterDate("")
    }

    if (varietal.fertilizeStart && varietal.fertilizeStart !== "") {
      const fertilizeStartDate = new Date(varietal?.fertilizeStart);
      setFormattedFertilizeStart(`${(fertilizeStartDate.getMonth() + 1).toString().padStart(2, '0')}/${fertilizeStartDate.getDate().toString().padStart(2, '0')}/${fertilizeStartDate.getFullYear()}`);
      if (varietal.fertilizeEvery && varietal.fertilizeEvery !== "Never") {
        setNextFertilizeDate(calculateNextDate(varietal.fertilizeStart, varietal.fertilizeEvery));
      }
    } else {
      setFormattedFertilizeStart("")
      setNextFertilizeDate("")
    }
  };


  const loadVarietal = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`https://localhost:5001/api/varietals/${varietalId}`);
      const varietal = response.data;
      console.log('Get varietal ', response.data);

      setVarietal(varietal);
      formatDates(varietal);

    } catch (error) {
      console.error('Error fetching data:', error);
      navigate("/crops");
    };
    setIsLoading(false);
  }

  useEffect(() => {
    loadVarietal();
  }, []);


  const handleUpdateVarietal = (updatedVarietal) => {
    loadVarietal(updatedVarietal);
    // setVarietal(updatedVarietal);
    // setAddNewCrop(false);
    // setSelectedCrop();
    console.log('varietal was updated', updatedVarietal);
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

        <h2>Watering Schedule</h2>
        {varietal?.waterEvery || varietal?.waterStart ? (
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Frequency</Table.Th>
                <Table.Th>Duration</Table.Th>
                <Table.Th>First Watering</Table.Th>
                <Table.Th>Next Watering</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>{varietal?.waterEvery}</Table.Td>
                <Table.Td>{varietal?.waterTime ? `${varietal?.waterTime} min` : ''}</Table.Td>
                <Table.Td>{formattedWaterStart}</Table.Td>
                <Table.Td>{nextWaterDate}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        ) : (
          <Text size="sm">No watering schedule has been set for {varietal ? ` ${varietal.name}` : 'this variety'}</Text>
        )}

        <h2>Fertilizing Schedule</h2>
        {varietal?.fertilizeEvery ||  varietal?.fertilizeStart ? (
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Frequency</Table.Th>
                <Table.Th>First Fertilize</Table.Th>
                <Table.Th>Next Fertilize</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>{varietal?.fertilizeEvery}</Table.Td>
                <Table.Td>{formattedFertilizeStart}</Table.Td>
                <Table.Td>{nextFertilizeDate}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        ) : (
          <Text size="sm">No fertilizing schedule has been set for {varietal ? ` ${varietal.name}` : 'this variety'}</Text>
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
      />
    </>
  )
}

export default Varietal;