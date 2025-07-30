import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';

// Define the Newsletter interface to match the structure of the request body
interface Newsletter {
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterEventIds: string[];
}

// Define the EventDetail interface to match the structure of the event data
interface EventDetail {
    id: string;
    event_title?: string;
    image?: string;
    description?: string;
    tasks?: string;
    notes?: string;
    contact?: string;
    start_date_time?: any;
    end_date_time?: any;  
}

async function createNewsletter(req: Request, res: Response): Promise<void> {
    try {
        const {newsletterTitle, newsletterDescription, newsletterEventIds} = req.body as Newsletter;
        const eventDetails: EventDetail[] = []; // Use the new interface
        // Loop through each event ID and fetch the corresponding event data
        for (const eventId of newsletterEventIds) {
            const eventRef = doc(db, "events", eventId);
            const eventSnapshot = await getDoc(eventRef);
            if (eventSnapshot.exists()) {
                const eventData = eventSnapshot.data();
                if (eventData) {
                    // Map Firestore fields to our EventDetail interface
                    eventDetails.push({
                        id: eventSnapshot.id,
                        event_title: eventData.event_title,
                        image: eventData.image,
                        description: eventData.description,
                        tasks: eventData.tasks,
                        notes: eventData.notes,
                        contact: eventData.contact,
                        start_date_time: eventData.start_date_time,
                        end_date_time: eventData.end_date_time
                    });
                }
            }
        }
        
        const formattedNewsletter = formatNewsLetter(newsletterTitle, newsletterDescription, eventDetails);
        
        // Send success response with the formatted text
        res.status(200).json({
            success: true,
            message: "Newsletter formatted successfully",
            formattedNewsletter
        });

    } catch (error) {
        console.error("Error creating newsletter:", error); // Log the actual error
        res.status(500).json({
            success: false,
            message: "Failed to create newsletter"
        });
    }
}

function formatNewsLetter(title: string, description: string, events: EventDetail[]): string {
    let result = `
    Newsletter Title: ${title}
    Newsletter Description: ${description}
    ------------------------------------
    `;

    for (const event of events) {
        result += `
    Event: ${event.event_title || 'N/A'}
    Image URL: ${event.image || 'N/A'}
    Description: ${event.description || 'N/A'}
    Tasks: ${event.tasks || 'N/A'}
    Notes: ${event.notes || 'N/A'}
    Contact: ${event.contact || 'N/A'}
    Starts: ${event.start_date_time ? new Date(event.start_date_time.seconds * 1000).toLocaleString() : 'N/A'}
    Ends: ${event.end_date_time ? new Date(event.end_date_time.seconds * 1000).toLocaleString() : 'N/A'}
    ------------------------------------
    `;
    }
    return result;
}

async function getAllNewsletters(req: Request, res: Response): Promise<void> {
    try {
        const newslettersRef = collection(db, "newsletters");
        const snapshot = await getDocs(newslettersRef);
        const newsletters = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({
            success: true,
            message: "Newsletters fetched successfully",
            newsletters
        });
    } catch (error) {
        console.error("Error fetching newsletters:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch newsletters"
        });
    }
}

async function saveNewsletterTitle(req: Request, res: Response): Promise<void> {
    try {
        const { title } = req.body;

        if (!title) {
            res.status(400).json({
                success: false,
                message: "Newsletter title is required"
            });
            return;
        }

        const newslettersRef = collection(db, "newsletters");
        const docRef = await addDoc(newslettersRef, {
            title: title,
            createdAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: "Newsletter title saved successfully",
            id: docRef.id
        });
    } catch (error) {
        console.error("Error saving newsletter title:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save newsletter title"
        });
    }
}

export { createNewsletter, getAllNewsletters, saveNewsletterTitle };