import { createContext } from 'react';

interface AnnouncementContextType {
  announcements: string[] | null;
  updateAnnouncements: (newValue: string[] | null) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
  announcements: null,
  updateAnnouncements: () => {},
});

export default AnnouncementContext;