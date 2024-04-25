'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { Button, Group, Loader, Select, Stack, Switch, TextInput, MultiSelect } from '@mantine/core';
import { ITenant } from '@uiDomain/domain.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isNil } from 'lodash';
import { GoCheck } from 'react-icons/go';
import { slugify } from '@uiDomain/domain.helpers';
import { useCreateTenantMutation } from '@uiRepos/tenants.repo';
import { useTranslation } from 'react-i18next';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { useGetAllRealmsQuery } from '@uiRepos/realms.repo';

interface IAddTenantModalProps {
  tenant?: ITenant;
  onClose: () => void
}

const emptyEntity: ITenant = {
  id: '',
  slug: '',
  name: '',
  description: '',
  status: true,
  color: '',
  logo: '',
  realm: '',
};

export const AddTenantModal: FC<IAddTenantModalProps> = ({
  tenant,
  onClose,
}) => {
  const { t } = useTranslation();
  const editMode = useMemo(() => !isNil( tenant ), [ tenant ]);
  const form = useForm<ITenant>({
    initialValues: editMode ? emptyEntity : tenant,
  });
  const { data: realms, isLoading: realmsLoading } = useGetAllRealmsQuery();
  const [ performCreateTenant, createState ] = useCreateTenantMutation();

  const handleFormSubmit = useCallback( async( data: ITenant ) => {
    try {
      delete data?.id;
      await performCreateTenant( data );
    } catch ( e: any ) {
      console.error( e.message );
    }
    onClose();
  }, [ onClose, performCreateTenant ]);

  useEffect(() => {
    if ( createState.isUninitialized || createState.status !== 'fulfilled' ) {
      return;
    }
    notifications.show({
      title: 'Tenants manger',
      message: 'The new tenant has been saved.',
      withCloseButton: true,
      icon: <GoCheck size={20} />,
      radius: 'md',
    });
  }, [ createState ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>

          {realmsLoading && <Loader size="md" />}
          {!realmsLoading && (
            <Select
              mb="md"
              data={realms.map(( m:any ) => ({
                label: m.name,
                value: m.id,
              }))}
              placeholder="Realm"
              label="Realm"
              {...form.getInputProps( 'realm' )}
            />
          )}

          <TextInput
            size="sm"
            mb="md"
            label="Name"
            placeholder="name"
            {...form.getInputProps( 'name' )}
            onBlur={( e ) => {
              const slug = slugify( e.target.value );

              form.setValues({ slug });
            }}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Slug"
            placeholder="slug"
            {...form.getInputProps( 'slug' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Description"
            placeholder="description"
            {...form.getInputProps( 'description' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label={t( 'logo' )}
            placeholder="https://"
            {...form.getInputProps( 'logo' )}
          />

          <Select
            size="sm"
            mb="md"
            label={t( 'color' )}
            placeholder="color"
            data={[
              { value: 'red', label: 'Red' },
              { value: 'green', label: 'Green' },
              { value: 'blue', label: 'Blue' },
              { value: 'violet', label: 'Violet' },
              { value: 'orange', label: 'Orange' },
            ]}
            {...form.getInputProps( 'color' )}
          />

          <Switch
            size="md"
            mb="md"
            label="Enabled"
            checked={form.values?.status}
            {...form.getInputProps( 'status' )}
          />

          <Group justify="end" mt="md">
            {( !createState.isLoading ) &&
        <Button variant="outline" size="md" type="submit" leftSection={<GoCheck size={20} />}>
          Add Tenant
        </Button>
            }
            {( createState.isLoading ) &&
            <Loader size="md" />
            }
          </Group>

        </form>
      )}
    </Stack>
  );
};
