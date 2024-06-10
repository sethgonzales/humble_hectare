//Log.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isNotEmpty, useForm } from '@mantine/form';
import { Button, Input, Text, TextInput, Title } from "@mantine/core";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
} from '@mdxeditor/editor';
import { headingsPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import useLogs from "../hooks/logs/useLogs";

const Log = () => {
  const {
    // isLoading,
    loadLog,
    updateLog,
  } = useLogs();

  let { id: logId } = useParams();

  const [log, setLog] = useState();
  const [isEditing, setIsEditing] = useState();

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      title: "",
      entry: "",
    },
    validate: {
      title: isNotEmpty("Please enter a title for this log entry")
    },
  });


  const handleLoadLog = async () => {
    const logData = await loadLog(logId);
    if (logData) {
      setLog(logData);
    }
  }

  useEffect(() => {
    if (logId) {
      handleLoadLog();
    }
  }, [logId]);

  // Update form values when log data changes or is being edited
  useEffect(() => {
    if (log) {
      form.setValues({
        title: log?.title || "",
        entry: log?.entry || "",
      });
    }
  }, [log, isEditing]);

  const handleUpdateLog = async () => {
    await updateLog(log.logId, form.values);
    setIsEditing(false);
    handleLoadLog();
  }


  const handleSubmit = () => {
    if (form.isValid()) {
      handleUpdateLog();
    }
  };

  return (
    <>
      <Button onClick={() => setIsEditing(!isEditing)} variant="filled" size="xs" color="green">Edit</Button>

      {isEditing ?
        (
          <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Title"
                placeholder="Title of this log entry"
                {...form.getInputProps('title')}
              />
              <br />

              <label htmlFor="entry">
                Entry
              </label>
              <MDXEditor
                markdown={form.values.entry}
                onChange={(markdown) => form.setFieldValue('entry', markdown)}
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  markdownShortcutPlugin(),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <ListsToggle />
                      </>
                    ),
                  }),
                ]}
              />
              <Button type="submit" variant="filled" size="xs" color="green">Save</Button>

            </form>
          </>
        ) : (
          <>
            <Title>{log?.title}</Title>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{log?.entry}</ReactMarkdown>
          </>
        )
      }
    </>
  );
};

export default Log;