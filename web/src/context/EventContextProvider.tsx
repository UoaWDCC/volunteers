import { useState, useEffect } from "react";
import EventContext from "./EventContext";

import { ReactNode } from "react";

export default function EventContextProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState([]);

    async function fetchEvents() {
        try {
            const response = await fetch("http://localhost:3000/api/events");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteEvent(eventId: string) {
        try {
            await fetch(`http://localhost:3000/api/events/${eventId}`, {
                method: "DELETE",
            });
            // Fetch the updated events list after deletion
            fetchEvents();
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    }

    async function editEvent(eventId: string, updatedEvent: any) {
        try {
            await fetch(`http://localhost:3000/api/events/${eventId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvent),
            });
            // Fetch the updated events list after editing
            fetchEvents();
        } catch (error) {
            console.error("Failed to edit event:", error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                fetchEvents,
                deleteEvent,
                editEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}
