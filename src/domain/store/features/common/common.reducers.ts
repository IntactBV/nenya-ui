import { CommonState, TBreadcrumbItem } from './common.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const commonReducers = {

  toggleExpanded: ( state: CommonState ) => {
    state.isExpanded = !state.isExpanded;
  },

  setCommonExpanded: ( state: CommonState, action: PayloadAction<boolean> ) => {
    state.isExpanded = action.payload;
  },

  setCommonPageTitle: ( state: CommonState, action: PayloadAction<string> ) => {
    state.pageTitle = action.payload;
  },

  setCommonPageBreadcrumbs: ( state: CommonState, action: PayloadAction<TBreadcrumbItem[]> ) => {
    state.pageBreadcrumbs = action.payload;
  },

  addCommonPageBreadcrumbs: ( state: CommonState, action: PayloadAction<TBreadcrumbItem> ) => {
    state.pageBreadcrumbs.push( action.payload );
  },
}

export default commonReducers;
