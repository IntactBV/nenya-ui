import { Button, Loader, Select, Stack, TextInput } from '@mantine/core';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTenantUsersQuery } from '@uiRepos/tenants.repo';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { modals } from '@mantine/modals';
import { UserEditor } from '@crmComponents/users/UserEditor/UserEditor';
import { TFormRendererProps } from './form.types';

export const UserRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { t } = useTranslation();
  const account = useAppSelector( selectAccount );
  const {
    data: users,
    isLoading: usersLoading,
  } = useGetTenantUsersQuery( account.tenant.tenantId );
  const usersOptions = useMemo(() => users?.map(( user: any ) => ({
    value: user.uid,
    label: user.name,
  })), [ users ]);

  const handleUserSave = useCallback(() => {
    modals.closeAll();
  }, []);

  const handleAddUser = useCallback(() => {
    modals.open({
      id: 'employeeUser',
      title: `${t( 'buttons.add' )} ${t( 'attributes.names.user' )}`,
      children: (
        <UserEditor
          onSave={handleUserSave}
          tenantId={account.tenant.tenantId}
        />
      ),
    });
  }, []);

  if ( usersLoading ) {
    return <Loader size="sm" />;
  }

  return (
    <Stack gap="sm">
      <Select
        label={t( `attributes.names.${attribute.slug}` )}
        placeholder={t( `attributes.names.${attribute.slug}` )}
        data={usersOptions}
        {...props}
      />
      <span>
        <Button variant="subtle" onClick={handleAddUser}>Adaug utilizator</Button>
      </span>
    </Stack>
  );
};
