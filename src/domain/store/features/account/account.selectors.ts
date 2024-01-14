import { RootState } from '@uiStore/store';

export const selectAccount = ( state: RootState ) => state.account;
export const selectAccountEmail = ( state: RootState ) => state.account.email;
export const selectAccountUser = ( state: RootState ) => state.account.user;
export const selectAccessToken = ( state: RootState ) => state.account.user.accessToken;
