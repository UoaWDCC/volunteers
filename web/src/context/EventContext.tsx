import { createContext, useContext } from "react";

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
  

  const EventContext = createContext<ReactContextType | undefined>(undefined);

  export function useEventContext() {
    const context = useContext(EventContext);
    if (context === undefined) {
      throw new Error("useEventContext must be used within an EventContextProvider");
    }
    return context;
  }
  

export default EventContext;