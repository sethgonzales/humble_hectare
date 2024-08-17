import React from "react";
import {
  Table,
  Group,
  Text,
  Accordion,
  Button,
  Tooltip,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import EventForm from "../components/events/EventForm";

const EventList = (props) => {
  const {
    _event
  } = props;

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
      <Accordion.Item value={_event.eventType + _event.eventId} key={_event.eventId}>
        <Accordion.Control>
          <div className="flex flex-wrap items-center gap-1 justify-between">
            <Group>
              <Tooltip label="Click to edit" openDelay={500}>
                <IconPencil onClick={() => showEventForm(_event)} size="1rem" stroke={2} color="black" />
              </Tooltip>
              <Text><b>{_event?.eventType}</b></Text>
            </Group>
            <Text c="dimmed" className="mr-4">{_event.dateStart ? formatDate(_event.dateStart) : ''} {_event?.dateEnd ? ` - ${formatDate(_event.dateEnd)}` : ''}</Text>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <Grid>
            <GridCol span={{ base: 12, md: 4 }}>
              <Timeline active={2} bulletSize={30} lineWidth={2} color="yellow">
                <Timeline.Item bullet={<IconTractor size={20} />} title="Event">
                  <Text c="dimmed" size="med">{_event.eventType}</Text>
                </Timeline.Item>
                <Timeline.Item title="Date" bullet={<IconCalendar size={20} />}>
                  <Text c="dimmed" size="med">{_event.dateStart ? formatDate(_event.dateStart) : '-'} {_event?.dateEnd ? ` - ${formatDate(_event.dateEnd)}` : ''}</Text>
                </Timeline.Item>
                <Timeline.Item title="Yield" bullet={<IconScale size={20} />}>
                  <Text c="dimmed" size="med">{_event?.yield || '-'}</Text>
                </Timeline.Item>
              </Timeline>
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
                    <Table.Td c="dimmed">{_event?.notes || '-'}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </GridCol>
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
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
  )
};

export default EventList;
