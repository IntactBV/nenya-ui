import type { PayloadAction } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { AccountState, EAccountRoles, IUserImpl, TAccountTenant } from './account.types';

const ND_LS_USER_KEY = 'ndUser';

const accountReducers = {

  setAccount: ( state: AccountState, action: PayloadAction<AccountState> ) => {
    console.log( '[setAccount] action', action );
    state.email = action.payload.email;
    state.tenant = action.payload.tenant;
    state.role = action.payload.role;
  },

  setAccountTenants: ( state: AccountState, action: PayloadAction<TAccountTenant[]> ) => {
    state.tenantAccounts = action.payload;
  },
  setAccountTenant: ( state: AccountState, action: PayloadAction<TAccountTenant> ) => {
    state.tenant = action.payload;
  },

  accountLoginUser: (
    state: AccountState,
    action: PayloadAction<{ user: IUserImpl, tenant: TAccountTenant }>
  ) => {
    state.user = action.payload.user;
    state.tenant = action.payload.tenant;
    // state.role = action.payload.tenant.role as EAccountRoles;

    window.localStorage.setItem( ND_LS_USER_KEY, JSON.stringify( state ));
  },

  accountLogout: ( state: AccountState ) => {
    state.user = null;
    state.email = '';
    state.user = null;
    state.tenantAccounts = [];
    state.tenant = null;
    state.role = EAccountRoles.VISITOR;

    const userData = window.localStorage.getItem( ND_LS_USER_KEY );
    console.log( 'userData', userData );
    if ( !isEmpty( userData )) {
      window.localStorage.removeItem( ND_LS_USER_KEY );
    }
  },
};

export default accountReducers;
