import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { isEmpty } from 'lodash';
import { auth } from '@uiDomain/firebase';

export const prepareHeaders = async( headers: Headers, { getState }: {
    getState: () => any
}) => {
  const accessToken = await auth.currentUser.getIdToken();

  if ( isEmpty( accessToken )) {
    console.warn( '[prepareHeaders] No access token found!' );
    return null;
  }

  headers.set( 'authorization', `Bearer ${accessToken}` );

  return headers;
};
