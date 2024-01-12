import { ATTRIBUTE_TYPES } from './domain.constants';
import { EEntityFieldType } from './types';

export type TAttributesType = typeof ATTRIBUTE_TYPES[ number ];

export interface IAttribute {
  id?: string;
  slug: string;
  name: string;
  description: string;
  type: TAttributesType;
  options: Record<string, any> | null;
  status?: boolean;
  isMain?: boolean;
  showInList?: boolean;
  order?: number;
  entityAttributeId?: string;
  fieldType: EEntityFieldType;
}

export interface IEntity {
  id?: string;
  slug: string;
  name: string;
  description: string;
  status?: boolean;
  attributeIds?: IAttribute[];
  attributes?: IAttribute[];
}

export interface IModule {
  id?: string;
  slug: string;
  name: string;
  description: string;
  status: boolean;
  entityIds?: string[];
  entities?: IEntity[];
  iconType?: string;
  icon?: string;
}

export type TOrderedItem = {
  id: string;
  order: number;
};

export interface ITenant {
  id?: string;
  slug: string;
  name: string;
  description?: string;
  status?: boolean;
  modules?: TOrderedItem[];
}
