import { ScrollArea, Stack, Text, Title } from '@mantine/core';
import { useGetTenantModulesQuery } from '@uiRepos/tenants.repo';
import { isEmpty } from 'lodash';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { LinksGroup } from '@crmComponents/page/NavbarLinksGroup/NavbarLinksGroup';
import { useMemo } from 'react';
import { useNavigation } from '@/src/domain/hooks/menu.hook';
import classes from './CrmSidebar.module.css';

export function CrmSidebar() {
  const account = useAppSelector( selectAccount );
  const { data: tenantModules } = account.tenant?.tenantId
    ? useGetTenantModulesQuery( account.tenant?.tenantId )
    : { data: [] };
  const navData = useNavigation( tenantModules );
  const links = useMemo(() => navData.value.map(
    ( item ) => <LinksGroup {...item} key={item.label} />
  ), [ navData.value ]);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        {isEmpty( links ) && (
          <Stack align="center" justify="center" pt="xl">
            <Title order={3}>
              No modules yet
            </Title>
            <Text>
            Please enable a module
            </Text>
          </Stack>
        )}
        <div className={classes.linksInner}>{links}</div>
        {/* <pre style={{ fontSize: '10px' }}>{JSON.stringify( navData.value, null, 2 )}</pre> */}
      </ScrollArea>

      {/* <div className={classes.footer}>
        <UserButton />
      </div> */}
    </nav>
  );
}
