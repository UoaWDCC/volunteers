import { getAllUsers } from "@utils/UserService";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    console.log('useEffect triggered'); // Add a log to check if useEffect is triggered

    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchUsers();
  }, []);

  console.log('Component rendering'); // Add a log to check if component is rendering

  return (
    <div>
      <h1>All Users</h1>
      {/* Render users here */}
    </div>
  );
};

export default Users;