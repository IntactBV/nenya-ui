'use client';

import { Card, Drawer, Group, Input, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useGetAllUsersQuery } from '@uiRepos/users.repo';
import { NoData } from '@uiComponents/common/NoData';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useMemo, useState } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { notifications } from '@mantine/notifications';
import { TAccount } from '@uiDomain/types';
import { GoCheck, GoFilter } from 'react-icons/go';
import { useGetAllTenantsQuery } from '@uiRepos/tenants.repo';
import { ITenant } from '@uiDomain/domain.types';
import { isEmpty } from 'lodash';
import { UserCard } from '../UserCard/UserCard';
import { UserEditor } from '../UserEditor/UserEditor';

export const UsersScreen = () => {
  const { t } = useTranslation();
  const [ showDrawer, { toggle: toggleDrawer, close: closeDrawer } ] = useDisclosure();
  const [ selectedUser, setSelectedUser ] = useState<any>( null );
  const [ filters, setFilters ] = useState<Record<string, string>>({
    tenant: null,
    query: '',
  });
  const { data: tenants, isLoading: tenantsLoading } = useGetAllTenantsQuery();
  const tenantsOptions = useMemo(() => {
    if ( tenantsLoading ) {
      return [];
    }

    const options = tenants?.map(( tenant: ITenant ) => ({
      value: tenant.id,
      label: tenant.name,
    }));

    options?.unshift({
      value: '',
      label: 'All',
    });

    return options;
  }, [ tenants, tenantsLoading ]);

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersHasError,
    error: usersError,
  } = useGetAllUsersQuery();

  const onUserEdit = useCallback(( user: TAccount ) => () => {
    console.log( user );
    setSelectedUser( user );
    toggleDrawer();
  }, []);

  const handleSave = useCallback(( user: TAccount ) => {
    notifications.show({
      title: 'Users manger',
      message: `The user "${user.displayName}" has been removed.`,
      withCloseButton: true,
      color: 'violet',
      icon: <GoCheck size={20} />,
      radius: 'md',
      withBorder: true,
    });
    setSelectedUser( null );
    closeDrawer();
  }, []);

  const filteredUsers = useMemo(() => {
    if ( isEmpty( filters.tenant )) {
      const result = users?.filter(
        ( user: any ) => (
          user.name.includes( filters.query ) ||
          user.email.includes( filters.query
          ))
      );
      console.log( 'result', result, filters.query );
      return result;
    }

    const u = users?.filter(
      ( user: any ) => {
        const matchQuery = isEmpty( filters.query ) ||
          user.name.includes( filters.query ) ||
          user.email.includes( filters.query );

        // if ( isEmpty( user.tenantAccounts ) || isEmpty( filters.tenant )) {
        //   console.log( '### matchQuery', matchQuery, user.name );
        //   return matchQuery;
        // }

        const account = user.tenantAccounts.filter(
          ( acc: any ) => acc.tenantId === filters.tenant
        );
        console.log( 'account', account );

        return !isEmpty( account ) && matchQuery;
      });

    console.log( 'u', u );

    return u;
  }, [ users, filters.tenant, filters.query ]);

  if ( usersLoading ) {
    return <CommonPageLoader />;
  }

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

          <Card>
            <Group id="Filters">
              <GoFilter size={20} />

              <Input.Wrapper label="Search">
                <Input
                  placeholder="Search"
                  variant="filled"
                  value={filters.query}
                  onChange={( event ) => setFilters({
                    ...filters,
                    query: event.currentTarget.value,
                  })}
                />
              </Input.Wrapper>

              <Select
                data={tenantsOptions}
                placeholder={t( 'placeholders.select_tenant' )}
                label={t( 'tenant.plural' )}
                variant="filled"
                onChange={( value ) => setFilters({ ...filters, tenant: value })}
              />
            </Group>
          </Card>

          {filteredUsers?.length === 0 && (
            <NoData
              description="No users match filters"
            />
          )}

          <SimpleGrid
            cols={{ base: 1, md: 2, lg: 4, xl: 5 }}
            spacing="lg"
          >
            {filteredUsers.map(( user: any ) => (
              <UserCard
                key={user.uid}
                user={user}
                onEdit={onUserEdit}
                showDelete
                showEdit
              />
            ))}
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
        <UserEditor
          onSave={handleSave}
          account={{
            name: selectedUser?.name,
            email: selectedUser?.email,
            uid: selectedUser?.uid,
            tenantAccounts: selectedUser?.tenantAccounts || [],
            // selectedUser?.tenantAccounts.map(( acc: any ) => acc.tenantId ),
          }} />
      </Drawer>
    </Stack>
  );
};
