import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import StoreProvider from '@uiDomain/contexts/StoreProvider';
import { AuthProvider } from '@uiDomain/contexts/AuthProvider';
import { theme } from '@uiDomain/themes/theme-orange';
import '../../assets/scss/style.scss';

import { dir } from 'i18next';
import { languages } from '@uiDomain/i18n/settings';
import { ThemeProvider } from '@uiDomain/contexts/ThemeProvider';

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
        <AuthProvider>
          <StoreProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
