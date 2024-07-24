import React, { useState } from "react";
import AnnouncementContext from "./AnnouncementContext";

interface AnnouncementContextProviderProps {
  children: React.ReactNode;
}

const AnnouncementContextProvider: React.FC<AnnouncementContextProviderProps> = ({
  children,
}) => {
  const [announcements, setAnnouncements] = useState<string[] | null>(null);

  const updateAnnouncements = (newValue: string[] | null) => {
    setAnnouncements(newValue);
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        updateAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementContextProvider;