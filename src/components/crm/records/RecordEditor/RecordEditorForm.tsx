'use client';

import { FC, useMemo } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Stack } from '@mantine/core';
import * as formRenderers from '@crmComponents/renderers/form';
import { capitalize, isNull } from 'lodash';
import { TEntityAttribute } from '@uiDomain/types';
import { RecordEditorEntitySelector } from './RecordEditorEntitySelector';

type TRecordEditorFormProps = {
  attributes: TEntityAttribute[],
  entities?: any[],
  moduleId: string,
  record: Record<string, string> | null,
  onFormSubmit: ( data: any ) => void
};

export const RecordEditorForm: FC<TRecordEditorFormProps> = ({
  attributes,
  entities,
  moduleId,
  record,
  onFormSubmit,
}) => {
  const editMode = !isNull( record );
  const form = useForm({
    initialValues: editMode
      ? { ...record }
      : attributes.reduce(( acc: any, attr ) => {
        acc[ attr.slug ] = '';
        return acc;
      }, {}),
  });

  const formControls = useMemo(() => attributes.map(( attr: TEntityAttribute ) => {
    const rendererName = `${capitalize( attr.type || 'entity' )}Renderer`;
    const AttributeRenderer: any = ( formRenderers as Record<string, any> )[ rendererName ];

    if ( attr.slug === 'avatar' ) {
      return null;
    }

    return (
      <AttributeRenderer
        key={attr.slug}
        attribute={attr}
        // form={form}
        props={form.getInputProps( attr.slug )}
      />
    );
  }), [ attributes, form, formRenderers ]);

  return (
    <form onSubmit={form.onSubmit( onFormSubmit )}>
      <Stack>
        {formControls}
        {/* {entities && entities.map(( entity: any ) => (
          <RecordEditorEntitySelector
            key={entity.id}
            entity={entity}
            moduleId={moduleId}
            props={form.getInputProps( entity.slug )}
          />
        ))} */}
        <Group justify="flex-end" mt="md">
          <Button type="submit">{editMode ? 'Edit' : 'Add'}</Button>
        </Group>
      </Stack>
      {/* <pre>form: {JSON.stringify( form, null, 2 )}</pre> */}
    </form>
  );
};
