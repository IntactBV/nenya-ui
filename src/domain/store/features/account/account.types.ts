export enum EAccountRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  VISITOR = 'visitor'
}

export interface IAccountTenant {
  slug: string;
  name: string;
}

export interface AccountState {
  email: string;
  tenant: IAccountTenant;
  role: EAccountRole;
  token: string;
}
