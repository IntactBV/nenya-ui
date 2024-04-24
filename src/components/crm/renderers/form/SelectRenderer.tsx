import { Select, TextInput } from '@mantine/core';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TFormRendererProps } from './form.types';

export const SelectRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { t } = useTranslation();
  const options: any[] = useMemo(() => {
    const attrOptions = JSON.parse( attribute.options ) || [];
    return attrOptions.map(( option: any ) => ({
      value: option.value,
      label: t(`attributes.select.${option.label}`),
    }));
  }, [ attribute.options ]); 

  return (
    <Select
      label={t( `attributes.names.${attribute.slug}` )}
      placeholder="Pick value"
      data={options}
      {...props}
    />
  );
};
