'use client';

import { AppShell, Avatar, Badge, Burger, Drawer, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren, useEffect } from 'react';
import { CrmLogo } from '@uiComponents/crm/page/CrmLogo';
import { CrmSidebar } from '@crmComponents/page/CrmSidebar/CrmSidebar';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/notifications/styles.css';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { isNil } from 'lodash';
import { UserDrawer } from '@crmComponents/users/UserDrawer/UserDrawer';
import { accountLogout } from '@uiStore/features/account/account.slice';
import css from './CrmPage.module.css';

export const CrmPage: FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const [ mobileOpened, { toggle: toggleMobile } ] = useDisclosure( false );
  const [ desktopOpened, { toggle: toggleDesktop } ] = useDisclosure( true );
  const [ drawerOpened, { toggle: toggleDrawer, close: closeDrawer } ] = useDisclosure( false );

  const { logout } = useAuth();
  const storeAccount = useAppSelector( selectAccount );
  const router = useRouter();
  const performLogout = async() => {
    await logout();
    router.push( '/public/login' );
  };
  const requestLogout = async() => {
    await performLogout();
    dispatch( accountLogout());
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
            <CrmLogo sub={storeAccount.tenant.role} />
          </Group>
          <Group mr="lg">
            <Badge variant="dot">
              {storeAccount.tenant.role}
            </Badge>

            <Avatar onClick={toggleDrawer} color="#f99000">
              {storeAccount.user?.displayName?.split( ' ' ).map( i => i[ 0 ]) || '00' }
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <CrmSidebar />
        {/* Sidebar */}
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
        title={storeAccount.user?.displayName}
        position="right"
        opened={drawerOpened}
        onClose={toggleDrawer}
        padding="md"
      >
        <UserDrawer
          onLogout={requestLogout}
          onClose={closeDrawer}
        />
      </Drawer>

    </AppShell>
  );
};
