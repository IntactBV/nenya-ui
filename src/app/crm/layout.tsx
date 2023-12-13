'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren } from 'react';
import { CrmLogo } from '@uiComponents/crm/CrmLogo';
import { CrmSidebar } from '@uiComponents/crm/CrmSidebar';
import { ColorSchemeToggle } from '@uiComponents/common/ColorSchemeToggle/ColorSchemeToggle';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

const CrmLayout: FC<PropsWithChildren> = ({ children }) => {
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure( false );
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure( true );
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between">
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <CrmLogo sub="manager" />
          </Group>
          <Group>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <CrmSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <ModalsProvider>
          { children }
        </ModalsProvider>
      </AppShell.Main>
      <Notifications color="orange" />
    </AppShell>
  );
};
export default CrmLayout;
