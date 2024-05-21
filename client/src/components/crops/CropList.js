import React from "react";
import {
  Table,
  Group,
  Text,
  Accordion,
  Button,
  Tooltip,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

import { useNavigate } from "react-router-dom";

const CropList = (props) => {
  const {
    crop,
    showCropForm,
    showNewVarietalForm,
  } = props;

  const navigate = useNavigate();

  return (
    <Accordion.Item value={crop?.name}>
      <Accordion.Control>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <Group justify="center">
            <Tooltip label="Click to edit" openDelay={500}>
              <IconPencil onClick={showCropForm} size="1rem" stroke={2} color="black" />
            </Tooltip>
          </Group>
          <Text>{crop?.name}</Text>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        {crop?.varietals?.length > 0 ? (
          <>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Variety</Table.Th>
                  <Table.Th>Water Frequency</Table.Th>
                  <Table.Th>Fertilize Frequency</Table.Th>
                  <Table.Th>Events Logged</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {crop.varietals.map((varietal) => (
                  <Table.Tr
                    key={varietal.varietalId}
                    onClick={() => navigate(`/varietal/${varietal?.varietalId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Table.Td>{varietal?.name}</Table.Td>
                    <Table.Td>{varietal?.waterEvery || '-'} {varietal?.waterTime > 0 ? `(${varietal?.waterTime} min)` : ''}</Table.Td>
                    <Table.Td>{varietal?.fertilizeEvery || '-'}</Table.Td>
                    <Table.Td>{varietal?.events ? `${varietal?.events.length}` : '0'}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </>
        ) : (
          <>
            <Text size="sm">No varieties of {crop ? ` ${crop.name}` : 'this crop'} have been planted</Text>
          </>
        )}
        <Button onClick={() => showNewVarietalForm(crop)} variant="filled" size="xs" color="green" style={{ marginTop: '30px', marginLeft: crop?.varietals?.length > 0 ? '10px' : 0 }}>Add</Button>
      </Accordion.Panel>
    </Accordion.Item>
  )
};

export default CropList;
