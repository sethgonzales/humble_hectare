//App.tsx
import '@mantine/core/styles.css';
import { AppShell, Burger, Center, Group, MantineProvider, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Router } from './Router';
import { theme } from './theme';
import { IconHome2, IconCarrot, IconChevronRight } from '@tabler/icons-react';
import Logo from './img/logo.png'
import '@mantine/dates/styles.css';

export default function App() {
  // const [opened, { toggle }] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      {/* // todo: add alt styling for smaller screens on header */}
      <AppShell
        header={{ height: 120 }}
        navbar={{
          width: 150,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >

        <AppShell.Header style={{ overflow: 'hidden', border: 'none', background: '#d3ecbc', display: 'flex', alignContent: 'center', paddingLeft: '1.5rem' }}>
          <Center>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Group style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: '1.5rem' }}>
              <h1>Humble Hectare</h1>
              <img src={Logo} alt="Humble Hectare Logo" style={{ width: 'auto', height: '8rem', marginLeft: 10 }} />
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
        </AppShell.Navbar>

        <AppShell.Main>
          <Router />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
