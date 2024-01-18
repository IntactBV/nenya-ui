'use client';

import { Button, Group, MultiSelect, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IEntity } from '@uiDomain/domain.types';
import { EAccountRoles, TAccount } from '@uiDomain/types';
import { useGetAllTenantsQuery } from '@uiRepos/tenants.repo';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TUserEditorProps = {
  tenantId?: string;
  account: TAccount;
};

const emptyAccount: TAccount = {
  email: '',
  name: '',
  tenantId: '',
  role: EAccountRoles.VISITOR,
  status: false,
  avatar: '',
};

export const UserEditor: FC<TUserEditorProps> = ({
  tenantId,
  account,
}) => {
  const { t } = useTranslation();
  const editMode = useMemo(() => !!tenantId, [ tenantId ]);
  const { data: tenants, isLoading: tenantsLoading } = useGetAllTenantsQuery();
  const tenantsOptions = useMemo(() => {
    if ( tenantsLoading ) {
      return [];
    }

    return tenants?.map(( tenant ) => ({
      value: tenant.id,
      label: tenant.name,
    }));
  }, [ tenants, tenantsLoading ]);
  const rolesOptions = useMemo(() => [ {
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
  } ], []);

  const form = useForm({
    initialValues: editMode
      ? { ...account }
      : { ...emptyAccount },
  });

  const onFormSubmit = ( data: any ) => {
    console.log( 'data', data );
  };

  return (
    <form onSubmit={form.onSubmit( onFormSubmit )}>
      <Stack gap="md">

        <MultiSelect
          data={tenantsOptions}
          placeholder={t( 'placeholders.select_tenant' )}
          label={t( 'tenant.plural' )}
          variant="filled"
          withAsterisk
          {...form.getInputProps( 'entityIds' )}
        />

        <Select
          size="md"
          variant="filled"
          label={t( 'role' )}
          placeholder={t( 'placeholders.select_role' )}
          data={rolesOptions}
          {...form.getInputProps( 'role' )}
          onBlur={( e: any ) => {
            form.setValues({
              role: e.target.value,
            });
          }}
        />

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

        <Group justify="flex-end" mt="md">
          <Button type="submit">{editMode ? 'Edit' : 'Add'}</Button>
        </Group>
      </Stack>
      {/* <pre>form: {JSON.stringify( form, null, 2 )}</pre> */}
    </form>
  );
};
