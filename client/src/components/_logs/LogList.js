import React from "react";
import {
  Table,
} from '@mantine/core';
import { formatDate } from "../../utils/DateTime";

const LogList = (props) => {
  const {
    log,
  } = props;

  return (
    <>
      <Table.Td>{log?.title}</Table.Td>
      <Table.Td>{log.events ? `${log?.events.length}` : '0'}</Table.Td>
      <Table.Td>{log.createdAt ? formatDate(log.createdAt) : '-'}</Table.Td>
    </>
  )
};

export default LogList;
