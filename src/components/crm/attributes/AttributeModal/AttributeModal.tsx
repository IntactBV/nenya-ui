import { FC, useCallback, useEffect } from 'react';
import { Button, Group, Loader, MultiSelect, Select, Stack, Switch, TextInput, Textarea } from '@mantine/core';
import { IAttribute } from '@uiDomain/domain.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isNil } from 'lodash';
import { GoCheck } from 'react-icons/go';
import { ATTRIBUTE_TYPES } from '@uiDomain/domain.constants';
import { useCreateAttributeMutation, useUpdateAttributeMutation } from '@uiRepos/attributes.repo';
import { EEntityFieldType } from '@uiDomain/types';
import { useTranslation } from 'react-i18next';
import { TagsSelector } from '@uiComponents/tags/TagsSelector/TagsSelector';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';

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
  fieldType: EEntityFieldType.Attribute,
};

export const AttributeModal: FC<IAttributeModalProps> = ({
  editMode,
  attribute,
  onClose,
}) => {
  const { t } = useTranslation();
  const form = useForm<IAttribute>({
    initialValues: isNil( attribute ) ? emptyAttribute : { ...attribute },
  });

  const [ performCreateAttribute, createState ] = useCreateAttributeMutation();
  const [ performUpdateAttribute, updateState ] = useUpdateAttributeMutation();

  const handleFormSubmit = useCallback( async( data: IAttribute ) => {
    try {
      data.status = !!data.status;
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

  return (
    <Stack gap="sm">
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>
          <Select
            label="Tip"
            placeholder="Tip dispozitiv"
            data={[ ...ATTRIBUTE_TYPES.map(( item: any ) => ({ value: item, label: t( `attributes.types.${item}` ) })) ]}
            {...form.getInputProps( 'type' )}
            mb="md"
            size="sm"
            searchable
          />

          <TextInput
            size="sm"
            mb="md"
            label={t( 'slug' )}
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
          
          <Textarea
            size="sm"
            mb="md"
            label="Options"
            placeholder="options"
            {...form.getInputProps( 'options' )}
          />

          <TagsSelector
            {...form.getInputProps( 'tags' )}
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
      {/* <CommonDebugger data={form.values} field="form" /> */}
    </Stack> );
};
