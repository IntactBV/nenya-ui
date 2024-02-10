import { EAccountRoles } from '@uiStore/features/account/account.types';

export type TAccountBase = {
    email: string;
    password?: string;
    confirm?: string
};

export type TAccount = TAccountBase & {
  uid?: string;
  tenantIds?: string[];
  name: string;
  displayName?: string;
  status?: boolean;
  role?: EAccountRoles;
  avatar?: string;
  tenantAccounts?: any[];
};

export interface CanvasAttributes {
  responsive?: boolean;
  withColor?: boolean;
  dimmed?: boolean;
  canvas: { center: boolean; maxWidth?: number };
  category: string;
  title: string;
  props?: Record<string, any>;
}

export type TEntityAttribute = {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  isMain?: boolean;
  showInList?: boolean;
  relation: boolean;
  options?: string;
  status: boolean;
  fieldType?: EEntityFieldType;
};

export type TModulePage = {
  name: string;
  description: string;
  iconType: string;
  icon: string;
};

export type TRendererProps = {
  pageData: any;
};

export enum EEntityFieldType {
  'Attribute' = 1,
  'Entity' = 2,
  'Derived' = 3,
}

export type TEntityAttributeBaseProps = {
  attributeId?: string,
  entityId?: string,
  type: EEntityFieldType,
  relation: boolean,
  label: string;
};

export type TRealm = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  server: string;
  status: boolean;
};
