export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}
