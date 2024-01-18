'use client';

import { AppShell, Avatar, Burger, Drawer, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren, useEffect } from 'react';
import { CrmLogo } from '@uiComponents/crm/page/CrmLogo';
import { CrmSidebar } from '@crmComponents/page/CrmSidebar/CrmSidebar';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/notifications/styles.css';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { isNil } from 'lodash';
import { UserDrawer } from '@crmComponents/users/UserDrawer/UserDrawer';
import css from './CrmPage.module.css';

export const CrmPage: FC<PropsWithChildren> = ({
  children,
}) => {
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure( false );
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure( true );
  const [ drawerOpened, { toggle: toggleDrawer } ] = useDisclosure( false );

  const { currentUser, logout } = useAuth();
  const storeAccount = useAppSelector( selectAccount );
  const router = useRouter();
  const performLogout = async() => {
    await logout();
    router.push( '/public/login' );
  };
  const requestLogout = () => {
    performLogout();
  };

  useEffect(() => {
    if ( isNil( storeAccount.user )) {
      console.log( '### out detected', storeAccount );
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
          <Group mr="lg">
            <Avatar onClick={toggleDrawer}>
              00
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <CrmSidebar />
      </AppShell.Navbar>

      <AppShell.Main
        className={css.main}
      >
        <ModalsProvider>
          { children }
        </ModalsProvider>
      </AppShell.Main>

      {/* <CrmSidebar /> */}

      {/* <Notifications color="orange" /> */}
      <Drawer
        title="User Drawer"
        position="right"
        opened={drawerOpened}
        onClose={toggleDrawer}
        padding="md"
      >
        <UserDrawer onLogout={requestLogout} />
      </Drawer>

    </AppShell>
  );
};
