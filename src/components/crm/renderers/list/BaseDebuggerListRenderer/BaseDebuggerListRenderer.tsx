import { TRendererProps } from '@uiDomain/types';
import { FC } from 'react';

export const BaseDebuggerListRenderer: FC<TRendererProps> = ({ pageData }) => (
  <pre>
      pageData: {JSON.stringify( pageData, null, 2 )}
  </pre>
);
