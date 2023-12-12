import { createSlice } from '@reduxjs/toolkit';

import initialState, { accountSlideName } from './account.state';
import reducers from './account.reducers';

export * from './account.selectors';

export const accountSlice = createSlice({
  name: accountSlideName,
  initialState,
  reducers,
});

// eslint-disable-next-line one-var
export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
