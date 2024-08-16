//Logs.js
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Skeleton, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

import useLogs from "../hooks/_logs/useLogs";
import LogForm from "../components/_logs/LogForm";
import { formatDate } from "../utils/DateTime";

export default function Logs() {
  const navigate = useNavigate();

  const {
    loadLogs,
    isLoading,
  } = useLogs();

  const [logs, setLogs] = useState([]);

  const [showLogModal, setShowLogModal] = useState(false);

  const handleLoadLogs = async () => {
    const logList = await loadLogs();
    if (logList) {

      //format dates and add event counts
      const listToShow = logList.map((log) => ({
        ...log,
        createdAt: formatDate(log.createdAt),
        eventCount: log.events ? log.events.length : '0'
      }))
      setLogs(listToShow);
    }
  };

  useEffect(() => {
    handleLoadLogs();
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        Cell: ({ renderedCellValue }) => (
          <Box
            className="font-semibold"
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: 'eventCount',
        header: 'Recorded Events',
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: logs,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    initialState: { showGlobalFilter: true },
    mantineSearchTextInputProps: {
      placeholder: 'Search Logs',
    },
    positionGlobalFilter: "left",
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/logs/${row.original.logId}`),
      sx: { cursor: 'pointer' },
    }),
  });

  return (
    <>
      <Skeleton visible={isLoading}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Logs</h1>
            <Text size="md" className="text-gray-400">{logs?.length > 0 ? 'Read through past journal entries' : 'No entries have been recorded yet'}</Text>
          </div>          <Group>
            <Button onClick={() => setShowLogModal(true)} color="gray" variant="outline" radius="xl" className="hover:bg-gray-100">
              <IconPlus size="1.5rem" stroke={2} />
            </Button>
          </Group>
        </div>
        {logs?.length > 0 ? (
          <MantineReactTable table={table} />
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
