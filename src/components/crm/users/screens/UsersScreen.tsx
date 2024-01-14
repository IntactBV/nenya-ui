'use client';

import { SimpleGrid, Stack } from '@mantine/core';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useGetAllUsersQuery } from '@uiRepos/users.repo';
import { NoData } from '@uiComponents/common/NoData';
import { UserCard } from '../UserCard/UserCard';

export const UsersScreen = () => {
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
            title="Users"
            description="List of users"
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
          description="No userss found"
        />
      )}
    </Stack>
  );
};
