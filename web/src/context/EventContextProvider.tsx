import {useState} from "react";
import EventContext from "./EventContext";

import { ReactNode } from "react";

export default function EventContextProvider({children}: { children: ReactNode }) {
    // Create a state variable to store events. Temporary value is an empty array
    const [events, setEvents] = useState([]);

    // Get all events and set as default value of event state
    fetch('http://localhost:3000/api/')
    .then((res) => res.json())
    .then((data) => {
       console.log(data);
       setEvents(data);
    })

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
            }}
        >
          {children}
        </EventContext.Provider>
      );
}