import { FC } from 'react';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
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

       <Notifications />

     </LocaleProvider>
   );
 };
export default CrmLayout;
