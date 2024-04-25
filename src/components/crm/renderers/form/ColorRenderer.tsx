import { ColorInput, TextInput } from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TFormRendererProps } from './form.types';

export const ColorRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { t } = useTranslation();

  return (
    <ColorInput
      label={t( `attributes.names.${attribute.slug}` )}
      description={attribute.name}
      placeholder={attribute.name}
      disallowInput
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
      withPicker={true}
      {...props}
    />
  );
};
