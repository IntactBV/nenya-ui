import { useAuth } from '@uiDomain/contexts/AuthProvider';
import { isEmpty } from 'lodash';
import { auth } from '@uiDomain/firebase';

export const prepareHeaders = async( headers: Headers, { getState }: {
    getState: () => any
}) => {
  const accessToken = await auth.currentUser.getIdToken();
  const { account } = getState();

  if ( isEmpty( accessToken )) {
    console.warn( '[prepareHeaders] No access token found!' );
    return null;
  }

  headers.set( 'authorization', `Bearer ${accessToken}` );
  headers.set( 'Content-Type', 'application/json' );
  headers.set( 'Accept', 'application/json' );
  headers.set( 'X-Tenant', account.tenant.tenantSlug );
  headers.set( 'X-Realm', account.realm?.slug || 'dev' );

  return headers;
};
