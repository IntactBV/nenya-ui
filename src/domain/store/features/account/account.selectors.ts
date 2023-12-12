import { RootState } from '@uiStore/store';

export const selectAccount = ( state: RootState ) => state.account;
export const selectAccountEmail = ( state: RootState ) => state.account.email;
