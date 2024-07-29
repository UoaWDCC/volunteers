import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AdminEventsTable from "@components/AdminEventsTable";
import AdminAddEvent from "@components/AdminAddEvent";
import AdminHeader from "@components/AdminHeader";

export default function AdminEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Get All Events
    const getEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const events: any[] = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setEvents(events);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getEvents();
    },[]);

    return (
        <div className="">
            {isAdding ? <AdminAddEvent 
            events={events}
            setEvents={setEvents}
            setIsAdding={setIsAdding}
            getEvents={getEvents}
            /> : <AdminEventsTable event={events} setIsAdding={setIsAdding}/>}
            
        </div>
    )
}