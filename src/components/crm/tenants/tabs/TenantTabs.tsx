import { Tabs } from '@mantine/core';
import { ITenant } from '@uiDomain/domain.types';
import { FC, useMemo } from 'react';
import { GoGear, GoGitMerge, GoPeople, GoVersions } from 'react-icons/go';
import { TenantModulesTab } from './TenantModulesTab';
import { TenantUsersTab } from './TenantUsersTab';
import { TenantSettingsTab } from './TenantSettingsTab';
import { TenantHistoryTab } from './TenantHistoryTab';

interface ITenantTabsProps {
  tenant: ITenant;
}

interface ITenantTab {
  value: string;
  label: string;
  icon: any;
  panel: any;
}

export const TenantTabs: FC<ITenantTabsProps> = ({ tenant }) => {
  const tenantsTabsData: ITenantTab[] = useMemo(() => [ {
    value: 'modules',
    label: 'Modules',
    icon: GoVersions,
    panel: TenantModulesTab,
  }, {
    value: 'users',
    label: 'Users',
    icon: GoPeople,
    panel: TenantUsersTab,
  }, {
    value: 'settings',
    label: 'Settings',
    icon: GoGear,
    panel: TenantSettingsTab,
  }, {
    value: 'history',
    label: 'History',
    icon: GoGitMerge,
    panel: TenantHistoryTab,
  } ], [ tenant ]);

  return (
    <Tabs defaultValue={tenantsTabsData[ 0 ].value}>

      <Tabs.List>
        {tenantsTabsData.map( tabData => (
          <Tabs.Tab key={tabData.value} value={tabData.value} leftSection={<tabData.icon size="1.2rem" />} px="lg">{tabData.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      {tenantsTabsData.map( tabData => {
        const TabPanel = tabData.panel;
        return (
          <Tabs.Panel key={tabData.value} value={tabData.value} pt="xs">
            <TabPanel tenant={tenant} />
          </Tabs.Panel>
        );
      })}

    </Tabs>
  );
};
