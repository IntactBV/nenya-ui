import { TextInput } from '@mantine/core';
import { FC } from 'react';
import { TFormRendererProps } from './form.types';

export const TextRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => (
  <TextInput
    label={attribute.name}
    placeholder={attribute.name}
    {...props}
  />
);
