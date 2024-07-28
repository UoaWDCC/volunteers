import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AdminTable from "@components/AdminTable";


export default function AdminEvents() {
    const [events, setEvents] = useState<any[]>([]);

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
            <AdminTable event={events}/>
        </div>
    )
}