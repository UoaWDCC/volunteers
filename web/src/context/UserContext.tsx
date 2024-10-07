import { createContext, Dispatch } from "react";

export interface Action {
  type: string;
  payload: any;
}

export interface UsersContextType {
  users: any; // make sure to change this to the correct type
  dispatch: Dispatch<Action>;
  token: string | null;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);
