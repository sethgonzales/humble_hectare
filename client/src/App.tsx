//App.tsx
import '@mantine/core/styles.css';
import { AppShell, Burger, Card, Center, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Router } from './Router';
import { theme } from './theme';
import { IconHome2, IconCarrot, IconChevronRight, IconList } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import '@mantine/dates/styles.css';
import { useState } from 'react';

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);
  const currentPath = window.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === path;
    } else {
      return currentPath.includes(path)
    }
  }

  const links = [
    { icon: IconHome2, label: 'Home', path: '/' },
    { icon: IconCarrot, label: 'Crops', path: '/crops' },
    { icon: IconList, label: 'Logs', path: '/logs' },
  ];


  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 90 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        className='bg-primary'
        padding="md"
      >
        {/* ----- HEADER ----- */}
        <AppShell.Header className='flex overflow-hidden bg-secondary border-none p-1'>
          <div className='flex text-center items-center pl-3'>
            <h1 className='text-theme-100 text-3xl font-semibold italic'>Humble Hectare</h1>
          </div>
          <Center>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          </Center>
        </AppShell.Header>
        {/* ----- NAVBAR ----- */}
        <AppShell.Navbar className='border-none bg-primary pt-4 p-2' >
          {links.map((link) => (
            <NavLink
              href={link.path}
              key={link.label}
              label={link.label}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              leftSection={<link.icon size="1.5rem" stroke={2} />}
              className={`pl-4 rounded-sm text-theme-700 hover:text-black hover:bg-secondary ${isActive(link.path) ? 'bg-secondary text-theme-900 font-semibold' : ''}`}
            />
          ))}
        </AppShell.Navbar>
        {/* ----- BODY ----- */}
        <AppShell.Main>
          <Card shadow="sm" padding="xl" radius="lg" withBorder>
            <Router />
          </Card>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
