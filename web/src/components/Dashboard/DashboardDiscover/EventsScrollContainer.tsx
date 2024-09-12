import { useEffect, useState } from "react";
import Event from "./Event.tsx"
import axios from "axios";

type Event = {
    event_title: string;
    description: string;
    tasks: string;
    notes: string;
    contact: string;
    tag: string[];
    start_date_time: Date;
    end_date_time: Date;
    location: string;
    image: string;
    host: string;
}

interface EventProps {
    event: Event;
}

export default function EventsScrollContainer() {
    const [events, setEvents] = useState<Event[]>([]);

    // Get events from backend
    useEffect(() => {
        axios.get("http://localhost:3000/api/events")
            .then((response) => {
                console.log(response.data);
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    , []);
    

    return (
        <div className="dashboard bg-white-background h-96 overflow-y-scroll">
            {events.map((e) => (
                <Event event={e} />
            ))
            }

        </div>
    )
}