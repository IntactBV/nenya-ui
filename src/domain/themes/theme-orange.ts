'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontSmoothing: true,
  fontFamily: 'Montserrat',
  defaultRadius: 'md',
  primaryColor: 'orange',
  defaultGradient: {
    from: '#ff9900',
    to: 'orange',
    deg: 45,
  },
  colors: {
    custom: [ '#000011', '#00033', '#004400', '#550000', '#000066', '#007700', '#880000', '#000099', '#00000020', '#d9480f25' ],
  },
});
