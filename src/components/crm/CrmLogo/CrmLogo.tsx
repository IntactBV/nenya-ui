import Image from 'next/image';
import { Code, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import css from './CrmLogo.module.css';
import pkg from '@/package.json';

export const CrmLogo = ({ sub }: { sub: string }) => (
  <Link href="/" className={css.logo} title="NenyaDigital">
    <Group align="center" justify="center">
      <Image
        src="/crm_logo.webp"
        width={30}
        height={30}
        alt="Nenya Digital"
      />
      <Stack gap={0}>
        <Text variant="gradient" component="span" gradient={{ from: 'red', to: 'yellow' }} className={css.title}>
          NenyaDigital
        </Text>
        <Text className={css.sub}>
          {sub}
        </Text>

      </Stack>
      <Code className={css.version}>v{pkg.version}</Code>
    </Group>
  </Link>
);
