import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Newsletter {
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterEventIds: string[];
}

interface EventDetail {
    id: string;
    event_title?: string;
    image?: string;
    description?: string;
    tasks?: string;
    notes?: string;
    contact?: string;
    start_date_time?: any; // Or a more specific Date type if you parse it
    end_date_time?: any;   // Or a more specific Date type if you parse it
    // Add any other fields you expect from eventData
}

async function createNewsletter(req: Request, res: Response): Promise<void> {
    try {
        console.log('Request body:', req.body);
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
                        // Add other mappings as needed
                    });
                }
            }
        }
        
        // Format newsletter using the existing helper function
        const formattedNewsletter = formatNewsLetter(newsletterTitle, newsletterDescription, eventDetails);
        
        // Log the formatted output (for testing purposes)
        console.log('Formatted Newsletter:');
        console.log(formattedNewsletter);
        
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
    Number of Events: ${events.length}
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

export { createNewsletter };