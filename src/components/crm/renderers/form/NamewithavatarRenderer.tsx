import { Stack, TextInput } from '@mantine/core';
import { FC } from 'react';
import { TFormRendererProps } from './form.types';

export const NamewithavatarRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => (
  <Stack>
    Avatar
    <TextInput
      label={attribute.name}
      placeholder={attribute.name}
      {...props}
    />
  </Stack>
);
