//App.tsx
import '@mantine/core/styles.css';
import { AppShell, Burger, Center, Group, MantineProvider, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Router } from './Router';
import { theme } from './theme';
import { IconHome2, IconCarrot, IconChevronRight } from '@tabler/icons-react';
import Logo from './img/logo.png'

export default function App() {
  // const [opened, { toggle }] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>

      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 150,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >

        <AppShell.Header style={{ overflow: 'hidden', border: 'none', background: '#d3ecbc', display: 'flex', alignContent: 'center' }}>
          <Center>
            <Group>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              {/* // todo: add alt styling for smaller screens on header */}
              <img src={Logo} alt="Humble Hectare Logo" style={{ width: 'auto', height: '4rem', marginLeft: 20 }} />
              <h2>Humble Hectare</h2>
            </Group>
          </Center>
        </AppShell.Header>

        <AppShell.Navbar style={{ padding: '0.5rem' }}>
          <NavLink
            href="/"
            label="Home"
            leftSection={<IconHome2 size="1.5rem" stroke={2} />}
            rightSection={
              <IconChevronRight size="1rem" stroke={2} className="mantine-rotate-rtl" />
            }
          />
          <NavLink
            href="/crops"
            label="Crops"
            leftSection={<IconCarrot size="1.5rem" stroke={2} />}
            rightSection={
              <IconChevronRight size="1rem" stroke={2} className="mantine-rotate-rtl" />
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
