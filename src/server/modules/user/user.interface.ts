export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status?: UserStatus;
  avatar?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string | null;
  };
}

