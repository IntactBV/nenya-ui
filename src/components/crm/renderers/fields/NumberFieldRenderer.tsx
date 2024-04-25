import { FC } from 'react';
import { TFieldRendererProps } from './field-renderers.types';

export const NumberFieldRenderer: FC<TFieldRendererProps> = ({ field }) => {
  const a = 1;
  return (
    <span>{field}</span>
  );
};
