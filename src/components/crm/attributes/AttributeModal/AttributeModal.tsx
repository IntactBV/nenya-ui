import { FC, useCallback, useEffect } from 'react';
import { Button, Group, Loader, Select, Stack, Switch, TextInput } from '@mantine/core';
import { IAttribute } from '@uiDomain/domain.types';
import { useForm } from '@mantine/form';
import { notifications, Notifications } from '@mantine/notifications';
import { isNil } from 'lodash';
import { GoCheck, GoDeviceDesktop, GoUpload } from 'react-icons/go';
import { ATTRIBUTE_TYPES } from '@uiDomain/domain.constants';
import { useCreateAttributeMutation, useUpdateAttributeMutation } from '@uiRepos/attributes.repo';
import { slugify } from '@uiDomain/domain.helpers';

interface IAttributeModalProps {
  editMode: boolean;
  attribute?: IAttribute;
  onClose: () => void
}

const emptyAttribute: IAttribute = {
  slug: '',
  name: '',
  description: '',
  type: 'text',
  options: null,
};

export const AttributeModal: FC<IAttributeModalProps> = ({
  editMode,
  attribute,
  onClose,
}) => {
  const form = useForm<IAttribute>({
    initialValues: isNil( attribute ) ? emptyAttribute : { ...attribute },
  });

  const [ performCreateAttribute, createState ] = useCreateAttributeMutation();
  const [ performUpdateAttribute, updateState ] = useUpdateAttributeMutation();

  const handleFormSubmit = useCallback( async( data: IAttribute ) => {
    try {
      if ( editMode ) {
        await performUpdateAttribute( data );
      } else {
        await performCreateAttribute({
          ...data,
          id: null,
        });
      }
    } catch ( e: any ) {
      console.error( e.message );
    }
    onClose();
  }, [ editMode, onClose, performCreateAttribute, performUpdateAttribute ]);

  useEffect(() => {
    if ( createState.isUninitialized || createState.status !== 'fulfilled' ) {
      return;
    }
    notifications.show({
      title: 'Attributes manger',
      message: 'The new attribute has been saved.',
      withCloseButton: true,
      icon: <GoCheck size={20} />,
      radius: 'md',
    });
  }, [ createState.status ]);

  useEffect(() => {
    if ( updateState.isUninitialized || updateState.status !== 'fulfilled' ) {
      return;
    }
    notifications.show({
      title: 'Attributes manger',
      message: 'The attribute has been updated.',
      withCloseButton: true,
      icon: <GoCheck size={20} />,
      radius: 'md',
    });
  }, [ updateState.status ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>
          <Select
            label="Tip"
            placeholder="Tip dispozitiv"
            data={[ ...ATTRIBUTE_TYPES ]}
            {...form.getInputProps( 'type' )}
            mb={1}
            size="sm"
          />

          <TextInput
            size="sm"
            mb="md"
            label="Name"
            placeholder="name"
            {...form.getInputProps( 'name' )}
            onBlur={( e: any ) => {
              form.setValues({
                slug: slugify( e.target.value ),
              });
            }}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Slug"
            placeholder="slug"
            readOnly={editMode}
            disabled={editMode}
            {...form.getInputProps( 'slug' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Description"
            placeholder="description"
            {...form.getInputProps( 'description' )}
          />

          <Switch size="md" label="Enabled" checked={form.values?.status} {...form.getInputProps( 'status' )} />

          <Group justify="right" mt="md">
            {( !updateState.isLoading && !createState.isLoading ) &&
        <Button variant="outline" size="md" type="submit" leftSection={<GoCheck size={20} />}>
          {editMode && <span>Edit</span>}
          {!editMode && <span>Add</span>}
              &nbsp;Attribute
        </Button>
            }
            {( updateState.isLoading || createState.isLoading ) &&
            <Loader size="md" />
            }
          </Group>
        </form>
      )}
    </Stack> );
};
