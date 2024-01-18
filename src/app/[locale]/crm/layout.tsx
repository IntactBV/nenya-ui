import { AppShell, Avatar, Burger, Button, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren, useEffect } from 'react';
import { CrmLogo } from '@uiComponents/crm/CrmLogo';
import { CrmSidebar } from '@crmComponents/page/CrmSidebar/CrmSidebar';
import { ColorSchemeToggle } from '@uiComponents/common/ColorSchemeToggle/ColorSchemeToggle';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { isNil } from 'lodash';
import { UserDrawer } from '@crmComponents/users/UserDrawer/UserDrawer';
import { LocaleProvider } from '@uiDomain/contexts/LocaleProvider';
import { initTranslations } from '@uiDomain/i18n';
import { CrmPage } from '@crmComponents/page/CrmPage/CrmPage';

const i18nNamespaces = [ 'crm' ];

const CrmLayout: FC<{
  children: any,
  params: {
    locale: string
  }
 }> = async({
   children,
   params: {
     locale,
   },
 }) => {
   const { resources } = await initTranslations( locale, i18nNamespaces );

   return (
     <LocaleProvider
       locale={locale}
       namespaces={i18nNamespaces}
       resources={resources}
     >
       <CrmPage>
         {children}
       </CrmPage>

       <Notifications color="orange" />

     </LocaleProvider>
   );
 };
export default CrmLayout;
