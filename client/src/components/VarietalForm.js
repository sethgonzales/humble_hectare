//CropForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import axios from "axios";
import { Modal, Button, TextInput, LoadingOverlay, Alert, Textarea } from '@mantine/core';

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
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
    },

    validate: {
      name: (value) => (value === "" ? "Please enter the variety's name" : null),
      description: (value) => (value === "" ? 'Please describe the variety' : null),
    },
  });

  // Update form values when varietal data changes
  useEffect(() => {
    if (varietal) {
      form.setValues({
        name: varietal?.name || "",
        description: varietal?.description || "",
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
        };

        await axios.put(
          `https://localhost:5001/api/crops/${varietal.cropId}/varietals/${varietal.varietalId}`,
          data
        );

        onUpdateVarietal({
          ...varietal,
          name: data.name,
          description: data.description,
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
          This action cannot be undone. All this varieties related data will be removed.
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
