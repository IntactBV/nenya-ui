import Image from 'next/image';
import { Badge, Code, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { FC } from 'react';
import css from './CrmLogo.module.css';
import pkg from '@/package.json';

type TCrmLogoProps = {
  sub?: string
};

export const CrmLogo: FC<TCrmLogoProps> = ({
  sub,
}) => {
  const account = useAppSelector( selectAccount );
  const tenant = account?.tenant;

  return (
    <Group align="center" justify="center">
      <Link href="/crm" className={css.logo} title="NenyaDigital">
        <Group align="center" gap="xs">
          {!tenant?.avatar && (
            <Image
              src="/favicon.png"
              width={40}
              height={40}
              alt="Nenya Digital"
              className={css.logoImg}
            />
          )}
          {tenant?.avatar && (
            <Image
              src={tenant?.avatar}
              width={30}
              height={30}
              alt={tenant?.tenantName}
              className={css.logoImg}
            />
          )}
          <Group gap={20}>
            <Text variant="gradient" component="span" gradient={{ from: '#ccc', to: '#999' }} className={css.title}>
              {tenant?.tenantName}
            </Text>
          </Group>
        </Group>
      </Link>
      <Badge variant="dot">
        {sub}
      </Badge>
      <Code className={css.version}>v{pkg.version}</Code>
    </Group>
  );
};
