//App.tsx
import '@mantine/core/styles.css';
import { AppShell, Burger, Card, Center, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Router } from './Router';

import { theme } from './theme';
import { IconHome2, IconCarrot, IconChevronRight, IconList } from '@tabler/icons-react';
// import Logo from './img/logo.png'
import '@mantine/dates/styles.css';

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        // header={{ height: 0 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >

        <AppShell.Header style={{ overflow: 'hidden', display: 'flex', background: 'transparent', border: 'none', padding: '1rem' }}>
          <Center>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          </Center>
        </AppShell.Header>

        <AppShell.Navbar style={{ background: '#d2e0c8', border: 'none' }} >
          <div style={{ textAlign: "center", fontSize: "larger", color: 'black', borderRadius: '4rem', background: 'white', margin: '1rem' }}>
            <h1>Humble Hectare</h1>
          </div>
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
          <NavLink
            href="/logs"
            label="Logs"
            leftSection={<IconList size="1.5rem" stroke={2} />}
            rightSection={
              <IconChevronRight size="1rem" stroke={2} className="mantine-rotate-rtl" />
            }
          />
        </AppShell.Navbar>
        <AppShell.Main style={{ background: '#d2e0c8' }}>
          <Card shadow="sm" padding="xl" radius="lg" withBorder>
            <Router />
          </Card>
          {/* <div style={{ textAlign: "center" }}>
            <img src={Logo} alt="Humble Hectare Logo" style={{ width: '8rem' }} />
          </div> */}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
