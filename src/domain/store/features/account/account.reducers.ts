import { AccountState } from './account.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const accountReducers = {

  setAccount: ( state: AccountState, action: PayloadAction<AccountState> ) => {
    console.log( '[setAccount] action', action );
    state.email = action.payload.email;
    state.tenant = action.payload.tenant;
    state.role = action.payload.role;
  }
}

export default accountReducers;
