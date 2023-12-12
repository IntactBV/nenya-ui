import { UseFormReturnType } from '@mantine/form';
import { TEntityAttribute } from '@uiDomain/types';

export type TFormRendererProps = {
  attribute: TEntityAttribute;
  form?: UseFormReturnType<any, ( values: any ) => any>,
  props?: Record<string, any>;
};
