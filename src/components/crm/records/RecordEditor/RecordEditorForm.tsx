'use client';

import { FC, useMemo } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Stack } from '@mantine/core';
import * as formRenderers from '@crmComponents/renderers/form';
import { capitalize } from 'lodash';
import { TEntityAttribute } from '@uiDomain/types';

type TRecordEditorFormProps = {
  attributes: TEntityAttribute[],
  onFormSubmit: ( data: any ) => void
};

export const RecordEditorForm: FC<TRecordEditorFormProps> = ({
  attributes,
  onFormSubmit,
}) => {
  const editMode = false;
  const form = useForm({
    initialValues: attributes.reduce(( acc: any, attr ) => {
      acc[ attr.slug ] = '';
      return acc;
    }, {}),
  });

  const formControls = useMemo(() => attributes.map(( attr: TEntityAttribute ) => {
    const rendererName = `${capitalize( attr.type )}Renderer`;
    const AttributeRenderer: any = ( formRenderers as Record<string, any> )[ rendererName ];

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
        <Group justify="flex-end" mt="md">
          <Button type="submit">{editMode ? 'Edit' : 'Add'}</Button>
        </Group>
      </Stack>
    </form>
  );
};
