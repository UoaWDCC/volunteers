import { useEffect } from "react";
import UserDetails from "@components/UserDetails";
import { useUsersContext } from "../Hooks/UseUsersContext";

// Has to be a better way to do this. Users database kinda a mess so not sure what parameters there should be
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  studentID: string;
}

export default function AdminUsers() {
  const {users, dispatch} = useUsersContext()

  useEffect(() => {
    const fetchAllUsers = async () => {
      // Not sure why proxy doesn't work?
      const response = await fetch('http://localhost:3000/api/getUsers')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    fetchAllUsers();
  }, [])

  useEffect(() => {
    console.log("users updated", users)
  }, [users])

  return (
      <div className="flex flex-col w-[80%] m-auto my-8 gap-2">
        <div className="flex flex-row px-2">
          <div className="w-40">First Name</div>
          <div className="w-40">Last Name</div>
          <div className="w-40">Student ID</div>
        </div>
        {users && users.map((user: User) => (
          <UserDetails key={user.id} user={user} />
        ))}
      </div>
  );
}