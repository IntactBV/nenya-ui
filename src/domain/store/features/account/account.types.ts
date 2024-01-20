export enum EAccountRoles {
  APP_ADMIN = 'appAdmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  AGENT = 'agent',
  OPERATOR = 'operator',
  VISITOR = 'visitor',
}

export interface IUserImpl {
  providerId: string;
  email: string;
  displayName: string;
  uid: string;
  phoneNumber: string;
  photoURL: string;
  tenant?: string;
  tenantId?: string;
  tenantName?: string;
  tenantSlug?: string;
  role: EAccountRoles;
}

export type TAccountTenant = {
  tenantId: string;
  tenantSlug?: string;
  tenantName?: string;
  role: string;
  avatar?: string;
};
export interface AccountState {
  user: IUserImpl
  email: string;
  tenant: TAccountTenant;
  tenantAccounts: TAccountTenant[];
  role: EAccountRoles;
  token: string;
}
