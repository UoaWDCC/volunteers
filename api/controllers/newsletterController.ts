import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Newsletter {
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterEventIds: string[];
}

async function createNewsletter(req: Request, res: Response): Promise<void> {
    try {
        console.log('Request body:', req.body);
        const {newsletterTitle, newsletterDescription, newsletterEventIds} = req.body as Newsletter;
        const eventDetails = [];
        // Loop through each event ID and fetch the corresponding event data
        for (const eventId of newsletterEventIds) {
            const eventRef = doc(db, "events", eventId);
            const eventSnapshot = await getDoc(eventRef);
            if (eventSnapshot.exists()) {
                const eventData = eventSnapshot.data();
                if (eventData) {
                    eventDetails.push({
                        // Push each document's data and its ID into the events array
                        ...eventData,
                        id: eventSnapshot.id
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
        res.status(500).json({
            success: false,
            message: "Failed to create newsletter"
        });
    }
}

function formatNewsLetter(title: string, description: string, events: any[]): string {
    let result = `
    Title: ${title}
    Description: ${description}
    Number of Events: ${events.length}
    `;
    return result;
}

export { createNewsletter };