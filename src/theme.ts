'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontSmoothing: true,
  fontFamily: 'Montserrat',
  defaultRadius: 'md',
  primaryColor: 'violet',
  defaultGradient: {
    from: 'pink',
    to: 'violet',
    deg: 45,
  },
});
