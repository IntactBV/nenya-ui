import { FC, useMemo } from 'react';
import { Avatar } from '@mantine/core';
import { TFieldRendererProps } from './field-renderers.types';

export const AvatarFieldRenderer: FC<TFieldRendererProps> = ({ field, record }) => {
  const initials = useMemo(() => {
    const [ first, last ] = record.name?.split( ' ' ) || [ '', '' ];
    return `${first[ 0 ]}${last[ 0 ]}`;
  }, [ record ]);
  return (
    <Avatar>{initials}</Avatar>
  );
};
