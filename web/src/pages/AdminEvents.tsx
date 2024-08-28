import { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import AdminEventsTable from "@components/AdminEventsTable";
import AdminAddEvent from "@components/AdminAddEvent";
import AdminEditEvent from "@components/AdminEditEvent";

export default function AdminEvents() {
  const {
    events,
    setSelectedEvent,
    fetchEvents,
    addEvent,
    editEvent,
    deleteEvent,
  } = useEventContext(); // Get values from context

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEvents(); // Fetch events using the context method
  }, []);

  // Handle edit event
  const handleEdit = (id: any) => {
    const [event] = events.filter((event) => event.id === id);
    setSelectedEvent(event);
    setIsEditing(true);
  };

  // Handle delete event
  const handleDelete = async (id: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this event?"
    );
    if (confirmDelete) {
      await deleteEvent(id); // Use context method to delete the event
    }
  };

  return (
    <div className="">
      {isEditing && (
        <AdminEditEvent
          events={events}
          selectedEvent={setSelectedEvent}
          setIsEditing={setIsEditing}
          fetchEvents={fetchEvents}
        />
      )}
      {isAdding ? (
        <AdminAddEvent
          events={events}
          setIsAdding={setIsAdding}
          fetchEvents={fetchEvents}
        />
      ) : (
        <AdminEventsTable
          events={events}
          setIsAdding={setIsAdding}
          handleDelete={handleDelete}
          selectedEvent={setSelectedEvent}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}

