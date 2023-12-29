export type TTheme = 'light' | 'dark';

export type TBreadcrumbItem = {
  title: string;
  href: string;
};
export interface CommonState {
  value: number;
  isExpanded: boolean;
  theme: TTheme;
  pageTitle: string;
  pageBreadcrumbs: TBreadcrumbItem[];
  pageShowEditDrawer: boolean;
  editedRecord: any;
}
