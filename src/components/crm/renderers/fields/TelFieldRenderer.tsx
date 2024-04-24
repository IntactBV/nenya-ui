import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';
import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { GoDeviceMobile } from 'react-icons/go';
import { PiPhoneLight } from 'react-icons/pi';
import css from './fields.module.css';

export const TelFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;
  return (
  <Link href={`mailto:${field}`} className={css.link}>
    <Group gap="xs" align="center">
      <PiPhoneLight size={20} />
      <Text>
        {field}
      </Text>
    </Group>
  </Link>
  );
};
