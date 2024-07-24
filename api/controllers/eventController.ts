import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Request, Response } from 'express';

// Collection reference
const colRef = collection(db, "events");

// Get all events
async function getEvents(req: Request, res: Response): Promise<void> {
    getDocs(colRef)
    .then((snapshot) => {
      let events: any = [];
      snapshot.docs.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id });
      });
      res.json(events);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Get a single event
async function getEvent(req: Request, res: Response): Promise<void> {
    const eventRef = doc(db, "events", req.params.id);
    const event = (await getDoc(eventRef)).data();
    res.json(event);
}

// Add a single event
async function addEvent(req: Request, res: Response): Promise<void> {
    const newEvent = await addDoc(colRef, req.body);
    res.json(newEvent.id);
}

// Delete a single event
async function deleteEvent(req: Request, res: Response): Promise<void> {
    const eventRef = doc(db, "events", req.params.id);
    await deleteDoc(eventRef);
    res.json("Event deleted");
}

// Update a single event
async function updateEvent(req: Request, res: Response): Promise<void> {
    res.json({ message: "'/:id' is working to UPDATE a single one" });
}

export { getEvents, getEvent, addEvent, deleteEvent, updateEvent };
