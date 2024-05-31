//Varietal.jsx
import React, { useEffect, useState } from "react";
import { calculateNextDate } from "../utils/DateTime";
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
  Timeline,
  Center,
  Avatar
} from '@mantine/core';
import { IconCalendar, IconClockHour4, IconDroplet, IconHourglassLow, IconNote, IconPencil, IconScale, IconSeeding, IconTractor } from '@tabler/icons-react';
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/DateTime";

import VarietalForm from "../components/varietals/VarietalForm";
import useVarietals from "../hooks/varietals/useVarietals";
import EventForm from "../components/events/EventForm";


const Varietal = () => {
  const {
    isLoading,
    loadVarietal,
  } = useVarietals();

  let { id: varietalId } = useParams();

  const [varietal, setVarietal] = useState();
  const [nextWaterDate, setNextWaterDate] = useState('');
  const [nextFertilizeDate, setNextFertilizeDate] = useState('');

  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventToShow, setEventToShow] = useState();

  const showEventForm = (_event) => {
    if (_event) {
      setEventToShow(_event);
    }
    setShowEventModal(true);
  };

  const handleSetNextDates = (varietalData) => {
    if (varietalData.waterStart && varietalData.waterStart !== '' && varietalData.waterEvery && varietalData.waterEvery !== 'Never') {
      const nxtWaterDt = calculateNextDate(varietalData.waterStart, varietalData.waterEvery);
      setNextWaterDate(nxtWaterDt);
    } else {
      setNextWaterDate('');
    }

    if (varietalData.fertilizeStart && varietalData.fertilizeStart !== '' && varietalData.fertilizeEvery && varietalData.fertilizeEvery !== 'Never') {
      const nxtFertDt = calculateNextDate(varietalData.fertilizeStart, varietalData.fertilizeEvery);
      setNextFertilizeDate(nxtFertDt);
    } else {
      setNextFertilizeDate('');
    }
  }

  const handleLoadVarietal = async () => {
    const varietalData = await loadVarietal(varietalId);
    if (varietalData) {
      setVarietal(varietalData);
      handleSetNextDates(varietalData);
    }
  }

  const handleUpdateVarietal = async (newData) => {
    setVarietal({ ...varietal, ...newData });
    handleSetNextDates(newData);
  }

  useEffect(() => {
    if (varietalId) {
      handleLoadVarietal();
    }
  }, [varietalId]);

  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>{varietal ? `${varietal?.name}` : "Variety"}</h1>
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
          <Blockquote color="blue">
            {varietal?.description}
          </Blockquote>
        )}

        <h2>Schedules</h2>
        <Grid>
          <GridCol span="auto">
            <Center>
              <Timeline active={2} bulletSize={30} lineWidth={2} color="indigo">
                <Timeline.Item bullet={<IconDroplet size={20} />} title="Watering Frequency">
                  <Text c="dimmed" size="med">{varietal?.waterEvery || '-'}</Text>
                </Timeline.Item>
                <Timeline.Item bullet={<IconClockHour4 size={20} />} title="Duration">
                  <Text c="dimmed" size="med">{varietal?.waterTime ? `${varietal?.waterTime} min` : '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Started on" bullet={<IconCalendar size={20} />} lineVariant="dashed">
                  <Text c="dimmed" size="med">{varietal?.waterStart ? formatDate(varietal.waterStart) : '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Next expected date" bullet={<IconHourglassLow size={20} />} lineVariant="dashed">
                  <Text c="dimmed" size="med">{nextWaterDate || '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Notes" bullet={<IconNote size={20} />}>
                  <Text c="dimmed" size="med">{varietal?.waterNotes || '-'}</Text>
                </Timeline.Item>
              </Timeline>
            </Center>
          </GridCol>
          <GridCol span="auto">
            <Center>
              <Timeline active={1} bulletSize={30} lineWidth={2} color="teal">
                <Timeline.Item bullet={<IconSeeding size={20} />} title="Fertilizing Frequency">
                  <Text c="dimmed" size="med">{varietal?.fertilizeEvery || '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Started on" bullet={<IconCalendar size={20} />} lineVariant="dashed">
                  <Text c="dimmed" size="med">{varietal?.fertilizeStart ? formatDate(varietal.fertilizeStart) : '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Next expected date" bullet={<IconHourglassLow size={20} />} lineVariant="dashed">
                  <Text c="dimmed" size="med">{nextFertilizeDate || '-'}</Text>
                </Timeline.Item>
                <Timeline.Item title="Notes" bullet={<IconNote size={20} />}>
                  <Text c="dimmed" size="med">{varietal?.fertilizeNotes || '-'}</Text>
                </Timeline.Item>
              </Timeline>
            </Center>
          </GridCol>
        </Grid>

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
                      <Text c="dimmed" style={{ marginRight: "16px" }}>{event.dateStart ? formatDate(event.dateStart) : ''} {event?.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}</Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid>
                      <GridCol span={{ base: 12, md: 4 }}>
                        <Table striped highlightOnHover>
                          <Table.Tbody>
                            <Table.Tr>
                              <Timeline active={2} bulletSize={30} lineWidth={2} color="yellow">
                                <Timeline.Item bullet={<IconTractor size={20} />} title="Event">
                                  <Text c="dimmed" size="med">{event.eventType}</Text>
                                </Timeline.Item>
                                <Timeline.Item title="Date" bullet={<IconCalendar size={20} />}>
                                  <Text c="dimmed" size="med">{event.dateStart ? formatDate(event.dateStart) : '-'} {event?.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}</Text>
                                </Timeline.Item>
                                <Timeline.Item title="Yield" bullet={<IconScale size={20} />}>
                                  <Text c="dimmed" size="med">{event?.yield || '-'}</Text>
                                </Timeline.Item>
                              </Timeline>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </GridCol>
                      <GridCol span={{ base: 12, md: 8 }}>
                        <Table striped highlightOnHover>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>
                                <Group justify="space-between">
                                  <Text>Notes</Text>
                                  <Avatar color="yellow" radius="lg">
                                    <IconNote size="1.5rem" />
                                  </Avatar>
                                </Group>
                              </Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td c="dimmed">{event?.notes || '-'}</Table.Td>
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
            <Text size="sm">This variety has not been included in any logged events.</Text>
          </>
        )}
        <Button onClick={() => setShowEventModal(true)} variant="filled" size="xs" color="green" style={{ marginTop: '30px' }}>Add Event</Button>
      </Skeleton >


      <VarietalForm
        varietal={varietal}
        isOpen={showVarietalModal}
        onDismissVarietal={() => setShowVarietalModal(false)}
        updateVarietalState={(data) => handleUpdateVarietal(data)}
      />
      <EventForm
        crop={varietal?.crop}
        varietal={varietal}
        reloadVarietal={handleLoadVarietal}
        _event={eventToShow}
        isOpen={showEventModal}
        onDismissEvent={() => {
          setShowEventModal(false);
          setEventToShow(null);
        }}
      />
    </>
  );
};

export default Varietal;