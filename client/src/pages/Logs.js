//Logs.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Group, Skeleton, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import useLogs from "../hooks/logs/useLogs";
import LogList from "../components/logs/LogList";
import LogForm from "../components/logs/LogForm";

export default function Logs() {
  const navigate = useNavigate();

  const {
    loadLogs,
    isLoading,
  } = useLogs();

  const [logs, setLogs] = useState();
  const [showLogModal, setShowLogModal] = useState(false);

  const handleLoadLogs = async () => {
    const logList = await loadLogs();
    if (logList) {
      setLogs(logList);
    }
  };

  useEffect(() => {
    handleLoadLogs();
  }, [])

  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Logs</h1>
          <Group>
            <Button onClick={() => setShowLogModal(true)} color="gray" variant="outline" radius="xl">
              <IconPlus size="1.5rem" stroke={2} color="black" />
            </Button>
          </Group>
        </div>
        {logs ?
          (<Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {logs.map((log) => (
                <Table.Tr
                  key={log.logId}
                  onClick={() => navigate(`/logs/${log?.logId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <LogList
                    log={log}
                  />
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          ) : (
            <Text size="md" style={{ color: 'gray' }}>No logs have been added yet</Text>
          )}


      </Skeleton>
      <LogForm
        isOpen={showLogModal}
        dismissForm={() => setShowLogModal(false)}
      />
    </>

  );
}
