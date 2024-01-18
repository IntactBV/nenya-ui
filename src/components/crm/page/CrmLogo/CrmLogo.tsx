import Image from 'next/image';
import { Code, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import css from './CrmLogo.module.css';
import pkg from '@/package.json';

export const CrmLogo = ({ sub }: { sub: string }) => {
  const account = useAppSelector( selectAccount );
  const tenant = account?.tenant;

  return (
    <Group align="center" justify="center">
      <Link href="/" className={css.logo} title="NenyaDigital">
        {tenant?.icon && (
          <Image
            src="/crm_logo.webp"
            width={30}
            height={30}
            alt="Nenya Digital"
            className={css.logoImg}
          />
        )}
        <Stack gap={0}>
          <Text variant="gradient" component="span" gradient={{ from: '#ccc', to: '#999' }} className={css.title}>
            {tenant?.name}
          </Text>
          {/* <Text className={css.sub}>
            {sub}
          </Text> */}

        </Stack>
      </Link>
      <Code className={css.version}>v{pkg.version}</Code>
    </Group>
  );
};
