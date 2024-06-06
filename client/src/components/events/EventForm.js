//EventForm.jsx
import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from '@mantine/form';
import {
  Modal,
  Button,
  TextInput,
  LoadingOverlay,
  Alert,
  Textarea,
  Checkbox
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useEvents from "../../hooks/events/useEvents";

const EventForm = (props) => {
  const {
    crop,
    _event,
    isOpen,
    varietal,
    onDismissEvent,
    reloadVarietal,
  } = props;

  const {
    addEvent,
    updateEvent,
    deleteEvent,
    isLoading,
  } = useEvents();

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [multiDate, setMultiDate] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      eventType: "",
      dateStart: null,
      dateEnd: null,
      yield: "",
      notes: "",
    },
    validate: {
      eventType: isNotEmpty('Please enter the type of event'),
      dateStart: (value) => {
        if (!value) {
          return null;
        }
      },
      dateEnd: (value) => {
        if (!value) {
          return null;
        }
      },
    },
  });

  // Update form values when event data changes
  useEffect(() => {
    if (_event) {
      form.setValues({
        eventType: _event?.eventType || "",
        dateStart: _event?.dateStart ? new Date(_event.dateStart) : null,
        dateEnd: _event?.dateEnd ? new Date(_event.dateEnd) : null,
        yield: _event?.yield || "",
        notes: _event?.notes || "",
      });
      setMultiDate(_event?.dateEnd && _event?.dateEnd.length > 0);
    }
  }, [_event]);

  const handleDismiss = () => {
    onDismissEvent();
    setDeleteConfirm(false);
    form.reset();
  };

  const handleAddEvent = async () => {
    // add to db
    await addEvent(varietal.varietalId, form.values)
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadVarietal();
  };

  const handleUpdateEvent = async () => {
    // add to db
    const formData = {
      varietalId: varietal.varietalId,
      eventId: _event.eventId,
      logId: _event.logId,
      ...form.values,
    }
    await updateEvent(formData)
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadVarietal();
  };

  const handleDelete = async () => {
    await deleteEvent(_event.eventId);
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadVarietal();
  }

  const handleSubmit = () => {
    if (form.isValid()) {
      if (_event) {
        handleUpdateEvent();
      } else {
        handleAddEvent();
      }
    }
  };

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title={_event ? "Event Details" : "New Event"}>
      {!deleteConfirm && (

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Type"
            placeholder="Harvest, process, seed, blossom, etc."
            {...form.getInputProps('eventType')}
          />
          <br />

          <DatePickerInput
            label={!multiDate ? "Date" : "Start Date"}
            dropdownType="modal"
            clearable
            placeholder={!multiDate ? "Select the event date" : "Pick start date"}
            // maxDate={new Date()}
            {...form.getInputProps('dateStart')}
          />

          {multiDate && (
            <>
              <DatePickerInput
                label="End Date"
                dropdownType="modal"
                clearable
                placeholder="Pick end date"
                {...form.getInputProps('dateEnd')}
              />
            </>
          )}
          <Checkbox
            style={{ marginTop: '8px' }}
            label="Multi-date"
            checked={multiDate}
            onChange={() => setMultiDate(!multiDate)}
          />
          <br />

          <TextInput
            label="Yield"
            placeholder="Value and units"
            {...form.getInputProps('yield')}
          />
          <br />

          <Textarea
            resize="vertical"
            label="Notes"
            placeholder="Write any notes here..."
            {...form.getInputProps('notes')}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
            {_event && (
              <Button onClick={() => setDeleteConfirm(true)} variant="filled" size="xs" color="red">Delete</Button>
            )}
          </div>
        </form>
      )}
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {deleteConfirm && (
        <Alert variant="light" color="blue" title="Hold up!">
          This action cannot be undone. This event will be removed.
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={handleDelete} variant="filled" size="xs" color="red">Permanently Delete</Button>
            <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal>
  );
};
export default EventForm;
