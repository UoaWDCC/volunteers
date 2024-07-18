import { getUserById, getAllAnnouncements } from "@utils/UserService";
import { useEffect, useState } from "react";

// FirstYear
// SecondYear
// PostGrad
// Other



// get ID from login authentication
const testId = 'AUBf2qRfJKcmkIQfJI4S';

const Users: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any>(null);


  useEffect(() => {
    console.log('useEffect triggered');

    const fetchUser = async () => {
      try {
        const userData = await getUserById(testId);
        setUser(userData);
        console.log(user);

        const announcementData = await getAllAnnouncements();
        setAnnouncements(announcementData);
        console.log(announcements);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // getAnnouncements endpoint
  // send all of user body to backend endpoint
  

  return (
    <div>
      <h1>All Users</h1>
    </div>
  );
};

export default Users;