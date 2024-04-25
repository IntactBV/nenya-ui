import { Button, Card, Select, Stack } from '@mantine/core';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TUserAssignTenantCardProps = {
  tenantsOptions: any[];
  rolesOptions: any[];
  onSaved?: ( tenant: any ) => void;
};

export const UserAssignTenantCard: FC<TUserAssignTenantCardProps> = ({
  tenantsOptions,
  rolesOptions,
  onSaved,
}) => {
  const { t } = useTranslation();
  const [ tenant, setTenant ] = useState<string>( '' );
  const [ role, setRole ] = useState<string>( '' );

  const handleAssignTenant = useCallback( async() => {
    onSaved && await onSaved({
      tenantId: tenant,
      role,
    });
    setTenant( '' );
    setRole( '' );
  }, [ tenant, role ]);

  useEffect(() => {
    console.log( 'EEEEfect' );
    setTenant( '' );
    setRole( '' );
  }, [ tenantsOptions ]);

  return (
    <Card>
      <Stack gap="md">

        <Select
          data={tenantsOptions}
          placeholder={t( 'placeholders.select_tenant' )}
          label={t( 'tenant.singular' )}
          variant="filled"
          value={tenant}
          onChange={( value ) => setTenant( value )}
        />
        <Select
          size="md"
          variant="filled"
          label={t( 'role' )}
          placeholder={t( 'placeholders.select_role' )}
          data={rolesOptions}
          value={role}
          onChange={( value ) => setRole( value )}
        />
        <Button
          variant="subtle"
          onClick={handleAssignTenant}
        >
          Assing New Tenant
        </Button>
      </Stack>
    </Card>
  );
};
