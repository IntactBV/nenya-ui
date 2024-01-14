import { isEmpty } from 'lodash';

export const prepareHeaders = ( headers: Headers, { getState }: {
    getState: () => any
}) => {
  if ( !getState().account ) {
    console.warn( 'No account found in state!' );
    return null;
  }

  const { user } = getState().account;

  if ( isEmpty( user.accessToken )) {
    console.warn( 'No access token found in state!' );
    return null;
  }

  headers.set( 'authorization', `Bearer ${user.accessToken}` );
  return headers;
};
