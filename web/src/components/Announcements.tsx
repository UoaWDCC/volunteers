import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { formatISO } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  message: string;
  startDate: string;
  endDate: string;
  audience: string[];
}

interface User {
  role: string;
}

interface AnnouncementsProps {
  user: User;
}

const Announcements: React.FC<AnnouncementsProps> = ({ user }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const now = new Date();
      const q = query(
        collection(db, 'announcements'),
        where('audience', 'array-contains', user.role),
        where('startDate', '<=', formatISO(now)),
        where('endDate', '>=', formatISO(now))
      );

      const querySnapshot = await getDocs(q);
      const announcementsData: Announcement[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data() as Omit<Announcement, 'id'>;
        announcementsData.push({ ...data, id: doc.id });
      });

      setAnnouncements(announcementsData);
    };

    fetchAnnouncements();
  }, [user.role]);

  return (
    <div>
      {announcements.map((announcement) => (
        <div key={announcement.id}>
          <h3>{announcement.title}</h3>
          <p>{announcement.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;