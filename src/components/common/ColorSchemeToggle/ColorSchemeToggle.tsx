'use client';

import { Button, Group, Switch, useMantineColorScheme } from '@mantine/core';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    if ( $isDarkMode.value ) {
      $isDarkMode.value = false;
      setColorScheme( 'light' );
    } else {
      $isDarkMode.value = true;
      setColorScheme( 'dark' );
    }
  };

  return (
    <Group
      justify="center"
      style={{
        cursor: 'pointer',
      }}
    >
      <Switch
        size="lg"
        onLabel={<FiSun size="1rem" />}
        offLabel={<FiMoon size="1rem" />}
        checked={$isDarkMode.value}
        onChange={() => toggleColorScheme()}
      />

    </Group>
  );
}
