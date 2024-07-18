import { getUserById, getAnnouncementByUser } from "@utils/UserService";
import { useEffect, useState } from "react";

// FirstYear
// SecondYear
// PostGrad
// Other



// get ID from login authentication
const testId = '7pBAPzYW3br28BOsraoH';

const Users: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any>(null);


  useEffect(() => {
    console.log('useEffect triggered');
  
    const fetchUserAndAnnouncements = async () => {
      try {
        const userData = await getUserById(testId);
        setUser(userData);
  
        const announcementData = await getAnnouncementByUser(userData);
        setAnnouncements(announcementData);
      } catch (error) {
        console.error('Error fetching user or announcements:', error);
      }
    };
  
    fetchUserAndAnnouncements();
  }, []);


  return (
    <div>
      <h1>All Users</h1>
    </div>
  );
};

export default Users;