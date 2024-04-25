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
      <AppShell
        // header={{ height: 50 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >

        <AppShell.Header style={{ overflow: 'hidden', display: 'flex', background: 'transparent', border: 'none', padding: '1rem' }}>
          <Center>
            <Burger style={{ background: 'white' }} opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            {/* <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" /> */}
          </Center>
        </AppShell.Header>

        <AppShell.Navbar style={{ padding: '0.5rem', background: '#d3ecbc' }}>
          <div style={{ textAlign: "center", fontSize: "larger", color: 'black', border: 'solid', borderRadius: '8rem', background: 'white', marginBottom: '1rem', marginTop: '1rem' }}>
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
        </AppShell.Navbar>

        <AppShell.Main>
          <Router />
          <div style={{ textAlign: "center" }}>
            <img src={Logo} alt="Humble Hectare Logo" style={{ width: '8rem', height: 'auto', marginTop: '3rem' }} />
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
