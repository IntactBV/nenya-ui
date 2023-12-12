import { FC } from 'react';
import { Chip, Group, Text } from '@mantine/core';
import { GoMail } from 'react-icons/go';
import Link from 'next/link';
import { TFieldRendererProps } from './field-renderers.types';

export const EmailFieldRenderer: FC<TFieldRendererProps> = ({ field }) => (
  <Link href={`mailto:${field}`}>
    <Chip size="xs">
      <Group gap="sm" align="center">
        <GoMail size={14} />
        <Text>
          {field}
        </Text>
      </Group>
    </Chip>
  </Link>
);
