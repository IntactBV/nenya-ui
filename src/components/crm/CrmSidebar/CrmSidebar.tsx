import { ScrollArea } from '@mantine/core';
import { useGetTenantModulesQuery } from '@uiRepos/tenants.repo';
import { LinksGroup } from '@/src/components/crm/NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '@/src/components/crm/UserButton/UserButton';
import { useNavigation } from '@/src/domain/hooks/menu.hook';
import classes from './CrmSidebar.module.css';

const TENANT_ID = 'b1023ecb-b35b-4812-b466-38d4227e7bac';

export function CrmSidebar() {
  const { data: tenantModules } = useGetTenantModulesQuery( TENANT_ID );
  const navData = useNavigation( tenantModules );
  const links = navData.value.map(( item ) => <LinksGroup {...item} key={item.label} /> );

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
        {/* <pre style={{ fontSize: '10px' }}>{JSON.stringify( navData.value, null, 2 )}</pre> */}
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
