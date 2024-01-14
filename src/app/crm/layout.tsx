'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren, useEffect } from 'react';
import { CrmLogo } from '@uiComponents/crm/CrmLogo';
import { CrmSidebar } from '@uiComponents/crm/CrmSidebar';
import { ColorSchemeToggle } from '@uiComponents/common/ColorSchemeToggle/ColorSchemeToggle';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { isNil } from 'lodash';

const CrmLayout: FC<PropsWithChildren> = ({ children }) => {
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure( false );
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure( true );

  const { currentUser, logout } = useAuth();
  const storeAccount = useAppSelector( selectAccount );
  const router = useRouter();

  useEffect(() => {
    console.log( '### storeAccount: ', storeAccount.user, currentUser );

    const performLogout = async() => {
      console.log( 'firebase logout' );
      await logout();
      router.push( '/public/login' );
      console.log( 'firebase loggedout' );
    };

    if ( isNil( storeAccount.user )) {
      console.log( 'out detected' );
      performLogout();
    }
  }, [ storeAccount.email ]);

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
