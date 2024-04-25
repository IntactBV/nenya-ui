// import { LOCAL_STORAGE } from '@scDomain/constants';
import { isNil } from 'lodash';
import { AccountState, EAccountRoles } from './account.types';
// import * as jose from 'jose'

const APP_PREFIX = 'nd';
const LOCAL_STORAGE = {
  KEYS: {
    COLOR_SCHEME: `${APP_PREFIX}ColorScheme`,
    ACCOUNT: `${APP_PREFIX}User`,
  },
};
const rawAccount = typeof window === 'undefined' ? null : localStorage.getItem( LOCAL_STORAGE.KEYS.ACCOUNT );
// const user = typeof window === 'undefined' ? null : localStorage.getItem( 'user' );

export const
  accountSlideName = 'account';
export const accountState: AccountState = isNil( rawAccount )
  ? {
    email: '',
    tenant: {},
    role: EAccountRoles.VISITOR,
  }
  : JSON.parse( rawAccount );

// accountState.user = isNil( rawAccount ) ? null : JSON.parse( rawAccount ).user;

export default accountState;
