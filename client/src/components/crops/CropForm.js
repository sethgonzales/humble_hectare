//CropForm.jsx
import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from '@mantine/form';;
import { Modal, Button, TextInput, LoadingOverlay, Alert, NativeSelect } from '@mantine/core';

const CropForm = (props) => {
  const {
    crop,
    crops,
    isOpen,
    addCrop,
    updateCrop,
    deleteCrop,
    dismissCropForm,
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

  const handleDismiss = () => {
    dismissCropForm();
    setDeleteConfirm(false);
    form.reset();
  }

  const handleUpdateCrop = async () => {
    updateCrop(crop.cropId, form.values);
    handleDismiss();
  }

  const handleAddCrop = async () => {
    const newCropName = form.values.name.toLowerCase();
    const isDuplicate = crops?.some(existingCrop => existingCrop.name.toLowerCase() === newCropName);

    if (isDuplicate) {
      setDuplicateWarning(true);
      return;
    } else {
      await addCrop(form.values);
    }
    handleDismiss();
  };

  const handleSubmit = () => {
    if (form.isValid()) {
      if (crop) {
        handleUpdateCrop();
      } else {
        handleAddCrop();
      }
    }
  };

  const handleDelete = async () => {
    await deleteCrop(crop);
    handleDismiss();
  }

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title={crop ? "Crop Details" : "New Crop"}>
      {!deleteConfirm && !duplicateWarning && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Name of the crop"
            {...form.getInputProps('name')}
          />

          <NativeSelect
            label="Type of Crop"
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
            {crop && (
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
          There is another crop of this name already added
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => setDuplicateWarning(false)} variant="filled" size="xs" color="grey">Cancel</Button>
          </div>
        </Alert>
      )}
    </Modal >
  )
}

export default CropForm;
