import { UsersContext } from "../context/UserContext";
import { useContext } from 'react'

export const useUsersContext = () => {
  const context = useContext(UsersContext)

  if (!context) {
    throw Error('useUsersContext must be used inside a UsersContextProvider')
  }

  return context
}