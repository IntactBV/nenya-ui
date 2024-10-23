import { Group, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { TModulePage } from '@uiDomain/types';
import { FC, PropsWithChildren } from 'react';
import { useColorScheme } from '@mantine/hooks';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import css from './ModulePageHeader.module.css';
import { CommonHeader } from '@uiComponents/common/CommonHeader/CommonHeader';

type TModulePageHeaderProps = PropsWithChildren & {
  page: TModulePage
};

export const ModulePageHeader: FC<TModulePageHeaderProps> = ({ page, children }) => (
  <CommonHeader
    id="ModulePageHeader"
    title={page.name}
    description={page.description}
  >
    {children}
  </CommonHeader>
);

