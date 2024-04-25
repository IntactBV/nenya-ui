import type { PayloadAction } from '@reduxjs/toolkit';
import { CommonState, TBreadcrumbItem } from './common.types';

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

  setCommonPageShowEditDrawer: ( state: CommonState, action: PayloadAction<boolean> ) => {
    state.pageShowEditDrawer = action.payload;
  },

  setCommonEditedRecord: ( state: CommonState, action: PayloadAction<any> ) => {
    state.editedRecord = action.payload;
  },

  setCommonFilter: ( state: CommonState, action: PayloadAction<Record<string, any>> ) => {
    state.filters = {
      ...state.filters,
      ...action.payload,
    };
  },
};

export default commonReducers;
