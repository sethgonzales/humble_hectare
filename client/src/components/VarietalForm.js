//CropForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import axios from "axios";
import {
  Modal,
  Button,
  TextInput,
  LoadingOverlay,
  Alert,
  Textarea,
  NativeSelect
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

const VarietalForm = (props) => {
  const {
    varietal,
    isOpen,
    onDismissVarietal,
    onDeleteVarietal,
    onUpdateVarietal,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  // const dateWaterStart = new Date(varietal?.waterStart);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
      waterStart: "",
      waterEvery: null,
      fertilizeStart: "",
      fertilizeEvery: null,
    },
    validate: {
      name: (value) => (value === "" || null ? "Please enter the variety's name" : null),
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
        fertilizeStart: varietal?.fertilizeStart ? new Date(varietal.fertilizeStart) : null,
        fertilizeEvery: varietal?.fertilizeEvery || "",
      });
    }
  }, [varietal]);


  const handleUpdateVarietal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (form.isValid()) {
        const data = {
          varietalId: varietal?.varietalId,
          cropId: varietal?.cropId,
          name: form.values.name,
          description: form.values.description,
          waterStart: form.values.waterStart.toISOString(),
          waterEvery: form.values.waterEvery,
          fertilizeStart: form.values.fertilizeStart.toISOString(),
          fertilizeEvery: form.values.fertilizeEvery,
        };

        await axios.put(
          `https://localhost:5001/api/crops/${varietal.cropId}/varietals/${varietal.varietalId}`,
          data
        );

        onUpdateVarietal({
          ...varietal,
          name: data.name,
          description: data.description,
          waterStart: data.waterStart,
          waterEvery: data.waterEvery,
          fertilizeStart: data.fertilizeStart,
          fertilizeEvery: data.fertilizeEvery,
        });

        onDismissVarietal();
      }
    } catch (error) {
      console.error("Error updating varietal:", error);
    }
    setIsLoading(false);
  }

  const handleDelete = async () => {
    // setIsLoading(true);
    // try {

    //   await axios.delete(
    //     `https://localhost:5001/api/crops/${crop.cropId}`
    //   );

    //   onDeleteCrop(crop.cropId);

    //   onDismissVarietal();
    // } catch (error) {
    //   console.error("Error updating crop:", error);
    // }
    // form.reset();
    // setDeleteConfirm(false);
    // setIsLoading(false);
  }

  const handleDismiss = () => {
    onDismissVarietal();
    setDeleteConfirm(false);
  }

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title="Details">
      {!deleteConfirm && (
        <form onSubmit={handleUpdateVarietal}>
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
              { label: 'Never', value: null },
            ]}
            {...form.getInputProps('waterEvery')}
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
              { label: 'Never', value: null },
            ]}
            {...form.getInputProps('fertilizeEvery')}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
            <Button onClick={() => setDeleteConfirm(true)} variant="filled" size="xs" color="red">Delete</Button>
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
    </Modal >
  )
}

export default VarietalForm;
