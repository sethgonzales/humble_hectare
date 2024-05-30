//VarietalForm.js
import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from '@mantine/form';
import axios from "axios";
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
    updateVarietal,
  } = useVarietals();

  const {
    varietal,
    isOpen,
    onDismissVarietal,
    // onUpdateVarietal,
    // onAddNewVarietal,
    crop,
  } = props;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
      waterStart: null,
      waterEvery: "",
      waterTime: "",
      fertilizeStart: null,
      fertilizeEvery: "",
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
        fertilizeStart: varietal?.fertilizeStart ? new Date(varietal.fertilizeStart) : null,
        fertilizeEvery: varietal?.fertilizeEvery || "",
      });
    }
  }, [varietal, isOpen]);

  const handleDismiss = () => {
    onDismissVarietal();
    setDeleteConfirm(false);
    form.reset();
  };

  const handleUpdateVarietal = async () => {
    await updateVarietal(varietal.varietalId, varietal.cropId, form.values);
    handleDismiss();
  }

  const handleAddVarietal = async () => {
    try {
      setIsLoading(true);

      const newVarietalName = form.values.name.toLowerCase();
      const isDuplicate = crop.varietals?.some(existingVarietal => existingVarietal.name.toLowerCase() === newVarietalName);

      if (isDuplicate) {
        setDuplicateWarning(true);
        setIsLoading(false);
        return;
      }

      const data = {
        cropId: crop.cropId,
        name: form.values.name,
        description: form.values.description,
        waterStart: form.values.waterStart ? form.values.waterStart.toISOString() : "",
        waterEvery: form.values.waterEvery,
        waterTime: form.values.waterTime ? form.values.waterTime : 0,
        fertilizeStart: form.values.fertilizeStart ? form.values.fertilizeStart.toISOString() : "",
        fertilizeEvery: form.values.fertilizeEvery,
      };

      const response = await axios.post(
        `https://localhost:5001/api/crops/${crop.cropId}/varietals`,
        data
      );

      // onAddNewVarietal(response);
      handleDismiss();
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding varietal:", error);
    }
    setIsLoading(false);
  };


  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://localhost:5001/api/varietals/${varietal.varietalId}`
      );

      onDismissVarietal();
      navigate('/crops');

    } catch (error) {
      console.error("Error deleting varietal:", error);
    }
    form.reset();
    setDeleteConfirm(false);
    setIsLoading(false);
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

          <h3 style={{ marginBottom: "0" }}>Watering Schedule</h3>
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
            data={[
              { label: 'Select Frequency', value: '', disabled: true },
              { label: 'Daily', value: 'Daily' },
              { label: 'Twice per Day', value: 'Twice per Day' },
              { label: 'Every other Day', value: 'Every other Day' },
              { label: 'Once per Week', value: 'Once per Week' },
              { label: 'Once per Month', value: 'Once per Month' },
              { label: 'Once per Year', value: 'Once per Year' },
              { label: 'Never', value: null },
            ]}
            {...form.getInputProps('waterEvery')}
          />


          <NumberInput
            label="Watering Time (minutes)"
            placeholder="Time in minutes"
            min={0}
            {...form.getInputProps('waterTime')}
          />

          <h3 style={{ marginBottom: "0" }}>Fertilizing Schedule</h3>
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
            data={[
              { label: 'Select Frequency', value: '', disabled: true },
              { label: 'Daily', value: 'Daily' },
              { label: 'Twice per Day', value: 'Twice per Day' },
              { label: 'Every other Day', value: 'Every other Day' },
              { label: 'Once per Week', value: 'Once per Week' },
              { label: 'Once per Month', value: 'Once per Month' },
              { label: 'Once per Year', value: 'Once per Year' },
              { label: 'Never', value: null },
            ]}
            {...form.getInputProps('fertilizeEvery')}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={handleDelete} variant="filled" size="xs" color="red">Permanently Delete</Button>
            <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
      {duplicateWarning && (
        <Alert variant="light" color="blue" title="Hold up!">
          There is another variety of this same name already added for this crop
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => setDuplicateWarning(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal>
  );
};

export default VarietalForm;
