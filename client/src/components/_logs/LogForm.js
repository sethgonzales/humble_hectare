//CropForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from '@mantine/form';;
import useLogs from "../../hooks/_logs/useLogs";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";

const LogForm = (props) => {
  const {
    isOpen,
    dismissForm,
  } = props;

  const {
    isLoading,
    addLog,
  } = useLogs();

  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      title: "",
    },

    validate: {
      title: isNotEmpty('Log must have a title'),
    },
  });


  const handleDismiss = () => {
    dismissForm();
    form.reset();
  };

  const handleAddLog = async () => {
    // update db
    const newLog = await addLog(form.values);
    // go to new log page
    handleDismiss();
    navigate(`/logs/${newLog.logId}`)
  }

  const handleSubmit = () => {
    if (form.isValid()) {
      handleAddLog();
    }
  };

  return (
    <Modal opened={isOpen} onClose={handleDismiss} title="New Log Entry">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Title of this entry"
          {...form.getInputProps('title')}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
        </div>
      </form>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Modal >
  )
}

export default LogForm;
