import { ActionIcon, Group, Stack, Text, Title, rem } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { GoChevronLeft } from 'react-icons/go';
import { isEmpty } from 'lodash';
import css from './CommonHeader.module.css';

type TCommonHeaderProps = PropsWithChildren & {
  id: string;
  title: string;
  description: string;
  backButtonUrl?: string;
};

export const CommonHeader: FC<TCommonHeaderProps> = ({
  id,
  title,
  description,
  children,
  backButtonUrl,
}) => (
  <Stack id={id} className={`${css.header}`} mb="xs">
    <Group justify="space-between">
      <Group>
        {!isEmpty( backButtonUrl ) && (
          <Link href={backButtonUrl || ''}>
            <ActionIcon p={5} size={40} mb={20} variant="subtle">
              <GoChevronLeft size={rem( 34 )} />
            </ActionIcon>
          </Link>
        )}

        <Stack gap="xs">
          <Title order={1} className={css.title}>{title}</Title>
          <Text>{description}</Text>
        </Stack>
      </Group>

      <Stack>
        {children}
      </Stack>
    </Group>
  </Stack>
);
