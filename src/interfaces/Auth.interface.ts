import { IUser } from "./User.interface";

export interface IAuth {
  userId: string;
  mobileNumber: string;
  name: string;
  token: string;
  isAuthenticated: boolean;
}

export interface IAuthWithRole extends IAuth {
  role: IUser["role"] | null;
}

export interface JwtPayload {
  exp: number;
}
