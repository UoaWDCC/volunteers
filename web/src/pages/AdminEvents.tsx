import { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import AdminEventsTable from "@components/AdminEventsTable";
import AdminAddEvent from "@components/AdminAddEvent";
import AdminEditEvent from "@components/AdminEditEvent";

export default function AdminEvents() {
  /**
   * Extracting necessary values and functions from the event context
   */
  const {
    events,
    setSelectedEvent,
    fetchEvents,
    deleteEvent,
  } = useEventContext(); 

  /**
   * State to manage whether the Add Event or Edit Event forms are displayed
   */
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Fetch events when the component mounts
   */
  useEffect(() => {
    fetchEvents(); 
  }, []);

  /**
   * Handle editing an event
   * Filters the events array to find the event with the matching ID, 
   * sets it as the selected event, and opens the edit form.
   */
  const handleEdit = (id: any) => {
    const [event] = events.filter((event) => event.id === id);
    setSelectedEvent(event);
    setIsEditing(true);
  };

  /**
   * Handle deleting an event
   * Prompts the user for confirmation before deleting the event.
   */
  const handleDelete = async (id: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this event?"
    );
    if (confirmDelete) {
      await deleteEvent(id); 
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