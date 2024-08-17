//Log.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isNotEmpty, useForm } from '@mantine/form';
import {
  Accordion,
  Alert,
  Avatar,
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Modal,
  Table,
  Text,
  TextInput,
  Timeline,
  Tooltip
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconCalendar, IconCarrot, IconNote, IconPencil, IconScale, IconTractor } from "@tabler/icons-react";

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
} from '@mdxeditor/editor';
import { headingsPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import EventForm from "../components/events/EventForm";

import useLogs from "../hooks/_logs/useLogs";
import useEvents from "../hooks/events/useEvents";

import { formatDate } from "../utils/DateTime";

const Log = () => {
  const {
    // isLoading,
    loadLog,
    updateLog,
    deleteLog,
  } = useLogs();

  const {
    updateEvent,
  } = useEvents();


  let { id: logId } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventToShow, setEventToShow] = useState();

  const showEventForm = (_event) => {
    if (_event) {
      setEventToShow(_event);
    }
    setShowEventModal(true);
  };


  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      title: "",
      entry: "",
    },
    validate: {
      title: isNotEmpty("Please enter a title for this log entry")
    },
  });


  const handleLoadLog = async () => {
    try {
      const logData = await loadLog(logId);
      setLog(logData);
    } catch {
      navigate("/logs");
    }
  }

  useEffect(() => {
    if (logId) {
      handleLoadLog();
    }
  }, [logId]);

  // Update form values when log data changes or is being edited
  useEffect(() => {
    if (log) {
      form.setValues({
        title: log?.title || "",
        entry: log?.entry || "",
      });
    }
  }, [log, isEditing]);

  const handleUpdateLog = async () => {
    await updateLog(log, form.values);
    setIsEditing(false);
    handleLoadLog();
  }

  const handleDeleteLog = async () => {
    // Update related events to set logId to null
    await Promise.all(
      log?.events.map(async (event) => {
        if (event.logId === log.logId) {
          const updatedEvent = {
            ...event,
            logId: null,
          };
          await updateEvent(updatedEvent);
        }
      })
    );

    // Delete the log
    await deleteLog(log.logId);
    setIsEditing(false);
    navigate("/logs");
  }

  const handleSubmit = () => {
    if (form.isValid()) {
      handleUpdateLog();
    }
  };

  return (
    <>
      {isEditing ?
        (
          <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex
                justify={"space-between"}
              >
                <Button variant="filled" size="xs" color="red" onClick={() => setDeleteConfirm(true)}>Delete</Button>
                <Group>
                  <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
                  <Button variant="filled" size="xs" color="gray" gap="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </Group>
              </Flex>
              <br />
              <label htmlFor="title">
                Title
              </label>
              <TextInput
                placeholder="Title of this log entry"
                {...form.getInputProps('title')}
              />
              <br />

              <label htmlFor="entry">
                Entry
              </label>
              <div className="border border-gray-400 rounded-sm min-h-40 max-h-80 resize-y overflow-scroll">
                <MDXEditor
                  markdown={form.values.entry}
                  onChange={(markdown) => form.setFieldValue('entry', markdown)}
                  plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                          <ListsToggle />
                        </>
                      ),
                    }),
                  ]}
                  placeholder='Add your new entry...'
                />
              </div>
            </form>
            <br />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <Group>
                <IconArrowLeft
                  onClick={() => navigate("/logs")}
                  size="1.5rem"
                  stroke={2}
                  className="cursor-pointer text-gray-500"
                  />
                <h1 className="text-2xl font-semibold">{log?.title}</h1>
              </Group>
              <Button onClick={() => setIsEditing(true)} variant="filled" size="xs" color="green">Edit</Button>
            </div>
            <Text c="dimmed">{log?.createdAt ? formatDate(log.createdAt) : '-'}</Text>
            {log?.entry ? (
              <di onClick={() => setIsEditing(true)} className="border border-gray-400 rounded-sm min-h-40 max-h-80 resize-y overflow-scroll p-2 text-gray-400 cursor-pointer">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{log.entry}</ReactMarkdown>
              </di>
            ) : (
              <div onClick={() => setIsEditing(true)} className="border border-gray-400 rounded-sm min-h-40 p-2 text-gray-400 cursor-pointer">
                <Text>Click edit to start adding your new entry</Text>
              </div>
            )}
            <br />
          </>
        )
      }
      <h2 className="font-semibold">Events</h2>
      <div>
        {log?.events?.length > 0 ? (
          <>
            <Accordion chevronPosition="right" variant="contained">
              {log.events.map((event) => (
                <Accordion.Item value={event.eventType + event.eventId} key={event.eventId}>
                  <Accordion.Control>
                    <div className="flex flex-wrap items-center gap-1 justify-between">
                      <Group>
                        <Tooltip label="Click to edit" openDelay={500}>
                          <IconPencil onClick={() => showEventForm(event)} size="1rem" stroke={2} color="black" />
                        </Tooltip>
                        <Text><b>{event?.eventType}</b></Text>
                      </Group>
                      <Text c="dimmed" className="mr-4">{event.dateStart ? formatDate(event.dateStart) : ''} {event?.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}</Text>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid>
                      <GridCol span={{ base: 12, md: 4 }}>
                        <Timeline active={2} bulletSize={30} lineWidth={2} color="yellow">
                          <Timeline.Item
                            bullet={<IconCarrot size={20} />}
                            title="Crop Variety"
                          >
                            <Text
                              c="dimmed"
                              size="med"
                              className="cursor-pointer"
                              onClick={event.varietal?.varietalId ? () => navigate(`/varietal/${event.varietal.varietalId}`) : null}
                            >
                              {event.varietal?.name}
                            </Text>
                          </Timeline.Item>
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
                      <GridCol span={12}>
                        {event.varietal?.varietalId && (
                          <Text
                            c="dimmed"
                            ta="right"
                            w="100%"
                            className="flex items-center justify-end cursor-pointer"
                            onClick={() => navigate(`/varietal/${event.varietal.varietalId}`)}
                          >
                            Go to Variety
                            <IconArrowRight />
                          </Text>
                        )}
                      </GridCol>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        ) : (
          <>
            <Text size="sm">No events have been recorded for this variety.</Text>
          </>
        )}
        <Button onClick={() => setShowEventModal(true)} variant="filled" size="xs" color="green" className="mt-6">Add Event</Button>


        <EventForm
          _log={log}
          reloadPage={handleLoadLog}
          _event={eventToShow}
          isOpen={showEventModal}
          onDismissEvent={() => {
            setShowEventModal(false);
            setEventToShow(null);
          }}
        />
      </div >
      {deleteConfirm && (
        <Modal title="Confirm Delete" onClose={() => setDeleteConfirm(false)} opened={deleteConfirm}>
          <Alert variant="light" color="blue" title="Hold up!">
            This action cannot be undone and will remove this log as record for its related varieties.
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button onClick={handleDeleteLog} variant="filled" size="xs" color="red">Permanently Delete</Button>
              <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
            </div>
          </Alert>
        </Modal>
      )
      }
    </>
  );
};

export default Log;