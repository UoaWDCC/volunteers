import { createContext, Dispatch } from "react";
import { User } from "@components/legacy/UserDetails";

export interface Action {
  type: string;
  payload: any;
}

export interface UsersContextType {
  users: User[];
  dispatch: Dispatch<Action>;
  token: string | null;
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined)