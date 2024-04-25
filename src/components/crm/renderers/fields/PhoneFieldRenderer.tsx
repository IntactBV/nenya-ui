import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';
import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { GoMegaphone } from 'react-icons/go';
import css from './fields.module.css';

export const PhoneFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;
  return (
  <Link 
    href={`mailto:${field}`} 
    className={css.link}
  >
    <Group gap="xs" align="center">
      <GoMegaphone size={14} />
      <Text>
        {field}
      </Text>
    </Group>
  </Link>
  );
};
