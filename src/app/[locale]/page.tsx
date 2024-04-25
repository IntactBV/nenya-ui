import { PublicHeader } from '@uiComponents/public/PublicHeader/PublicHeader';
import { Welcome } from '@uiComponents/public/Welcome/Welcome';
import { LocaleProvider } from '@uiDomain/contexts/LocaleProvider';
import { initTranslations } from '@uiDomain/i18n';
import { FC } from 'react';

type TPageProps = {
  params: {
    locale: string;
  };
};

const i18nNamespaces = [ 'public' ];

const Page: FC<TPageProps> = async({
  params: { locale },
}) => {
  const { t, resources } = await initTranslations( locale, i18nNamespaces );

  return (
    <LocaleProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <PublicHeader />
      <Welcome />
    </LocaleProvider>
  );
};

export default Page;
