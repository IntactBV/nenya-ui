import { RootState } from '../../store';

export const selectCommonExpanded = ( state: RootState ) => {
  return state.common?.isExpanded;
}

export const selectCommonPageHead = ( state: RootState ) => {
  return {
    title: state.common?.pageTitle,
    breadcrumbs: state.common?.pageBreadcrumbs
  }
}

