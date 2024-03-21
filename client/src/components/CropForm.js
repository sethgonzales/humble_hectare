//CropForm.jsx
import React, { useEffect } from "react";
import { useForm } from '@mantine/form';
import axios from "axios";
import { Modal, Button, TextInput } from '@mantine/core';

const CropForm = (props) => {
  const { isOpen, onDismissCrop, crop, onUpdateCrop } = props;

  const form = useForm({
    initialValues: {
      name: "",
      type: "",
    },

    validate: {
      name: (value) => (value?.length === 0 ? 'Please enter a crop name' : null),
      type: (value) => (value?.length === 0 ? 'Please identify the crop type' : null),
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

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      // Validate form fields
      if (form.isValid()) {
        const data = {
          cropId: crop?.cropId,
          name: form.values.name,
          type: form.values.type,
        };

        const response = await axios.put(
          `https://localhost:5001/api/crops/${crop.cropId}`,
          data
        );

        onUpdateCrop({
          ...crop,
          name: data.name,
          type: data.type,
        });

        onDismissCrop();
      }
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  const handleDelete = () => {
    console.log('deleted crop: ', cropType);
  }

  return (
    <Modal opened={isOpen} onClose={onDismissCrop} title="Crop Details">
      <form onSubmit={handleUpdate}>
        <TextInput
          label="Name"
          placeholder="Name of the crop"
          {...form.getInputProps('name')}
        />
        {/* {form.errors.name && <div>{form.errors.name}</div>} */}

        <TextInput
          label="Type"
          placeholder="fruit, vegetable, etc."
          {...form.getInputProps('type')}
        />
        {/* {form.errors.type && <div>{form.errors.type}</div>} */}

        <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
        <Button onClick={handleDelete} variant="filled" size="xs" color="red">Delete</Button>
      </form>
    </Modal >
  )
}

export default CropForm;
