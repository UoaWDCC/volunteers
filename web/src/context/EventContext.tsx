import React from "react";

interface ReactContextType {
    events: any[];
    setEvents: Function;
    fetchEvents: Function;
}

const EventContext = React.createContext<ReactContextType | null>(null);

export default EventContext;