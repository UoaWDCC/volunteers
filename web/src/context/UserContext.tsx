import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { User } from "@pages/AdminUsers";

interface Action {
  type: string;
  payload: any;
}

interface UsersContextType {
  users: User[];
  dispatch: Dispatch<Action>
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const usersReducer = (state: {users: User[]}, action: Action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        users: action.payload
      }
    case 'DELETE_USER':
      return {
        users: state.users.filter((user) => user.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export const UsersContextProvider = ({ children } : {children:ReactNode}) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: []
  })

  return (
    <UsersContext.Provider value={{ users: state.users, dispatch }}>
      { children }
    </UsersContext.Provider>
  )
}