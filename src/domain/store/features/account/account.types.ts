export enum EAccountRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  VISITOR = 'visitor'
}

export interface IAccountTenant {
  id: string;
  slug: string;
  name: string;
  icon?: string;
}

export interface IUserImpl {
  providerId: string;
  email: string;
  displayName: string;
  uid: string;
  phoneNumber: string;
  photoURL: string;
  tenantId: string;
}
export interface AccountState {
  user: IUserImpl
  email: string;
  tenant: IAccountTenant;
  role: EAccountRole;
  token: string;
}
