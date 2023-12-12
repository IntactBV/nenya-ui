export type TAccountBase = {
    email: string;
    password: string;
    confirm?: string
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
  ADMIN = 'admin',
  EDITOR = 'editor',
  AGENT = 'agent'
}

export type TEntityAttribute = {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  options?: string;
  status: boolean;
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

export type TEntityAttributeBaseProps = {
  attributeId: string,
  isMain: boolean
};
