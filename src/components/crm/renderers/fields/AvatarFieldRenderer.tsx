import { FC, useMemo } from 'react';
import { Avatar } from '@mantine/core';
import { isNil } from 'lodash';
import { TFieldRendererProps } from './field-renderers.types';

export const AvatarFieldRenderer: FC<TFieldRendererProps> = ({ field, record }) => {
  const initials = useMemo(() => {
    const avatarFields = [
      'name',
      'full-name',
    ];
    const sourceField = avatarFields.find(
      ( f: string ) => !isNil( record[ f ])
    );
    const [ first, last ] = record?.[ sourceField ]?.split( ' ' ) || [ '', '' ];
    return `${first[ 0 ]}${last[ 0 ]}`;
  }, [ record ]);
  return (
    <Avatar>
      {initials.toUpperCase()}
    </Avatar>
  );
};
