//VarietalForm.js
import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from '@mantine/form';
import {
  Modal,
  Button,
  TextInput,
  LoadingOverlay,
  Alert,
  Textarea,
  NativeSelect,
  NumberInput
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import useVarietals from "../../hooks/varietals/useVarietals";


const VarietalForm = (props) => {

  const {
    isLoading,
    addVarietal,
    updateVarietal,
    deleteVarietal,
  } = useVarietals();

  const {
    varietal,
    isOpen,
    onDismissVarietal,
    updateVarietalState,
    reloadCrops,
    crop,
  } = props;

  const navigate = useNavigate();

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const frequencyValues = [
    { label: 'Select Frequency', value: '', disabled: true },
    { label: 'Daily', value: 'Daily' },
    { label: 'Twice per Day', value: 'Twice per Day' },
    { label: 'Every other Day', value: 'Every other Day' },
    { label: 'Once per Week', value: 'Once per Week' },
    { label: 'Once per Month', value: 'Once per Month' },
    { label: 'Once per Six Months', value: 'Once per Six Months' },
    { label: 'Once per Year', value: 'Once per Year' },
    { label: 'Never', value: null },
  ];

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
      waterStart: null,
      waterEvery: "",
      waterTime: "",
      waterNotes: "",
      fertilizeStart: null,
      fertilizeEvery: "",
      fertilizeNotes: "",
    },
    validate: {
      name: isNotEmpty("Please enter the variety's name"),
      waterStart: (value) => {
        if (!value) {
          return null;
        }
      },
      fertilizeStart: (value) => {
        if (!value) {
          return null;
        }
      },
    },
  });

  // Update form values when varietal data changes
  useEffect(() => {
    if (varietal) {
      form.setValues({
        name: varietal?.name || "",
        description: varietal?.description || "",
        waterStart: varietal?.waterStart ? new Date(varietal.waterStart) : null,
        waterEvery: varietal?.waterEvery || "",
        waterTime: varietal?.waterTime || "",
        waterNotes: varietal?.waterNotes || "",
        fertilizeStart: varietal?.fertilizeStart ? new Date(varietal.fertilizeStart) : null,
        fertilizeEvery: varietal?.fertilizeEvery || "",
        fertilizeNotes: varietal?.fertilizeNotes || "",
      });
    }
  }, [varietal, isOpen]);

  const handleDismiss = () => {
    onDismissVarietal();
    setDeleteConfirm(false);
    form.reset();
  };

  const handleUpdateVarietal = async () => {
    const formData = {
      varietalId: varietal.varietalId,
      cropId: varietal.cropId,
      ...form.values,
    }
    await updateVarietal(formData);
    updateVarietalState(form.values);
    handleDismiss();
  }

  const handleAddVarietal = async () => {
    const newVarietalName = form.values.name.toLowerCase();
    const isDuplicate = crop.varietals?.some(existingVarietal => existingVarietal.name.toLowerCase() === newVarietalName);

    if (isDuplicate) {
      setDuplicateWarning(true);
    } else {
      // update db
      await addVarietal(form.values, crop.cropId);
      // reload crop list
      handleDismiss();
      reloadCrops();
    }
  };


  const handleDelete = async () => {
    // update db
    await deleteVarietal(varietal.varietalId);
    handleDismiss();
    // navigate back to crops list
    navigate('/crops');
  }

  const handleSubmit = () => {
    if (form.isValid()) {
      if (varietal) {
        handleUpdateVarietal();
      } else {
        handleAddVarietal();
      }
    }
  };

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title={varietal ? "Varietal Details" : "New Varietal"} >
      {!deleteConfirm && !duplicateWarning && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Name of this variety"
            {...form.getInputProps('name')}
          />

          <Textarea
            resize="vertical"
            label="Description"
            placeholder="Describe this variety..."
            {...form.getInputProps('description')}
          />

          <h3 className="mb-0">Watering Schedule</h3>
          <DatePickerInput
            label="Start Date"
            dropdownType="modal"
            clearable
            placeholder="Pick start date"
            maxDate={new Date()}
            {...form.getInputProps('waterStart')}
          />

          <NativeSelect
            label="Frequency"
            data={frequencyValues}
            {...form.getInputProps('waterEvery')}
          />


          <NumberInput
            label="Watering Time (minutes)"
            placeholder="Time in minutes"
            min={0}
            {...form.getInputProps('waterTime')}
          />

          <Textarea
            label="Watering Notes"
            resize="vertical"
            placeholder="Specific instructions or reminders..."
            {...form.getInputProps('waterNotes')}
          />

          <h3 className="mb-0">Fertilizing Schedule</h3>
          <DatePickerInput
            leftSectionPointerEvents="none"
            label="Start Date"
            dropdownType="modal"
            clearable
            placeholder="Pick start date"
            maxDate={new Date()}
            {...form.getInputProps('fertilizeStart')}
          />

          <NativeSelect
            label="Frequency"
            data={frequencyValues}
            {...form.getInputProps('fertilizeEvery')}
          />
          
          <Textarea
            label="Fertilizing Notes"
            resize="vertical"
            placeholder="Specific instructions or reminders..."
            {...form.getInputProps('fertilizeNotes')}
          />

          <div className="flex items-center justify-center gap-4 mt-4">
            <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
            {varietal && (
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
          This action cannot be undone. This variety's related data and events will be removed.
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={handleDelete} variant="filled" size="xs" color="red">Permanently Delete</Button>
            <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
      {duplicateWarning && (
        <Alert variant="light" color="blue" title="Hold up!">
          There is another variety of this same name already added for this crop
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={() => setDuplicateWarning(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal>
  );
};

export default VarietalForm;
