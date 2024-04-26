import { FC, useCallback, useEffect, useMemo } from 'react';
import { Button, Group, Loader, Select, Stack, Switch, TextInput, MultiSelect } from '@mantine/core';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isNil } from 'lodash';
import { GoCheck } from 'react-icons/go';
import { useCreateEntityMutation, useUpdateEntityMutation } from '@uiRepos/entities.repo';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { slugify } from '@uiDomain/domain.helpers';
import { TagsSelector } from '@uiComponents/tags/TagsSelector/TagsSelector';

interface IEntityModalProps {
  editMode: boolean;
  entity?: IEntity;
  onClose: () => void
}

const emptyEntity: IEntity = {
  id: '',
  slug: '',
  name: '',
  description: '',
  status: false,
};

export const EntityModal: FC<IEntityModalProps> = ({
  editMode,
  entity,
  onClose,
}) => {
  const form = useForm<IEntity>({
    initialValues: isNil( entity ) ? emptyEntity : { ...entity },
  });
  const { data: attributes } = useGetAllAttributesQuery();
  // const attributesData = useMemo(() => attributes?.map(( item: IAttribute ) => ({
  //   value: item.id,
  //   label: item.name,
  // })) || [], [ attributes ]);
  const [ performCreateEntity, createState ] = useCreateEntityMutation();
  const [ performUpdateEntity, updateState ] = useUpdateEntityMutation();

  const handleFormSubmit = useCallback( async( data: IEntity ) => {
    try {
      if ( editMode ) {
        await performUpdateEntity( data );
      } else {
        delete data?.id;
        await performCreateEntity( data );
      }
    } catch ( e: any ) {
      // eslint-disable-next-line no-console
      console.error( e.message );
    }
    onClose();
  }, [ editMode, onClose, performCreateEntity, performUpdateEntity ]);

  useEffect(() => {
    if ( createState.isUninitialized || createState.status !== 'fulfilled' ) {
      return;
    }

    notifications.show({
      title: 'Entities manger',
      message: 'The new entity has been saved.',
      withCloseButton: true,
      icon: <GoCheck size={20} />,
      radius: 'md',
    });
  }, [ createState ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>

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

          <TagsSelector
            {...form.getInputProps( 'tags' )}
          />


          <Switch
            size="md"
            mb="md"
            label="Enabled"
            checked={form.values?.status}
            {...form.getInputProps( 'status' )}
          />

          <Group justify="end" mt="md">
            {( !updateState.isLoading && !createState.isLoading ) &&
        <Button variant="outline" size="md" type="submit" leftSection={<GoCheck size={20} />}>
          {editMode && <span>Edit</span>}
          {!editMode && <span>Add</span>}
              &nbsp;Entity
        </Button>
            }
            {( updateState.isLoading || createState.isLoading ) &&
            <Loader size="md" />
            }
          </Group>

        </form>
      )}
    </Stack>
  );
};
