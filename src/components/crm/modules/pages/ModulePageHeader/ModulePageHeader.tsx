import { Group, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { TModulePage } from '@uiDomain/types';
import { FC, PropsWithChildren } from 'react';
import { useColorScheme } from '@mantine/hooks';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import css from './ModulePageHeader.module.css';

type TModulePageHeaderProps = PropsWithChildren & {
  page: TModulePage
};
export const ModulePageHeader: FC<TModulePageHeaderProps> = ({ page, children }) => {
  const colorScheme = useColorScheme();
  const theme = useMantineTheme();

  return (
    <Stack id="ModulePageHeader" className={`${css.header} ${css[ $isDarkMode.value ? 'dark' : 'light' ]}`}>
      <Group justify="space-between">

        <Stack gap="xs">
          <Title order={1} className={css.title}>{page.name}</Title>
          <Text>{page.description}</Text>
          {/* <pre>{JSON.stringify( theme, null, 2 )}</pre> */}
        </Stack>

        <Stack>
          {children}
        </Stack>
      </Group>
    </Stack>
  );
};
