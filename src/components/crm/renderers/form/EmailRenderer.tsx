import { TextInput } from '@mantine/core';
import { FC } from 'react';
import { TFormRendererProps } from './form.types';

export const EmailRenderer: FC<TFormRendererProps> = ({ attribute, props }) => (
  <TextInput label={attribute.name} placeholder={attribute.name} {...props} />
);
