import React, { useEffect, useState } from 'react';
import { getUserById, getAnnouncementByUser } from '@utils/UserService';


interface User {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Announcement {
  id: string;
  Title: string;
  Link: string;
  StartDate: {
    seconds: number;
    nanoseconds: number;
  };
  EndDate: {
    seconds: number;
    nanoseconds: number;
  };
  Paragraph: string;
  Filters: string[];
  // Add more properties as needed
}


// FirstYear
// SecondYear
// PostGrad
// Other
const testId = 'ok9qSuYuwabLYc5UZurs';

const AnnouncementList: React.FC<{ announcements: Announcement[] }> = ({ announcements }) => (
  <div>
    <h2>Announcements</h2>
    <ul>
      {announcements.map((announcement) => (
        <li key={announcement.id}>
          <h3>{announcement.Title}</h3>
          <p>{announcement.Paragraph}</p>
          <p>Start Date: {new Date(announcement.StartDate.seconds * 1000).toLocaleDateString()}</p>
          <p>End Date: {new Date(announcement.EndDate.seconds * 1000).toLocaleDateString()}</p>
          <p>Filters: {announcement.Filters.join(', ')}</p>
          <a href={announcement.Link}>Link</a>
        </li>
      ))}
    </ul>
  </div>
);

const ShowCaseUserAnnouncements: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null);

  useEffect(() => {
    const fetchUserAndAnnouncements = async () => {
      try {
        const userData = await getUserById(testId);
        setUser(userData);
        console.log(user);

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
      { announcements ? (
        <div>
          <AnnouncementList announcements={announcements} />
        </div>
      ) : (
        <p>Loading user data and announcements...</p>
      )}
    </div>
  );
};

export default ShowCaseUserAnnouncements;