import { User } from "@pages/AdminUsers";
import { useUsersContext } from "../Hooks/UseUsersContext";
import { useState } from "react";
// import { useEffect } from 'react';

const UserDetails = ({ user }: { user: User }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [studentID, setStudentID] = useState(user.studentID);
  const { dispatch } = useUsersContext()

  const handleClickDelete = async () => {
    const response = await fetch('http://localhost:3000/api/removeUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id })
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_USER', payload: json})
    }
  }

  const handleClickEdit = () => {

  }

  return (
    <div className="flex border justify-between items-center h-10 px-2">
      <div className="flex">
        <p className="w-40 m-0">{firstName}</p>
        <p className="w-40 m-0">{lastName}</p>
        <p className="w-40 m-0">{studentID}</p>
      </div>
      <div className="flex gap-4">
        <span onClick={handleClickEdit}className="hover:cursor-pointer">Edit</span>
        <span onClick={handleClickDelete} className="hover:cursor-pointer">Delete</span>
      </div>
    </div>
  )
}

export default UserDetails