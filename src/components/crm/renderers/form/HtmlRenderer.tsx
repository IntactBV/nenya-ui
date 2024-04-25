import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '@mantine/core';
import { TFormRendererProps } from './form.types';

export const HtmlRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { t } = useTranslation();

  return (
    <Textarea
      label={t( `attributes.names.${attribute.slug}` )}
      placeholder={t( `attributes.names.${attribute.slug}` )}
      {...props}
    />
  );
};
