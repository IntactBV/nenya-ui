import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import StoreProvider from '@uiDomain/contexts/StoreProvider';
import { AuthProvider } from '@uiDomain/contexts/AuthProvider';
import { theme } from '../../theme';
import '../../assets/scss/style.scss';

import { dir } from 'i18next';
import { languages } from '@uiDomain/i18n/settings';

export const metadata = {
  title: 'Nenya Digital',
  description: 'Your digitalization tool',
};

export async function generateStaticParams() {
  return languages.map(( lng ) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: { children: any, params: any }) {
  return (
    <html lang={lng} dir="ltr">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AuthProvider>
            <StoreProvider>
              {children}
            </StoreProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
