import { Button, Drawer, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { FC, useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetTenantUsersQuery } from '@uiRepos/tenants.repo';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { UserCard } from '@crmComponents/users/UserCard/UserCard';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { useDisclosure } from '@mantine/hooks';
import { UserEditor } from '@crmComponents/users/UserEditor/UserEditor';
import { notifications } from '@mantine/notifications';
import { GoCheck, GoPlus } from 'react-icons/go';
import { TAccount } from '@uiDomain/types';
import { useTranslation } from 'react-i18next';

export const TenantUsersTab: FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { data: tenantUsers, isLoading: tuLoading } = useGetTenantUsersQuery( params.tenantId );
  const [ showDrawer, { toggle: toggleDrawer, close: closeDrawer } ] = useDisclosure();
  const [ selectedUser, setSelectedUser ] = useState<any>( null );

  const onUserEdit = useCallback(( user: TAccount ) => () => {
    console.log( user );
    setSelectedUser( user );
    toggleDrawer();
  }, []);

  const handleSave = useCallback(( user: TAccount ) => {
    notifications.show({
      title: 'Users manger',
      message: `The user "${user.name}" has been saved.`,
      withCloseButton: true,
      color: 'violet',
      icon: <GoCheck size={20} />,
      radius: 'md',
      withBorder: true,
    });
    setSelectedUser( null );
    closeDrawer();

    // @TODO: invalidate tenant users on user update
    if ( typeof window !== 'undefined' ) {
      window.location.reload();
    }
  }, []);

  if ( tuLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title>{t( 'tenant.users' )}</Title>
        <Button onClick={toggleDrawer} variant="gradient" leftSection={<GoPlus size={20} />}>
          {t( 'user.add' )}
        </Button>
      </Group>
      Tenant users {JSON.stringify( params )}
      {/* <CommonDebugger data={tenantUsers} field="tenant users" /> */}

      <SimpleGrid
        cols={{ base: 1, md: 2, lg: 4, xl: 5 }}
        spacing="lg"
      >

        {tenantUsers?.map(( user: any ) => (
          <UserCard key={user.uid} user={user} onEdit={onUserEdit} showEdit />
        ))}
      </SimpleGrid>

      <Drawer opened={showDrawer} onClose={toggleDrawer} size="md" padding="md" title={t( 'user.singular' )} position="right">
        <UserEditor
          onSave={handleSave}
          account={selectedUser}
          tenantId={params.tenantId as string}
        />
      </Drawer>

    </Stack>
  );
};
