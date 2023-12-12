import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import StoreProvider from '@uiDomain/contexts/StoreProvider';
import { AuthProvider } from '@uiDomain/contexts/AuthProvider';
import { theme } from '../theme';
import '../assets/scss/style.scss';

export const metadata = {
  title: 'Nenya Digital',
  description: 'Your digitalization tool',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
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
