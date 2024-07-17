import { useEffect } from "react";
import UserDetails from "@components/UserDetails";
import { useUsersContext } from "../Hooks/UseUsersContext";
import { User } from "../components/UserDetails"



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
      <div className="flex flex-col w-[90%] m-auto my-8 gap-2">
        <div className="flex flex-[0_0_75%] px-2">
          <div className="flex-[1]">First Name</div>
          <div className="flex-[1]">Last Name</div>
          <div className="flex-[2]">Email</div>
          <div className="flex-[1]">Mobile</div>
          <div className="flex-[1]">Date of Birth</div>
          <div className="flex-[1]">Gender</div>
          {/*Spacer div for alignment*/}
          <div className="flex-[0_0_21%]"></div>
        </div>
        {users && users.map((user: User) => (
          <UserDetails key={user.id} user={user} />
        ))}
      </div>
  );
}