//CropForm.jsx
import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from '@mantine/form';
import axios from "axios";
import { Modal, Button, TextInput, LoadingOverlay, Alert, NativeSelect } from '@mantine/core';

const CropForm = (props) => {
  const {
    crop,
    crops,
    isOpen,
    onDismissCrop,
    onDeleteCrop,
    onUpdateCrop,
    onAddNewCrop,
    addNewCrop,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: "",
      type: "",
    },

    validate: {
      name: isNotEmpty('Enter a crop name'),
      type: isNotEmpty('Enter a crop type'),
    },
  });

  // Update form values when crop data changes
  useEffect(() => {
    if (crop) {
      form.setValues({
        name: crop?.name || "",
        type: crop?.type || "",
      });
    }
  }, [crop]);


  const handleUpdateCrop = async () => {
    console.log(form.values);
    try {
      setIsLoading(true);
      const data = {
        cropId: crop?.cropId,
        name: form.values.name,
        type: form.values.type,
      };

      await axios.put(
        `https://localhost:5001/api/crops/${crop.cropId}`,
        data
      );

      onUpdateCrop({
        ...crop,
        name: data.name,
        type: data.type,
      });

      onDismissCrop();
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating crop:", error);
    }
    setIsLoading(false);
    form.reset();
  }

  const handleAddCrop = async () => {
    console.log(form.values);
    try {
      setIsLoading(true);
      const newCropName = form.values.name.toLowerCase();
      const isDuplicate = crops?.some(existingCrop => existingCrop.name.toLowerCase() === newCropName);

      if (isDuplicate) {
        setDuplicateWarning(true);
        setIsLoading(false);
        return;
      }

      const data = {
        name: form.values.name,
        type: form.values.type,
      };

      const response = await axios.post(
        `https://localhost:5001/api/crops/`,
        data
      );

      onAddNewCrop(response);
      onDismissCrop();
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding crop:", error);
    }
    form.reset();
    setIsLoading(false);
  };

  const handleSubmit = () => {
    if (form.isValid()) {
      if (!addNewCrop && crop) {
        handleUpdateCrop();
      } else {
        handleAddCrop();
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `https://localhost:5001/api/crops/${crop.cropId}`
      );

      onDeleteCrop(crop.cropId);

      onDismissCrop();

    } catch (error) {
      console.error("Error deleting crop:", error);
    }
    form.reset();
    setDeleteConfirm(false);
    setIsLoading(false);
  }

  const handleDismiss = () => {
    onDismissCrop();
    setDeleteConfirm(false);
    form.reset();
  }

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title={!addNewCrop ? "Crop Details" : "New Crop"}>
      {!deleteConfirm && !duplicateWarning && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Name of the crop"
            {...form.getInputProps('name')}
          />

          <NativeSelect
            label="Type of Event"
            // placeholder="Select the Crop Type"
            data={[
              { label: 'Select the Crop Type', value: '', disabled: true },
              { label: 'Vegetable', value: 'Vegetable' },
              { label: 'Fruit', value: 'Fruit' },
              { label: 'Berry', value: 'Berry' },
              { label: 'Herb', value: 'Herb' },
              { label: 'Grain', value: 'Grain' },
              { label: 'Tuber', value: 'Tuber' },
              { label: 'Legume', value: 'Legume' },
              { label: 'Mushroom', value: 'Mushroom' },
              { label: 'Root Crop', value: 'Root Crop' },
              { label: 'Other', value: 'Other' },
            ]}
            {...form.getInputProps('type')}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
            {crop && !addNewCrop && (
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
          This action cannot be undone. All varieties of this crop and its related data will be removed.
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={handleDelete} variant="filled" size="xs" color="red">Permanently Delete</Button>
            <Button onClick={() => setDeleteConfirm(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
      {duplicateWarning && (
        <Alert variant="light" color="blue" title="Hold up!">
          There is another crop of this same name already added
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => setDuplicateWarning(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal >
  )
}

export default CropForm;
