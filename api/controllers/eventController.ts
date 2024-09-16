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

// Add a single event
async function addEvent(req: Request, res: Response): Promise<void> {
    const newEvent = await addDoc(colRef, req.body);  // Add a new document with data from the request body
    res.json(newEvent.id);  // Send the ID of the newly added event as JSON response
}

// Delete a single event
async function deleteEvent(req: Request, res: Response): Promise<void> {
    const eventRef = doc(db, "events", req.params.id);  // Reference to the specific event document
    await deleteDoc(eventRef);  // Delete the document
    res.json("Event deleted");  // Send a confirmation message as JSON response
}

// Update a single event
async function updateEvent(req: Request, res: Response): Promise<void> {
    res.json({ message: "'/:id' is working to UPDATE a single one" });  // Placeholder message for updating an event
}

export { getEvents, getEvent, addEvent, deleteEvent, updateEvent };  // Export functions for use in other modules
