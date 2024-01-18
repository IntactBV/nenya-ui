'use client';

import { Drawer, SimpleGrid, Stack } from '@mantine/core';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useGetAllUsersQuery } from '@uiRepos/users.repo';
import { NoData } from '@uiComponents/common/NoData';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { UserCard } from '../UserCard/UserCard';
import { UserEditor } from '../UserEditor/UserEditor';

export const UsersScreen = () => {
  const { t } = useTranslation();
  const [ showDrawer, { toggle: toggleDrawer } ] = useDisclosure();
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersHasError,
    error: usersError,
  } = useGetAllUsersQuery();

  return (
    <Stack>
      {users?.length > 0 && (
        <>
          <PageHeader
            title={t( 'user.plural' )}
            description="List of users"
            buttonLabel={t( 'buttons.add_user' )}
            buttonClickHandler={toggleDrawer}
          />

          <SimpleGrid
            cols={3}
            spacing="lg"
            // breakpoints={[
            //   { maxWidth: '86rem', cols: 2, spacing: 'md' },
            //   { maxWidth: '64rem', cols: 1, spacing: 'sm' },
            // ]}
          >
            {users.map(( user: any ) => ( <UserCard key={user.uid} user={user} /> ))}
          </SimpleGrid>
        </>
      )}
      {users?.length === 0 && (
        <NoData
          buttonLabel="Add the first tenant"
          description="No users found"
        />
      )}

      <Drawer opened={showDrawer} onClose={toggleDrawer} size="md" padding="md" title={t( 'user.singular' )} position="right">
        <UserEditor />
      </Drawer>
    </Stack>
  );
};
