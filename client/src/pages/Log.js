//Log.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isNotEmpty, useForm } from '@mantine/form';
import { Button, Group, Input, Text, TextInput, Title, Tooltip } from "@mantine/core";
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
import { IconArrowLeft } from "@tabler/icons-react";
import { formatDate } from "../utils/DateTime";

const Log = () => {
  const {
    // isLoading,
    loadLog,
    updateLog,
  } = useLogs();

  let { id: logId } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState();
  const [isEditing, setIsEditing] = useState(false);

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
              <div style={{ border: 'solid 1px #c9c9c9', borderRadius: '0.5rem', minHeight: '20rem' }}>
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
                  placeholder='Add your new entry...'
                />
              </div>
              <br />
              <Button type="submit" variant="filled" size="xs" color="green">Save</Button>
              <Button type="submit" variant="filled" size="xs" color="gray" style={{ marginLeft: '0.5rem' }} onClick={() => setIsEditing(false)}>Cancel</Button>

            </form>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Group>
                <IconArrowLeft
                  onClick={() => navigate("/logs")}
                  size="1.5rem"
                  stroke={2}
                  color="black"
                  style={{ cursor: "pointer" }}
                />
                <h1>{log?.title}</h1>
              </Group>
              <Text c="dimmed" style={{ marginRight: "1rem" }}>{log?.createdAt ? formatDate(log.createdAt) : '-'}</Text>
            </div>
            <br />
            {log?.entry ? (
              <div style={{ border: 'solid 1px #c9c9c9', borderRadius: '0.5rem', minHeight: '20rem', padding: '1rem', color:'grey'}}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{log.entry}</ReactMarkdown>
              </div>
            ) : (
              <div style={{ border: 'solid 1px #c9c9c9', borderRadius: '0.5rem', minHeight: '20rem', padding: '1rem' }}>
                <Text c="dimmed">Click edit to start adding your new entry</Text>
              </div>
            )}
            <br />
            <Button onClick={() => setIsEditing(true)} variant="filled" size="xs" color="green" style={{ width: '5.5rem' }}>Edit Entry</Button>
          </>
        )
      }
    </>
  );
};

export default Log;