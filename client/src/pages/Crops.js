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
        accessorKey: 'edit',
        header: '',
        size: '50',
        Cell: ({ row }) => (
          <Tooltip label="Click to edit" openDelay={500}>
            <IconPencil onClick={() => showCropForm(row.original)} size="1rem" stroke={2} color="black" cursor='pointer' />
          </Tooltip>
        ),
        grow: false,
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'varietalCount',
        header: 'Varietals Planted',
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
    positionExpandColumn: "last",

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
                <Table.Th style={{ color: '#4B6EF5' }}>Water Frequency</Table.Th>
                <Table.Th style={{ color: '#4B6EF5' }}>Water Next</Table.Th>
                <Table.Th style={{ color: '#14B885' }}>Fertilize Frequency</Table.Th>
                <Table.Th style={{ color: '#14B885' }}>Fertilize Next</Table.Th>
                <Table.Th>Recorded Events</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {row.original.varietals.map((varietal) => (
                <Table.Tr
                  key={varietal.varietalId}
                  onClick={() => navigate(`/varietal/${varietal?.varietalId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Table.Td>{varietal?.name}</Table.Td>
                  <Table.Td style={{ color: '#4B6EF5' }}>{varietal?.waterEvery || '-'}</Table.Td>
                  <Table.Td style={{ color: '#4B6EF5' }}>
                    {varietal?.waterStart && varietal.waterEvery ? `${calculateNextDate(varietal.waterStart, varietal.waterEvery)} ` : ''}
                    {varietal?.waterTime > 0 ? `(${varietal?.waterTime} min)` : '-'}
                  </Table.Td>
                  <Table.Td style={{ color: '#14B885' }}>{varietal?.fertilizeEvery || '-'}</Table.Td>
                  <Table.Td style={{ color: '#14B885' }}>
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
        <Button onClick={() => showNewVarietalForm(row.original)} variant="filled" size="xs" color="green" style={{ marginTop: '20px', marginLeft: '10px' }}>Add</Button>
      </Box>
    ),
  });

  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Crops</h1>
          <Group>
            <Button onClick={() => setShowCropModal(true)} color="gray" variant="outline" radius="xl">
              <IconPlus size="1.5rem" stroke={2} color="black" />
            </Button>
          </Group>
        </div>
        <Text size="md" style={{ color: 'gray' }}>{crops?.length > 0 ? 'Click through each crop to see what has been planted' : 'No crops have been added yet'}</Text>
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
