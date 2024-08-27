import { useState, useEffect, ReactNode } from "react";
import EventContext from "./EventContext";

export default function EventContextProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch all events from the API
    const fetchEvents = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/events");
        const data = await response.json();
        setEvents(data);
    } catch (error) {
        console.log(error);
    }
    };

    useEffect(() => {
    fetchEvents();
    }, []);

    // Add an event using the API
    const addEvent = async (newEvent: any) => {
    try {
    const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
    });

    if (response.ok) {
        const result = await response.json();
        console.log("Event added successfully with ID:", result);
    } else {
        console.log("Failed to add event:", response.statusText);
    }

    fetchEvents(); // Refresh the event list
    } catch (error) {
    console.log(error);
    }
    };
  

    // Edit an event using the API
    const editEvent = async (id: string, updatedEvent: any) => {
    try {
        await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
        });
        fetchEvents(); 
    } catch (error) {
        console.log(error);
    }
    };

    // Delete an event using the API
    const deleteEvent = async (id: string) => {
    try {
        await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "DELETE",
        });
        fetchEvents(); // Refresh the event list
    } catch (error) {
        console.log(error);
    }
    };

    return (
    <EventContext.Provider
        value={{
        events,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        fetchEvents,
        addEvent,
        editEvent,
        deleteEvent,
        }}
    >
        {children}
    </EventContext.Provider>
    );
    }
