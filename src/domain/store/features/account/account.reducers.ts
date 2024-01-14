import type { PayloadAction } from '@reduxjs/toolkit';
import { AccountState, IUserImpl } from './account.types';

const accountReducers = {

  setAccount: ( state: AccountState, action: PayloadAction<AccountState> ) => {
    console.log( '[setAccount] action', action );
    state.email = action.payload.email;
    state.tenant = action.payload.tenant;
    state.role = action.payload.role;
  },

  accountLoginUser: ( state: AccountState, action: PayloadAction<IUserImpl> ) => {
    state.user = action.payload;
    window.localStorage.setItem( 'user', JSON.stringify( action.payload ));
  },

  accountLogout: ( state: AccountState ) => {
    console.log( '[logout]' );
    state.user = null;
    state.email = '';
    state.tenant = '';
    state.role = '';
  },
};

export default accountReducers;
