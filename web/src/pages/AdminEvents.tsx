import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AdminEventsTable from "@components/AdminEventsTable";
import AdminAddEvent from "@components/AdminAddEvent";
import AdminEditEvent from "@components/AdminEditEvent";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Get All Events
  const getEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const events: any[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Edit an Event
  const handleEdit = (id:any) => {
    const [event] = events.filter(event => event.id === id)
    setSelectedEvent(event)
    setIsEditing(true);
  }

  // Delete an Event
  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are you sure want to remove this event?"
    );
    if (confirmDelete) {
        deleteDoc(doc(db, "events", id));
        getEvents();
    }
  };

  return (
    <div className="">
        {isEditing && <AdminEditEvent
        events={events}
        selectedEvent={selectedEvent}
        setEvents={setEvents}
        setIsEditing={setIsEditing}
        getEvents={getEvents}
    />}
      {isAdding ? (
        <AdminAddEvent
          events={events}
          setEvents={setEvents}
          setIsAdding={setIsAdding}
          getEvents={getEvents}
        />
      ) : (
        <AdminEventsTable
          event={events}
          setIsAdding={setIsAdding}
          handleDelete={handleDelete}
          selectedEvent={setSelectedEvent}
          handleEdit={handleEdit}
          setEvents={setEvents}
          getEvents={getEvents}
        />
      )}
    </div>
  );
}
