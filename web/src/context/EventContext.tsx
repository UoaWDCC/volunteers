import React from "react";

interface ReactContextType {
    events: any[];
    setEvents: Function;
    fetchEvents: Function;
    deleteEvent: (eventId: string) => Promise<void>;  // Add deleteEvent
    editEvent: (eventId: string, updatedEvent: any) => Promise<void>;  // Add editEvent
}

const EventContext = React.createContext<ReactContextType | null>(null);

export default EventContext;