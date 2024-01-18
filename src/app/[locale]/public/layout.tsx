import { LocaleProvider } from '@uiDomain/contexts/LocaleProvider';
import { initTranslations } from '@uiDomain/i18n';

const i18nNamespaces = [ 'public' ];

export default async function PublicLayout({
  children,
  params: { locale },
}: {
  children: any,
  params: any
}) {
  const { resources } = await initTranslations( locale, i18nNamespaces );

  return (
    <LocaleProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      {children}
    </LocaleProvider>

  );
}
