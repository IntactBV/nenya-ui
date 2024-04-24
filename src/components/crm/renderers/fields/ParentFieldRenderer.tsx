import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';
import { isNil } from 'lodash';
import { EntityFieldRenderer } from './EntityFieldRenderer';

export const ParentFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;

  if (isNil(field)) {
    return null;
  }

  return (
    <EntityFieldRenderer field={field.id} />
  )

};
