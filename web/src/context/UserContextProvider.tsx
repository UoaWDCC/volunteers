import { UsersContext } from "./UserContext";
import { User } from "@components/UserDetails";
import { Action } from "./UserContext";
import { ReactNode, useReducer } from "react";
import { useToken } from "./AuthenticationContextProvider";

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
    case 'UPDATE_USER':
      return {
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {...user, ...action.payload}
          }
          return user;
        })
      }
    default:
      return state;
  }
}

export const UsersContextProvider = ({ children } : {children:ReactNode}) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: []
  })

  const token = useToken();

  return (
    <UsersContext.Provider value={{ users: state.users, dispatch, token }}>
      { children }
    </UsersContext.Provider>
  )
}