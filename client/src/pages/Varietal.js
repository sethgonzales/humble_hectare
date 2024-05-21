//CropList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Text,
  Tooltip,
  Skeleton,
  Blockquote,
  Button,
  Grid,
  Accordion,
  Group,
  GridCol,
  Card
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

import { formatDate } from "../utils/DateTime";

import VarietalForm from "../components/varietals/VarietalForm";
import useVarietals from "../utils/varietals/useVarietals";
import EventForm from "../components/events/EventForm";


const Varietal = () => {
  // const navigate = useNavigate();
  // const [varietal, setVarietal] = useState();

  const {
    varietal,
    nextWaterDate,
    nextFertilizeDate,
    isLoading,
  } = useVarietals();

  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventToShow, setEventToShow] = useState();

  const showEventForm = (_event) => {
    if (_event) {
      setEventToShow(_event);
    }
    setShowEventModal(true);
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

        <h2>Schedules</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: '2rem' }} >
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h3 style={{ marginTop: '0' }}>Fertilizing</h3>
            {varietal?.fertilizeEvery || varietal?.fertilizeStart ? (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Frequency</Table.Th>
                    <Table.Th>Initial</Table.Th>
                    <Table.Th>Next Expected</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>{varietal?.fertilizeEvery}</Table.Td>
                    <Table.Td>{varietal?.fertilizeStart ? formatDate(varietal.fertilizeStart) : '-'}</Table.Td>
                    <Table.Td>{nextFertilizeDate}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            ) : (
              <Text size="sm">Fertilizing schedule has not been set for this variety</Text>
            )}
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '32rem', minHeight: '10rem' }}>
            <h3 style={{ marginTop: '0' }}>Watering</h3>
            {varietal?.waterEvery || varietal?.waterStart ? (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Frequency</Table.Th>
                    <Table.Th>Duration</Table.Th>
                    <Table.Th>Initial</Table.Th>
                    <Table.Th>Next Expected</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>{varietal?.waterEvery || '-'}</Table.Td>
                    <Table.Td>{varietal?.waterTime ? `${varietal?.waterTime} min` : '-'}</Table.Td>
                    <Table.Td>{varietal?.waterStart ? formatDate(varietal.waterStart) : '-'}</Table.Td>
                    <Table.Td>{nextWaterDate || '-'}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            ) : (
              <Text size="sm">Water schedule has not been set for this variety</Text>
            )}
          </Card>
        </div>

        <h2>Event Log</h2>
        {varietal?.events?.length > 0 ? (
          <>
            <Accordion chevronPosition="right" variant="contained">
              {varietal.events.map((event) => (
                <Accordion.Item value={event.eventType + event.eventId} key={event.eventId}>
                  <Accordion.Control>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", justifyContent: 'space-between' }}>
                      <Group>
                        <Tooltip label="Click to edit" openDelay={500}>
                          <IconPencil onClick={() => showEventForm(event)} size="1rem" stroke={2} color="black" />
                        </Tooltip>
                        <Text><b>{event?.eventType}</b></Text>
                      </Group>
                      <Text style={{ marginRight: "16px" }}>{event.dateStart ? formatDate(event.dateStart) : ''} {event?.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}</Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid>
                      <GridCol span={{ base: 12, md: 4 }}>
                        <Table striped highlightOnHover>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td><b>Event</b></Table.Td>
                              <Table.Td>{event?.eventType}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td><b>Date</b></Table.Td>
                              <Table.Td>{event.dateStart ? formatDate(event.dateStart) : ''} {event?.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td><b>Yield</b></Table.Td>
                              <Table.Td>{event?.yield || '-'}</Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </GridCol>
                      <GridCol span={{ base: 12, md: 8 }}>
                        <Table striped highlightOnHover>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Notes</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td>{event?.notes || '-'}</Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </GridCol>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        ) : (
          <>
            <Text size="sm">{varietal?.name && varietal.crop?.name ? ` ${varietal.name} ${varietal.crop.name} ` : 'This variety'} has not been included in any logged events.</Text>
          </>
        )}
        <Button onClick={() => setShowEventModal(true)} variant="filled" size="xs" color="green" style={{ marginTop: '30px' }}>Add Event</Button>
      </Skeleton >


      <VarietalForm
        varietal={varietal}
        isOpen={showVarietalModal}
        onDismissVarietal={() => setShowVarietalModal(false)}
        // onUpdateVarietal={loadVarietal}
      />
      <EventForm
        crop={varietal?.crop}
        varietal={varietal}
        _event={eventToShow}
        isOpen={showEventModal}
        // loadVarietal={loadVarietal}
        onDismissEvent={() => {
          setShowEventModal(false);
          setEventToShow(null);
        }}
      />
    </>
  );
};

export default Varietal;