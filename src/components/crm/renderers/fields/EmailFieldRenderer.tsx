import { FC } from 'react';
import { Chip, Group, Text } from '@mantine/core';
import { GoMail } from 'react-icons/go';
import Link from 'next/link';
import { TFieldRendererProps } from './field-renderers.types';
import css from './fields.module.css';

export const EmailFieldRenderer: FC<TFieldRendererProps> = ({ field }) => (
  <Link href={`mailto:${field}`} className={css.link}>
    <Group gap="xs" align="center">
      <GoMail size={14} />
      <Text>
        {field}
      </Text>
    </Group>
  </Link>
);
