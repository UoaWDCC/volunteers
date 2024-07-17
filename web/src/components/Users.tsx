import { getUserById } from "@utils/UserService";
import { useEffect, useState } from "react";


const testId = 'AUBf2qRfJKcmkIQfJI4S';

const Users: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log('useEffect triggered');

    const fetchUser = async () => {
      try {
        const userData = await getUserById(testId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
    </div>
  );
};

export default Users;