import { User } from "@pages/AdminUsers";
import { useUsersContext } from "../Hooks/UseUsersContext";
// import { useEffect } from 'react';

const UserDetails = ({ user }: { user: User }) => {
  const { dispatch } = useUsersContext()

  const handleClick = async () => {
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

  return (
    <div className="flex border">
      <p className="w-40">{user.firstName}</p>
      <p className="w-40">{user.lastName}</p>
      <p className="w-40">{user.studentID}</p>
      <span onClick={handleClick} className="flex justify-self-end hover:cursor-pointer">Delete</span>
    </div>
  )
}

export default UserDetails