export const fallbackLng = 'en';
export const languages = [ fallbackLng, 'ro' ];
export const defaultNS = 'translation';
export const cookieName = 'ndI18Next';

export const i18nConfig = {
  locales: [ 'ro', 'en' ],
  defaultLocale: 'en',
  localeDetection: false,
};

export function getOptions( lng: string = fallbackLng, ns: string = defaultNS ) {
  return {
    debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
