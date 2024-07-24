import {useState} from "react";
import EventContext from "./EventContext";

import { ReactNode } from "react";

export default function EventContextProvider({children}: { children: ReactNode }) {
    // Create a state variable to store events. Temporary value is an empty array
    const [events, setEvents] = useState([]);

    async function fetchEvents() {
        // Fetch events from API
        fetch("http://localhost:3000/api/events")
            .then(response => response.json())
            .then(data => {
                setEvents(data);
            })
            .catch(error => console.error(error));
    }

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                fetchEvents
            }}
        >
          {children}
        </EventContext.Provider>
      );
}