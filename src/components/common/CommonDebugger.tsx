import { FC } from 'react';

interface ICommonDebuggerProps {
  field: string,
  data: any;
  floating?: boolean;
}

export const CommonDebugger: FC<ICommonDebuggerProps> = ({ data, field, floating }) => {
  return ( <pre style={{
    backgroundColor: '#111',
    color: '#0f0',
    padding: '1rem',
    fontSize: '.8rem',
    overflowY: 'auto',
    maxHeight: '20rem',
    width: floating ? '32rem' : 'auto',
    position: floating ? 'absolute' : 'static',
    right: floating ? 0 : 'auto',
    bottom: floating ? 0 : 'auto',
    opacity: floating ? '.6' : 1
  }}>
    {field}: {JSON.stringify( data, null, 2 )}
  </pre> )
}
