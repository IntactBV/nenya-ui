// import { LOCAL_STORAGE } from '@scDomain/constants';
import { isNil } from 'lodash';
import { AccountState, EAccountRole } from './account.types';
// import * as jose from 'jose'

const APP_PREFIX = 'sc';
const LOCAL_STORAGE = {
  KEYS: {
    COLOR_SCHEME: `${APP_PREFIX}ColorScheme`,
    ACCOUNT: `${APP_PREFIX}Account`,
  },
};

const rawAccount = typeof window === 'undefined' ? null : localStorage.getItem( LOCAL_STORAGE.KEYS.ACCOUNT );
const user = typeof window === 'undefined' ? null : localStorage.getItem( 'user' );

export const
  accountSlideName = 'account';
export const accountState: AccountState = isNil( rawAccount )
  ? {
    email: 'gabi@bitvice.ro',
    tenant: {
      id: '3e439136-f6c2-4e88-83e7-a592b8ae9db7',
      name: 'Alpha',
      slug: 'alpha',
    },
    role: EAccountRole.ADMIN,
    token: '',
    // await jose.EncryptJWT({ 'urn:example:claim': true })
  }
  : JSON.parse( rawAccount );

accountState.user = isNil( user ) ? null : JSON.parse( user );

export default accountState;
