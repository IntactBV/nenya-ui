import { FC, useMemo } from 'react';
import { Avatar, Button, Group } from '@mantine/core';
import { TFieldRendererProps } from './field-renderers.types';

export const NamewithavatarFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const initials = useMemo(() => {
    const [ first, last ] = field.split( ' ' );
    return `${first[ 0 ]}${last[ 0 ]}`;
  }, [ field ]);
  return (
    <Group>
      <Avatar color="violet">{initials}</Avatar>
      <Button variant="subtle">
        {field}
      </Button>
    </Group>
  );
};
