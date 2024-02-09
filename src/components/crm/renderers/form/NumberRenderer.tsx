import { TextInput } from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TFormRendererProps } from './form.types';

export const NumberRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { t } = useTranslation();

  return (
    <TextInput
      label={t( `attributes.names.${attribute.slug}` )}
      placeholder={t( `attributes.names.${attribute.slug}` )}
      {...props}
    />
  );
};
