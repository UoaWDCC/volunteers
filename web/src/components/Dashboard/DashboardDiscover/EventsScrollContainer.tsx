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

interface EventsProps {
    events: Event[];
}

export default function EventsScrollContainer({events}: EventsProps) {
    
    return (
        <div className="dashboard bg-white-background h-96 overflow-y-scroll">
            {events.map((e, index) => (
                <Event key={index} event={e} />
            ))
            }

        </div>
    )
}