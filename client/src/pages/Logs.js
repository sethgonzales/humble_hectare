//Logs.js
import { useState } from "react";
import { Accordion, Button, Group, Skeleton, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Logs() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Skeleton visible={isLoading}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Logs</h1>
          <Group>
            <Button color="gray" variant="outline" radius="xl">
              <IconPlus size="1.5rem" stroke={2} color="black" />
            </Button>
          </Group>
        </div>
        <Text size="md" style={{ color: 'gray' }}>No logs have been added yet</Text>
        <Accordion chevronPosition="right" variant="contained">
        </Accordion>
      </Skeleton>
    </>
  );
}
