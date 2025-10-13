import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects

// Collection reference
const colRef = collection(db, "events");

// Get all events
async function getEvents(req: Request, res: Response): Promise<void> {
    getDocs(colRef)
    .then((snapshot) => {
      let events: any = [];
      snapshot.docs.forEach((doc) => {
        // Change Temporal to Date object
        
        let data = doc.data();
        data.start_date_time = data.start_date_time.toDate();
        data.end_date_time = data.end_date_time.toDate();

        events.push({ ...data, id: doc.id });  // Push each document's data and its ID into the events array
      });
      res.json(events);  // Send the events data as JSON response
    })
    .catch((err) => {
      console.log(err.message);  // Log any errors that occur
    });
}

// Get a single event
async function getEvent(req: Request, res: Response): Promise<void> {
    const eventRef = doc(db, "events", req.params.id);  // Reference to the specific event document
    const event = (await getDoc(eventRef)).data();  // Fetch the document and get its data
    res.json(event);  // Send the event data as JSON response
}

// Add a single event (updated)
async function addEvent(req: Request, res: Response): Promise<void> {
    const { is_external, external_registration_url, ...rest } = req.body;
    
    // Validate URL structure if provided
    if (external_registration_url && !/^https?:\/\/.+\..+/.test(external_registration_url)) {
        res.status(400).json({ error: "Please enter a valid URL (include http:// or https://)" });
        return;
    }

    // Validate external events
    if (is_external && !external_registration_url) {
        res.status(400).json({ 
            error: "External registration URL is required for external events",
            fields: ["external_registration_url"]
        });
        return;
    }

    try {
        await addDoc(colRef, {
            ...rest,
            is_external: Boolean(is_external),
            external_registration_url: is_external ? external_registration_url : null,
            createdAt: new Date() // Good practice for sorting
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Event creation failed" });
    }
}

// Update a single event (updated)
async function updateEvent(req: Request, res: Response): Promise<void> {
    const { is_external, external_registration_url, ...updateData } = req.body;
    const eventRef = doc(db, "events", req.params.id);

    // Same validation as addEvent
    if (is_external && !external_registration_url) {
        res.status(400).json({ error: "URL required for external events" });
        return;
    }

    try {
        await updateDoc(eventRef, {
            ...updateData,
            is_external: Boolean(is_external),
            external_registration_url: is_external ? external_registration_url : null,
            updatedAt: new Date()
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Event update failed" });
    }
}

// Delete a single event
async function deleteEvent(req: Request, res: Response): Promise<void> {
    const eventRef = doc(db, "events", req.params.id);  // Reference to the specific event document
    await deleteDoc(eventRef);  // Delete the document
    res.json("Event deleted");  // Send a confirmation message as JSON response
}


export { getEvents, getEvent, addEvent, deleteEvent, updateEvent };  // Export functions for use in other modules
