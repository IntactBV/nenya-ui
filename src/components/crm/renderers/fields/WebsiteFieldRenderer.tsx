import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';
import Link from 'next/link';
import { Group, Text } from '@mantine/core';
import { GoDeviceMobile, GoGlobe } from 'react-icons/go';
import { PiPhoneLight } from 'react-icons/pi';
import css from './fields.module.css';

export const WebsiteFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;
  return (
  <Link href={`https://${field}`} className={css.link}>
    <Group gap="xs" align="center">
      <GoGlobe size={18} />
      <Text>
        {field}
      </Text>
    </Group>
  </Link>
  );
};
