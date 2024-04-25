import { CommonState } from './common.types';

export const
  commonSlideName = 'common';
export const commonState: CommonState = {
  value: 0,
  isExpanded: false,
  theme: 'light',
  pageTitle: 'CRM',
  pageBreadcrumbs: [ { title: 'Home', href: '/admin' } ],
  pageShowEditDrawer: false,
  editedRecord: null,
  filters: {
    query: '',
  },
};

export default commonState;
