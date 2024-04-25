'use client';

import { MantineProvider } from '@mantine/core';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { useAppSelector } from '@uiStore/hooks';
import { isEmpty } from 'lodash';
import { FC, PropsWithChildren, useMemo } from 'react';
import * as themes from '@uiDomain/themes';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const account = useAppSelector( selectAccount );
  const theme: any = useMemo(() => {
    let color = 'violet';

    if ( !isEmpty( account?.tenant?.color )) {
      color = account?.tenant?.color;
    }

    return ( themes as Record<string, any> )[ color ]?.theme || themes.violet.theme;
  }, [ account ]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>

  );
};
