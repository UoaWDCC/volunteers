import React from "react";

interface ReactContextType {
    events: any[];
    setEvents: React.Dispatch<React.SetStateAction<any[]>>;
    selectedEvent: any;
    setSelectedEvent: React.Dispatch<React.SetStateAction<any | null>>;
    fetchEvents: () => Promise<void>;
    addEvent: (newEvent: any) => Promise<void>;
    editEvent: (id: string, updatedEvent: any) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
  }
  

const EventContext = React.createContext<ReactContextType | null>(null);

export default EventContext;