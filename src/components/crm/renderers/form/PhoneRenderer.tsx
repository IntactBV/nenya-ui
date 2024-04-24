import { TextInput } from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TFormRendererProps } from './form.types';

export const PhoneRenderer: FC<TFormRendererProps> = ({ attribute, props }) => {
  const { t } = useTranslation();

  return (
    <TextInput
      label={t( `attributes.names.${attribute.slug}` )}
      placeholder={attribute.name}
      {...props}
    />
  );
};
