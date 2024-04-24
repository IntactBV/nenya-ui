import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';
import { ColorSwatch, Group } from '@mantine/core';

export const ColorFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;
  return (
    <Group id="ColorWrapper" align="center" justify="center" w="100%">

      <ColorSwatch color={field} />
      </Group>
  );
};
