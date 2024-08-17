//Crops.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Group,
  Text,
  Accordion,
  Button,
  Skeleton,
  Box,
  Table,
  Tooltip,
  Title,
} from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useNavigate } from "react-router-dom";

import { formatDate, calculateNextDate } from "../utils/DateTime";
import VarietalForm from "../components/varietals/VarietalForm";
import CropForm from '../components/crops/CropForm';
import useCrops from '../hooks/crops/useCrops';
import '../styles.css';

const Crops = () => {
  const {
    loadCrops,
    isLoading,
  } = useCrops();

  // State for viewing, adding, and updating crops
  const [crops, setCrops] = useState([]);
  const [cropToShow, setCropToShow] = useState();
  const [showCropModal, setShowCropModal] = useState(false);

  // State for adding a varietal
  const [showVarietalModal, setShowVarietalModal] = useState(false);
  const [cropToAddVarietal, setCropToAddVarietal] = useState();

  const navigate = useNavigate();

  const handleLoadCrops = async () => {
    const cropList = await loadCrops();
    if (cropList) {
      const cropToShow = cropList.map((crop) => ({
        ...crop,
        varietalCount: crop.varietals ? crop.varietals.length : '0',
      }))
      setCrops(cropToShow);
    }
  };

  useEffect(() => {
    handleLoadCrops();
  }, []);

  const handleAddCrop = (newCrop) => {
    setCrops((prevCrops) => [...prevCrops, newCrop]);
  };

  const handleUpdateCrop = (cropId, updatedCrop) => {
    const updatedList = [...crops].map((crp) => (crp.cropId === cropId ? { ...crp, ...updatedCrop } : crp));
    setCrops(updatedList);
  };

  const handleDeleteCrop = (cropId) => {
    const updatedList = [...crops].filter((crp) => crp.cropId !== cropId)
    setCrops(updatedList);
  };

  const showCropForm = (_crop) => {
    setCropToShow(_crop);
    setShowCropModal(true);
  };

  const showNewVarietalForm = (_crop) => {
    setCropToAddVarietal(_crop);
    setShowVarietalModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ renderedCellValue }) => (
          <Box
            className="font-semibold"
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'varietalCount',
        header: 'Varietals Planted',
      },
      {
        accessorKey: 'edit',
        header: '',
        size: '50',
        Cell: ({ row }) => (
          <Tooltip label="Click to edit" openDelay={500}>
            <IconPencil onClick={() => showCropForm(row.original)} size="1.5rem" stroke={2} cursor='pointer' className="hover:text-gray-500 text-gray-600 rounded" />
          </Tooltip>
        ),
        grow: false,
        enableSorting: false,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: crops,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    positionExpandColumn: "first",
    initialState: {  showGlobalFilter: true },
    mantineSearchTextInputProps: {
      placeholder: "Search Crops",
    },
    positionGlobalFilter:"left",

    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        {row.original.varietals?.length > 0 ? (
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Variety</Table.Th>
                <Table.Th className="text-water">Water Frequency</Table.Th>
                <Table.Th className="text-water">Water Next</Table.Th>
                <Table.Th className="text-fertilize">Fertilize Frequency</Table.Th>
                <Table.Th className="text-fertilize">Fertilize Next</Table.Th>
                <Table.Th>Recorded Events</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {row.original.varietals.map((varietal) => (
                <Table.Tr
                  key={varietal.varietalId}
                  onClick={() => navigate(`/varietal/${varietal?.varietalId}`)}
                  className="cursor-pointer"
                >
                  <Table.Td>{varietal?.name}</Table.Td>
                  <Table.Td className="text-water">{varietal?.waterEvery || '-'}</Table.Td>
                  <Table.Td className="text-water">
                    {varietal?.waterStart && varietal.waterEvery ? `${calculateNextDate(varietal.waterStart, varietal.waterEvery)} ` : ''}
                    {varietal?.waterTime > 0 ? `(${varietal?.waterTime} min)` : '-'}
                  </Table.Td>
                  <Table.Td className="text-fertilize">{varietal?.fertilizeEvery || '-'}</Table.Td>
                  <Table.Td className="text-fertilize">
                    {varietal?.fertilizeStart && varietal.fertilizeEvery ? `${calculateNextDate(varietal.fertilizeStart, varietal.fertilizeEvery)} ` : '-'}
                  </Table.Td>
                  <Table.Td>{varietal?.events ? `${varietal?.events.length}` : '0'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <>
            <Text size="sm">No varieties of {row.original ? ` ${row.original.name}` : 'this crop'} have been planted</Text>
          </>
        )}
        <Button onClick={() => showNewVarietalForm(row.original)} variant="filled" size="xs" color="green" className="mt-4">Add</Button>
      </Box>
    ),
  });

  return (
    <>
      <Skeleton visible={isLoading}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Crops</h1>
            <Text size="md" className="text-gray-400">{crops?.length > 0 ? 'Click through each crop to see what has been planted' : 'No crops have been added yet'}</Text>
          </div>
          <Group>
            <Button onClick={() => setShowCropModal(true)} color="gray" variant="outline" radius="xl" className="hover:bg-gray-100">
              <IconPlus size="1.5rem" stroke={2} />
            </Button>
          </Group>
        </div>
        {crops?.length > 0 && (
          <MantineReactTable table={table} />
        )}
      </Skeleton>

      <CropForm
        crops={crops}
        crop={cropToShow}
        isOpen={showCropModal}
        dismissCropForm={() => {
          setCropToShow(null);
          setShowCropModal(false);
        }}
        // handlers for updating local crop state
        onAddCrop={(newCrop) => handleAddCrop(newCrop)}
        onUpdateCrop={(cropId, updatedCrop) => handleUpdateCrop(cropId, updatedCrop)}
        onDeleteCrop={(cropId) => handleDeleteCrop(cropId)}
      />

      <VarietalForm
        isOpen={showVarietalModal}
        onDismissVarietal={() => {
          setShowVarietalModal(false);
          setCropToAddVarietal(null);
        }}
        reloadCrops={handleLoadCrops}
        crop={cropToAddVarietal}
      />
    </>
  )
};

export default Crops;
