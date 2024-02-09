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
import { isEmpty, isNil } from 'lodash';
import { $userData } from '@uiSignals/common.signals';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { EAccountRoles } from '@uiStore/features/account/account.types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const userRole = EAccountRoles.APP_ADMIN;
  // const userRole = isNil( currentUser )
  //   ? EAccountRoles.VISITOR
  //   : currentUser?.role || EAccountRoles.OPERATOR;

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
          links: [
            { label: 'Overview', link: '/crm/dashboard' },
          ],
        },
        ...tenantOptions,
      ];

      if ( userRole === EAccountRoles.APP_ADMIN ) {
        adminData.push({
          label: 'ADMIN',
          icon: IconAdjustments,
          initiallyOpened: true,
          links: [
            { label: t( 'app.settings.admin.overview' ), link: '/crm/settings' },
            { label: t( 'app.settings.admin.attributes.title' ), link: '/crm/settings/attributes' },
            { label: t( 'app.settings.admin.entities.title' ), link: '/crm/settings/entities' },
            { label: t( 'app.settings.admin.modules.title' ), link: '/crm/settings/modules' },
            { label: t( 'app.settings.admin.tenants.title' ), link: '/crm/settings/tenants' },
            { label: t( 'app.settings.admin.realms.title' ), link: '/crm/settings/realms' },
            { label: t( 'app.settings.admin.users.title' ), link: '/crm/settings/users' },
            { label: t( 'app.settings.admin.reports.title' ), link: '/crm/settings/reports' },
          ],
        });
      }
      return adminData;
    }
    return mockdata;
  });

  return $navData;
};
