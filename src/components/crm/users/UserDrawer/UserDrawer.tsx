import { Button, Group, Select, Stack, Text } from '@mantine/core';
import { ColorSchemeToggle } from '@uiComponents/common/ColorSchemeToggle/ColorSchemeToggle';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { setAccountTenant } from '@uiStore/features/account/account.slice';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type TUserDrawerProps = {
  onLogout: () => void,
  onClose?: () => void
};

export const UserDrawer: FC<TUserDrawerProps> = ({
  onLogout,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const languages = [ {
    value: 'ro',
    label: 'Romana',
  }, {
    value: 'en',
    label: 'English',
  } ];
  const account = useAppSelector( selectAccount );

  const handleTenantChange = useCallback( async( tenantId: string ) => {
    const tenant = account.tenantAccounts.find( ta => ta.tenantId === tenantId );
    if ( tenant ) {
      dispatch( setAccountTenant( tenant ));
    }

    router.push( '/crm/dashboard' );
    onClose();
  }, [ account.tenantAccounts ]);

  const handleLanguageChange = useCallback(( lang: string ) => {
    i18n.changeLanguage( lang );
  }, [ i18n.language ]);

  return (
    <Stack gap="lg" align="start">

      <Group justify="space-between" style={{ width: '100%' }}>
        <Text>{t( 'organization.singular' )}</Text>
        <CommonDebugger data={account} field="acc" />
        <Select
          placeholder="Select language"
          data={account.tenantAccounts.map( ta => ({
            value: ta.tenantId,
            label: ta.tenantName,
          }))}
          onChange={handleTenantChange}
          value={account.tenant.tenantId}
          w={120}
        />
      </Group>

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
