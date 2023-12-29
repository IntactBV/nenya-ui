import { createSlice } from '@reduxjs/toolkit';

import initialState, { commonSlideName } from './common.state';
import reducers from './common.reducers';

export const commonSlice = createSlice({
  name: commonSlideName,
  initialState,
  reducers,
});

// Action creators are generated for each case reducer function
export const {
  setCommonExpanded,
  setCommonPageTitle,
  setCommonPageBreadcrumbs,
  addCommonPageBreadcrumbs,
  setCommonPageShowEditDrawer,
  setCommonEditedRecord,
} = commonSlice.actions;

export default commonSlice.reducer;
