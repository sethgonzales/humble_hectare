//CropList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Text,
  Tooltip,
  Skeleton,
  Blockquote,
  Button
} from '@mantine/core';
import axios from "axios";
import { useParams } from 'react-router-dom';
import VarietalForm from "../components/VarietalForm";
import EventForm from "../components/EventForm";
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/DateTime";
import { calculateNextDate } from "../utils/DateTime";
// import { useNavigate } from "react-router-dom";

const Varietal = () => {
  const navigate = useNavigate();

  const [varietal, setVarietal] = useState();
  let { id: varietalId } = useParams();

  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [formattedWaterStart, setFormattedWaterStart] = useState('');
  const [formattedFertilizeStart, setFormattedFertilizeStart] = useState('');
  const [nextWaterDate, setNextWaterDate] = useState('');
  const [nextFertilizeDate, setNextFertilizeDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const loadVarietal = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`https://localhost:5001/api/varietals/${varietalId}`);
      const varietal = response.data;
      console.log('Get varietal ', response.data);

      setVarietal(varietal);

      if (varietal.waterStart && varietal.waterStart !== '') {
        const frmtWaterSt = formatDate(varietal.waterStart);
        setFormattedWaterStart(frmtWaterSt);

        if (varietal.waterEvery && varietal.waterEvery !== 'Never') {
          const nxtWaterDt = calculateNextDate(frmtWaterSt, varietal.waterEvery);
          setNextWaterDate(nxtWaterDt);
        } else {
          setNextWaterDate('');
        }
      } else {
        setFormattedWaterStart('');
        setNextWaterDate('');
      }

      if (varietal.waterStart && varietal.waterStart !== '') {
        const frmtFertSt = formatDate(varietal.fertilizeStart);
        setFormattedFertilizeStart(frmtFertSt);
        if (varietal.fertilizeEvery && varietal.fertilizeEvery !== 'Never') {
          const nxtFertDt = calculateNextDate(frmtFertSt, varietal.fertilizeEvery);
          setNextFertilizeDate(nxtFertDt);
        } else {
          setNextFertilizeDate('');
        }
      } else {
        setFormattedFertilizeStart('');
        setNextFertilizeDate('');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      navigate("/crops");
    };
    setIsLoading(false);
  }

  useEffect(() => {
    loadVarietal();
  }, []);

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
        {varietal?.fertilizeEvery || varietal?.fertilizeStart ? (
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
                // onClick={() => seeEvent(event)}
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
        <Button onClick={() => setShowEventModal(true)} variant="filled" size="xs" color="green" style={{ marginTop: '30px', marginLeft: '10px' }}>Add Event</Button>
      </Skeleton>


      <VarietalForm
        varietal={varietal}
        isOpen={showVarietalModal}
        onDismissVarietal={() => setShowVarietalModal(false)}
        onUpdateVarietal={loadVarietal}
      />
      <EventForm
        varietal={varietal}
        isOpen={showEventModal}
        onDismissEvent={() => setShowEventModal(false)}

      />
    </>
  );
};

export default Varietal;