import { UsersContext, Action } from "./UserContext";
import { ReactNode, useReducer } from "react";
import { useToken } from "./AuthenticationContextProvider";

interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
}

const usersReducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter(
          (user: User) => user.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: [],
  });

  const token = useToken();

  return (
    <UsersContext.Provider value={{ users: state.users, dispatch, token }}>
      {children}
    </UsersContext.Provider>
  );
};
