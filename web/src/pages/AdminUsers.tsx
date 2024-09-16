import { useEffect, useState } from "react";
import UserDetails from "@components/legacy/UserDetails";
import { useUsersContext } from "../Hooks/UseUsersContext";
import { User } from "../components/legacy/UserDetails"



export default function AdminUsers() {
  const { users, dispatch } = useUsersContext()
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    const fetchAllUsers = async () => {
      // Not sure why proxy doesn't work?
      const response = await fetch('http://localhost:3000/api/users/')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_USERS', payload: json })
      }
    }

    fetchAllUsers();
  }, [])

  const filteredUsers = selectedYear === 'All' ? users : users.filter(user => user.year === selectedYear)

  return (
    <div className="flex flex-col w-[90%] m-auto my-8 gap-2">
      <div className="flex gap-2">
        <div className="">Filter by year:</div>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="">
          <option value="All">All</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
          <option value="Post-graduate">Post-graduate</option>
          <option value="Other">Other</option>
        </select>
      </div>
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
      {filteredUsers && filteredUsers.map((user: User) => (
        <UserDetails key={user.id} user={user} />
      ))}
    </div>
  );
}