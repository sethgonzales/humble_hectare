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
  Checkbox,
  NativeSelect
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useEvents from "../../hooks/events/useEvents";
import useVarietals from "../../hooks/varietals/useVarietals";

const EventForm = (props) => {
  const {
    _log,
    _event,
    isOpen,
    varietal,
    onDismissEvent,
    reloadPage,
  } = props;

  const {
    addEvent,
    updateEvent,
    deleteEvent,
    isLoading,
  } = useEvents();

  const {
    loadVarietals,
  } = useVarietals();

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [multiDate, setMultiDate] = useState(false);

  const [varietalList, setVarietalList] = useState([]);

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      eventType: "",
      varietalId: "",
      dateStart: null,
      dateEnd: null,
      yield: "",
      notes: "",
    },
    validate: {
      eventType: isNotEmpty('Please enter the type of event'),
      varietalId: varietal && varietal.varietalId
        ? undefined // No validation if varietalId is already provided
        : isNotEmpty('Please select a varietal'), // Validate if no varietalId
      dateStart: (value) => {
        if (!value) {
          return 'Please select a start date';
        }
        return null;
      },
      dateEnd: (value) => {
        if (multiDate && !value) {
          return 'Please select an end date';
        }
        return null;
      },
    },
  });  

  const handleLoadVarietals = async () => {
    const _varietals = await loadVarietals();
    setVarietalList(_varietals);
  }

  // Update form values when event data changes
  useEffect(() => {
    if (_event) {
      form.setValues({
        eventType: _event?.eventType || "",
        varietalId: _event?.varietalId || "",
        dateStart: _event?.dateStart ? new Date(_event.dateStart) : null,
        dateEnd: _event?.dateEnd ? new Date(_event.dateEnd) : null,
        yield: _event?.yield || "",
        notes: _event?.notes || "",
      });
      setMultiDate(_event?.dateEnd && _event?.dateEnd.length > 0);
    }

    if (!varietal) {
      handleLoadVarietals();
    }

  }, [_event]);

  const handleDismiss = () => {
    onDismissEvent();
    setDeleteConfirm(false);
    form.reset();
  };

  const handleAddEvent = async () => {
    const hasDateEnd = form.values.dateEnd && multiDate

    const data = {
      varietalId: varietal?.varietalId || form.values.varietalId,
      logId: _log?.logId ? _log.logId : null,
      eventType: form.values.eventType,
      dateStart: form.values.dateStart ? form.values.dateStart.toISOString() : "",
      dateEnd: hasDateEnd ? form.values.dateEnd.toISOString() : "",
      yield: form.values.yield,
      notes: form.values.notes,
    };
    
    // add to db
    await addEvent(data)
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadPage();
  };

  const handleUpdateEvent = async () => {
    // add to db
    const formData = {
      varietalId: varietal?.varietalId ? varietal.varietalId : form.values.varietalId,
      eventId: _event.eventId,
      logId: _log?.logId ? _log.logId : null,
      ...form.values,
    }
    await updateEvent(formData)
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadPage();
  };

  const handleDelete = async () => {
    await deleteEvent(_event.eventId);
    // dismiss and reset the form
    handleDismiss();
    // reload the varietal
    reloadPage();
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

        <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
          <TextInput
            label="Type"
            placeholder="Harvest, process, seed, blossom, etc."
            {...form.getInputProps('eventType')}
          />

          {/* If no varietal has been sent in, and we are able to load our list of available varietals */}
          {!varietal && varietalList?.length > 0 && (
            <NativeSelect
              data={[
                { label: 'Select the Varietal', value: '', disabled: true },
                ...varietalList.map((varietal) => ({
                  label: varietal.name,
                  value: varietal.varietalId.toString(),
                })),
              ]}

              label="Varietal for this Event"
              {...form.getInputProps('varietalId')}
            />
          )}
          
          <div>
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
                  disabled={!form.values.dateStart}
                  minDate={form.values.dateStart || undefined}
                  {...form.getInputProps('dateEnd')}
                  />
              </>
            )}
            <Checkbox
              className="mt-2"
              label="Multi-date"
              checked={multiDate}
              onChange={() => setMultiDate(!multiDate)}
              />
          </div>

          <TextInput
            label="Yield"
            placeholder="Value and units"
            {...form.getInputProps('yield')}
          />

          <Textarea
            resize="vertical"
            label="Notes"
            placeholder="Write any notes here..."
            {...form.getInputProps('notes')}
          />

          <div className="flex items-center justify-center gap-4 mt-4">
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
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={handleDelete} variant="filled" size="xs" color="red">Permanently Delete</Button>
            <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal>
  );
};
export default EventForm;
