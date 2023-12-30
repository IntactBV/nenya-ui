import { RootState } from '../../store';

export const selectCommonExpanded = ( state: RootState ) => state.common?.isExpanded;

export const selectCommonPageHead = ( state: RootState ) => ({
  title: state.common?.pageTitle,
  breadcrumbs: state.common?.pageBreadcrumbs,
});

export const selectCommonPageShowEditDrawer = ( state: RootState ) => (
  state.common?.pageShowEditDrawer
);

export const selectCommonEditedRecord = ( state: RootState ) => state.common?.editedRecord;

export const selectCommnFilters = ( state: RootState ) => state.common?.filters;
