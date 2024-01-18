import { Button, Group, Select, Stack, Text } from '@mantine/core';
import { ColorSchemeToggle } from '@uiComponents/common/ColorSchemeToggle/ColorSchemeToggle';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { useLocale } from '@uiDomain/contexts/LocaleProvider';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type TUserDrawerProps = {
  onLogout: () => void
};

export const UserDrawer: FC<TUserDrawerProps> = ({
  onLogout,
}) => {
  const { t, i18n } = useTranslation();
  const languages = [ {
    value: 'ro',
    label: 'Romana',
  }, {
    value: 'en',
    label: 'English',
  } ];

  const handleLanguageChange = useCallback(( lang: string ) => {
    console.log( 'lang change', lang );
    // i18n.changeLanguage( lang );
    i18n.changeLanguage( lang );
  }, [ i18n.language ]);

  return (
    <Stack gap="lg" align="start">
      <CommonDebugger data={i18n.language} field="i18n" />
      <Group justify="space-between" style={{ width: '100%' }}>
        <Text>{t( 'language.singular' )}</Text>
        <Select
          placeholder="Select language"
          data={languages}
          onChange={handleLanguageChange}
          value={i18n.language}
          w={120}
        />

      </Group>
      <Group justify="space-between" style={{ width: '100%' }}>
        <Text>Tema culori</Text>
        <ColorSchemeToggle />
      </Group>
      <Button
        variant="subtle"
        onClick={onLogout}
      >Logout
      </Button>

    </Stack>

  );
};
