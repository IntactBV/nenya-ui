'use client';

import { Button, Group, Loader, Stack, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { slugify } from '@uiDomain/domain.helpers';
import { TRealm } from '@uiDomain/types';
import { useCreateRealmMutation, useUpdateRealmMutation } from '@uiRepos/realms.repo';
import { isNil } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoCheck } from 'react-icons/go';

type TAddRealmModalProps = {
  realm?: TRealm;
  onClose: () => void;
};

const emptyEntity: TRealm = {
  id: '',
  slug: '',
  name: '',
  description: '',
  server: '',
  status: true,
};

export const AddRealmModal: FC<TAddRealmModalProps> = ({
  realm,
  onClose,
}) => {
  const { t } = useTranslation();
  const editMode = useMemo(() => !isNil( realm ), [ realm ]);
  const form = useForm<TRealm>({
    initialValues: isNil( realm )
      ? emptyEntity
      : { ...realm },
  });
  const [ performCreateRealm, createState ] = useCreateRealmMutation();
  const [ performUpdateRealm, updateState ] = useUpdateRealmMutation();
  const handleFormSubmit = useCallback( async( data: TRealm ) => {
    try {
      if ( editMode ) {
        await performUpdateRealm( data );
      } else {
        delete data?.id;
        await performCreateRealm( data );
      }
    } catch ( e: any ) {
      console.error( e.message );
    }
    onClose();
  }, [ onClose, performCreateRealm, performUpdateRealm, editMode, realm ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>

          <TextInput
            size="sm"
            mb="md"
            label={t( 'app.settings.admin.realms.modalAdd.name' )}
            placeholder={t( 'app.settings.admin.realms.modalAdd.name' )}
            {...form.getInputProps( 'name' )}
            onBlur={( e ) => {
              const slug = slugify( e.target.value );

              form.setValues({ slug });
            }}
          />

          <TextInput
            size="sm"
            mb="md"
            label={t( 'app.settings.admin.realms.modalAdd.slug' )}
            placeholder={t( 'app.settings.admin.realms.modalAdd.slug' )}
            {...form.getInputProps( 'slug' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label={t( 'app.settings.admin.realms.modalAdd.description' )}
            placeholder={t( 'app.settings.admin.realms.modalAdd.description' )}
            {...form.getInputProps( 'description' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label={t( 'app.settings.admin.realms.modalAdd.server' )}
            placeholder="https://"
            {...form.getInputProps( 'server' )}
          />

          <Switch
            size="md"
            mb="md"
            label={t( 'app.settings.admin.realms.modalAdd.enabled' )}
            checked={form.values?.status}
            {...form.getInputProps( 'status' )}
          />

          <Group justify="end" mt="md">
            {( !createState.isLoading && !updateState.isLoading ) && (
              <Button
                variant="outline"
                size="md"
                type="submit"
                leftSection={<GoCheck size={20} />}
              >
                {editMode
                  ? t( 'app.settings.admin.realms.btnEdit' )
                  : t( 'app.settings.admin.realms.btnAdd' )
                }
              </Button>
            )}
            {( createState.isLoading || updateState.isLoading ) &&
              <Loader size="md" />
            }
          </Group>

        </form>
      )}
    </Stack>
  );
};
