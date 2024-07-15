import { User } from "@pages/AdminUsers";
import { useUsersContext } from "../Hooks/UseUsersContext";
import { useState } from "react";
// import { useEffect } from 'react';

const UserDetails = ({ user }: { user: User }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [studentID, setStudentID] = useState(user.studentID);
  const [isEditMode, setIsEditMode] = useState(false);

  const { dispatch } = useUsersContext()

  const handleClickDelete = async () => {
    const confirmDelete = window.confirm('Are you sure want to remove ' + user.firstName + '?')

    if (confirmDelete) {
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
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  const handleSave = async () => {
    const updatedUser = {id: user.id, firstName, lastName, studentID}

    const response = await fetch('http://localhost:3000/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    })
    const json = await response.json()
    
    if (response.ok) {
      console.log("User updated", json)
    }

    toggleEditMode();
  }

  const handleCancel = () => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setStudentID(user.studentID)

    toggleEditMode();
  }

  return (
    <div className="flex border border-gray-600 justify-between items-center h-10 px-2 rounded">
        {isEditMode ? (
          <div className="flex">
            <input type="text" className="w-40 m-0" value={firstName} 
              onChange={(e) => (setFirstName(e.target.value))}
            />
            <input type="text" className="w-40 m-0" value={lastName} 
              onChange={(e) => (setLastName(e.target.value))}
            />
            <input type="text" className="w-40 m-0" value={studentID} 
              onChange={(e) => (setStudentID(e.target.value))}
            />
          </div>
          
        ) : (
          <div className="flex">
            <p className="w-40 m-0">{firstName}</p>
            <p className="w-40 m-0">{lastName}</p>
            <p className="w-40 m-0">{studentID}</p>
          </div>
        )}

        {isEditMode ? (
          <div className="flex gap-4">
            <span onClick={handleCancel}className="hover:cursor-pointer border border-gray-400 px-2 rounded">Cancel</span>
            <span onClick={handleSave}className="hover:cursor-pointer rounded px-2 text-green-600 border border-green-600">Save</span>
          </div>
        ) : (
          <div className="flex gap-4">
            <span onClick={toggleEditMode}className="hover:cursor-pointer border border-gray-400 px-2 rounded">Edit</span>
            <span onClick={handleClickDelete} className="hover:cursor-pointer rounded px-2 text-red-600 border border-red-600">Delete</span>
          </div>
        )}
      </div>
  )
}

export default UserDetails