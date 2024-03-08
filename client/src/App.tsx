import '@mantine/core/styles.css';
import { AppShell, Burger, Button, Group, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Router } from './Router';
import { theme } from './theme';
import { IconHome2, IconCarrot, IconChevronRight } from '@tabler/icons-react';

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{
          height: 80
        }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <h1>Humble Hectare</h1>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavLink
            href="/"
            label="Home"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            rightSection={
              <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
          />
          <NavLink
            href="/crops"
            label="Crops"
            leftSection={<IconCarrot size="1rem" stroke={1.5} />}
            rightSection={
              <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
          />
          {/* <NavLink
            href="/data"
            label="Data"
            leftSection={<IconTable size="1rem" stroke={1.5} />}
            rightSection={
              <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
          /> */}
        </AppShell.Navbar>

        <AppShell.Main>
          <Router />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
