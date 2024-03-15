//Crop.jsx
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Fieldset } from '@mantine/core';
import { TextInput } from '@mantine/core';

const Crop = (props) => {
  // let { id } = useParams();
  // const [opened] = useDisclosure(false);
  const { isOpen, onDismissCrop, crop } = props;
  const [cropName, setCropName] = useState(crop?.name);
  const [cropType, setCropType] = useState(crop?.type);
  console.log('crop', crop);
  console.log('crop name', cropName);

  const handleUpdate = () => {
    console.log('updated crop: ', cropName, cropType);
  }
  
  const handleDelete = () => {
    console.log('deleted crop: ', cropType);
  }

  return (
    <>
      <Modal opened={isOpen} onClose={onDismissCrop} title="Crop Details">
        <Fieldset legend="Crop information">

          <TextInput
            label="Name"
            value={cropName}
            defaultValue={crop?.name}
            withAsterisk
            placeholder="Name of the crop"
            required
            // error="Please enter a crop name"
            onChange={(event) => setCropName(event.currentTarget.value)}
          />
          <TextInput
            label="Type"
            withAsterisk
            placeholder="fruit, vegetable, etc."
            value={cropType}
            defaultValue={crop?.type}
            onChange={(event) => setCropType(event.currentTarget.value)}
            required
            // error="Please enter the type of crop"
          />
        </Fieldset>
        <Button onClick={handleUpdate} variant="filled" size="xs" color="green">Save</Button>
        <Button onClick={handleDelete} variant="filled" size="xs" color="red">Delete</Button>
      </Modal>
    </>
  )
}

export default Crop;