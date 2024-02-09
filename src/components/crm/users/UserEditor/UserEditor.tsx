'use client';

import { ActionIcon, Button, Card, Group, Loader, MultiSelect, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { ITenant } from '@uiDomain/domain.types';
import { TAccount } from '@uiDomain/types';
import { useGetAllTenantsQuery } from '@uiRepos/tenants.repo';
import { useCreateUserMutation, useUpdateUserMutation } from '@uiRepos/users.repo';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { EAccountRoles } from '@uiStore/features/account/account.types';
import { useAppSelector } from '@uiStore/hooks';
import { isEmpty, isNil } from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoTrash } from 'react-icons/go';
import { useDisclosure } from '@mantine/hooks';
import { UserAssignTenantCard } from './UserAssignTenantCard';

type TUserEditorProps = {
  tenantId?: string;
  account?: TAccount;
  onSave?: ( user: any ) => void;
};

const emptyAccount: TAccount = {
  uid: '',
  email: '',
  name: '',
  tenantIds: [],
  role: EAccountRoles.VISITOR,
  status: false,
  avatar: '',
  password: '123456',
  tenantAccounts: [],
};

export const UserEditor: FC<TUserEditorProps> = ({
  tenantId,
  account,
  onSave,
}) => {
  const { t } = useTranslation();
  const userAccount = useAppSelector( selectAccount );
  const [ accounts, setAccounts ] = useState<any>( account?.tenantAccounts || []);
  const editMode = useMemo(() => !!account, [ account ]);
  const { data: tenants, isLoading: tenantsLoading } = useGetAllTenantsQuery();
  const [ performCreateUser, createStatus ] = useCreateUserMutation();
  const [ performUpdateUser, updateStatus ] = useUpdateUserMutation();
  const [ showAssignTenant, { toggle, close: closeAssignCard } ] = useDisclosure( false );
  const tenantsOptions = useMemo(() => {
    if ( tenantsLoading ) {
      return [];
    }

    return tenants?.map(( tenant: ITenant ) => ({
      value: tenant.id,
      label: tenant.name,
    }));
  }, [ tenants, tenantsLoading ]);
  const rolesOptions = useMemo(() => {
    const options = [ {
      value: EAccountRoles.ADMIN,
      label: t( `roles.${EAccountRoles.ADMIN}` ),
    }, {
      value: EAccountRoles.EDITOR,
      label: t( `roles.${EAccountRoles.EDITOR}` ),
    }, {
      value: EAccountRoles.OPERATOR,
      label: t( `roles.${EAccountRoles.OPERATOR}` ),
    }, {
      value: EAccountRoles.AGENT,
      label: t( `roles.${EAccountRoles.AGENT}` ),
    }, {
      value: EAccountRoles.VISITOR,
      label: t( `roles.${EAccountRoles.VISITOR}` ),
    } ];

    if ( userAccount.tenant.role === EAccountRoles.APP_ADMIN ) {
      options.unshift({
        value: EAccountRoles.APP_ADMIN,
        label: t( `roles.${EAccountRoles.APP_ADMIN}` ),
      });
    }
    return options;
  }, []);

  const form = useForm({
    initialValues: isNil( account )
      ? { ...emptyAccount }
      : {
        email: account.email,
        name: account.name,
        role: account.role?.toLowerCase() || '',
      },
  });

  const onFormSubmit = useCallback( async( data: any ) => {
    console.log( 'data', data );
    let result = null;
    if ( editMode ) {
      const updateParams = {
        uid: account?.uid,
        name: data.name,
        email: data?.email,
        role: data?.role,
        tenantId,
        tenantAccounts: accounts,
      };
      console.debug( 'updateParams', updateParams );
      result = performUpdateUser( updateParams );
    } else {
      if ( !isNil( tenantId )) {
        data.tenantIds = [ tenantId ];
      }
      result = await performCreateUser( data );
    }
    console.log( 'result', result );
    onSave( data );
  }, [
    account,
    editMode,
    onSave,
    performCreateUser,
    performUpdateUser,
    tenantId,
    accounts,
  ]);

  const newTenanantsOptions = useMemo(() => tenantsOptions?.filter(( tenant: any ) => {
    const found = accounts?.find(( acc: any ) => acc.tenantId === tenant.value );
    return isNil( found );
  }), [ tenantsOptions, accounts ]);

  const handleAssignTenant = useCallback(( tenant: any ) => {
    console.log( 'assign tenant', tenant );
    const tOption = tenantsOptions.find(( tn: any ) => tn.value === tenant.tenantId );

    tenant.tenantName = tOption.label;

    setAccounts(( prev: any ) => [ ...prev, tenant ]);
    closeAssignCard();
  }, [ accounts, tenantsOptions ]);

  return (
    <form onSubmit={form.onSubmit( onFormSubmit )}>
      <Stack gap="md">
        {( !editMode && isNil( tenantId )) && (
          <MultiSelect
            data={tenantsOptions}
            placeholder={t( 'placeholders.select_tenant' )}
            label={t( 'tenant.plural' )}
            variant="filled"
            withAsterisk
            {...form.getInputProps( 'tenantIds' )}
          />
        )}

        <TextInput
          size="md"
          variant="filled"
          label={t( 'name' )}
          placeholder="John Doe"
          {...form.getInputProps( 'name' )}
          onBlur={( e: any ) => {
            form.setValues({
              name: e.target.value,
            });
          }}
        />

        <TextInput
          size="md"
          variant="filled"
          label={t( 'email' )}
          placeholder="hello@gmail.com"
          {...form.getInputProps( 'email' )}
          onBlur={( e: any ) => {
            form.setValues({
              email: e.target.value,
            });
          }}
        />

        {!editMode && (
          <TextInput
            size="md"
            variant="filled"
            type="password"
            label={t( 'password' )}
            placeholder="123456 :)"
            {...form.getInputProps( 'password' )}
            onBlur={( e: any ) => {
              form.setValues({
                password: e.target.value,
              });
            }}
          />
        )}

        {( !editMode || !isNil( account.role )) && (
          <Select
            size="md"
            variant="filled"
            label={t( 'role' )}
            placeholder={t( 'placeholders.select_role' )}
            data={rolesOptions}
            {...form.getInputProps( 'role' )}
          />
        )}

        {( editMode && isNil( tenantId )) && (
          <Stack gap="md">
            <Text>{t( 'tenant.plural' )}</Text>
            {accounts?.map(( acc: any ) => (
              <Card key={acc.tenantId} radius={10} className="ndCard">
                <Group justify="space-between">
                  <Title order={4}>
                    {acc.tenantName}
                  </Title>
                  <ActionIcon variant="subtle">
                    <GoTrash
                      size={16}
                      onClick={() => {
                        setAccounts(( prev: any ) => prev.filter(
                          ( a: any ) => a.tenantId !== acc.tenantId )
                        );
                      }} />
                  </ActionIcon>
                </Group>
                {acc.role}
              </Card>
            ))}
            {( !isEmpty( newTenanantsOptions ) && showAssignTenant ) && (
              <UserAssignTenantCard
                tenantsOptions={newTenanantsOptions}
                rolesOptions={rolesOptions}
                onSaved={handleAssignTenant}
              />
            )}
          </Stack>
        )}

        <Group justify="space-between" mt="md">
          <span>
            {isEmpty( tenantId ) && (
              <Button
                variant="subtle"
                onClick={toggle}
              >
              Assing New Tenant
              </Button>
            )}
          </span>

          {( !createStatus.isLoading && !updateStatus.isLoading ) && <Button type="submit">{editMode ? 'Edit' : 'Add'}</Button>}
          {( createStatus.isLoading || updateStatus.isLoading ) && <Loader variant="oval" />}
        </Group>
      </Stack>
      {/* <pre>
        tenant: {tenantId}<br />
        form: {JSON.stringify( form, null, 2 )}<br />
        account: {JSON.stringify( account, null, 2 )}
      </pre> */}
    </form>
  );
};
