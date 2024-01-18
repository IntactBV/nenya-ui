export type TAccountBase = {
    email: string;
    password?: string;
    confirm?: string
};

export type TAccount = TAccountBase & {
  id?: string;
  tenantIds: string[];
  name: string;
  status: boolean;
  role: EAccountRoles;
  avatar: string;
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

export enum EAccountRoles {
  APP_ADMIN = 'appAdmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AGENT = 'agent',
  OPERATOR = 'operator',
  VISITOR = 'visitor',
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
}

export type TEntityAttributeBaseProps = {
  attributeId?: string,
  entityId?: string,
  type: EEntityFieldType,
  relation: boolean,
};
