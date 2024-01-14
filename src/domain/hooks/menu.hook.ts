import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconUsersGroup,
} from '@tabler/icons-react';
import { computed } from '@preact/signals-react';
import { isEmpty } from 'lodash';
import { $userData } from '@uiSignals/common.signals';
import { EAccountRoles } from '@/src/domain/types';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

type TNavLink = {
  label: string,
  link: string,
  isActive?: boolean,
};
type TNavItem = {
  label: string,
  icon: any,
  link?: string,
  links?: TNavLink[],
  initiallyOpened?: boolean
};

export const useNavigation = ( tenantModules: any ) => {
  const $navData = computed(() => {
    if ( !tenantModules ) {
      tenantModules = [];
    }

    const tenantOptions = tenantModules
      .filter(( mod: any ) => !isEmpty( mod.pages ))
      .map(( mod: any ) => ({
        label: mod.name,
        icon: IconUsersGroup,
        initiallyOpened: true,
        links: mod.pages.map(( page: any ) => ({
          label: page.name,
          link: `/crm/pages/${page.id}`,
        })),
      }));

    if ( $userData.value.role === EAccountRoles.ADMIN ) {
      const adminData: TNavItem[] = [
        {
          label: 'Dashboard',
          icon: IconGauge,
          link: '/',
        },
        ...tenantOptions,
        {
          label: 'ADMIN',
          icon: IconAdjustments,
          initiallyOpened: true,
          links: [
            { label: 'Overview', link: '/crm/settings' },
            { label: 'Attributes', link: '/crm/settings/attributes' },
            { label: 'Entities', link: '/crm/settings/entities' },
            { label: 'Modules', link: '/crm/settings/modules' },
            { label: 'Tenants', link: '/crm/settings/tenants' },
            { label: 'Users', link: '/crm/settings/users' },
          ],
        },
      ];
      return adminData;
    }
    return mockdata;
  });

  return $navData;
};
