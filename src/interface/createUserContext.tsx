import type { User, UserCredential } from "firebase/auth";
import type ICreateUser from "./createUser";

export interface IauthContextType {
  user: User | null;
  plan: "free" | "premium";
  isPremium: boolean;
  authLoading: boolean;
  createUserWithMail: (data: ICreateUser) => Promise<UserCredential>;
  loginInWIthMailAndPassword: (data: ICreateUser) => Promise<UserCredential>;
  loginInWithToken: (token: string) => Promise<UserCredential>;
  logoutUser: () => Promise<boolean>;
  useDB: ()=> any; 
}