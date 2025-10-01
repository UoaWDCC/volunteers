import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';

interface Newsletter {
    newsletterTitle: string;
    newsletterSubheader: string;
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
    start_date_time?: any;
    end_date_time?: any;  
}

function generateCustomIdentifier(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

async function createNewsletter(req: Request, res: Response): Promise<void> {
    try {
        const {newsletterTitle, newsletterSubheader, newsletterDescription, newsletterEventIds} = req.body as Newsletter;
        const eventDetails: EventDetail[] = [];
        for (const eventId of newsletterEventIds) {
            const eventRef = doc(db, "events", eventId);
            const eventSnapshot = await getDoc(eventRef);
            if (eventSnapshot.exists()) {
                const eventData = eventSnapshot.data();
                if (eventData) {
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
        
        const formattedNewsletter = formatNewsLetter(newsletterTitle, newsletterSubheader, newsletterDescription, eventDetails);
        
        res.status(200).json({
            success: true,
            message: "Newsletter formatted successfully",
            formattedNewsletter
        });

    } catch (error) {
        console.error("Error creating newsletter:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create newsletter"
        });
    }
}

function formatNewsLetter(title: string, subheader: string, description: string, events: EventDetail[]): string {
    let eventsHtml = '';
    for (const event of events) {
        const startDate = event.start_date_time ? new Date(event.start_date_time.seconds * 1000).toLocaleString() : 'N/A';
        const endDate = event.end_date_time ? new Date(event.end_date_time.seconds * 1000).toLocaleString() : 'N/A';
        
        eventsHtml += `
            <div class="event-card">
                <h3 class="event-title">${event.event_title || 'Event Title Not Available'}</h3>
                
                ${event.image ? `<img src="${event.image}" alt="${event.event_title || 'Event'}" class="event-image" />` : ''}
                
                ${event.description ? `
                <div class="event-section">
                    <h4>Description:</h4>
                    <p>${event.description}</p>
                </div>` : ''}
                
                ${event.tasks ? `
                <div class="event-section">
                    <h4>Tasks:</h4>
                    <p>${event.tasks}</p>
                </div>` : ''}
                
                ${event.notes ? `
                <div class="event-section">
                    <h4>Notes:</h4>
                    <p>${event.notes}</p>
                </div>` : ''}
                
                <div class="event-details">
                    <div class="detail-item">
                        <span class="detail-label">Start Time:</span><br>
                        <span class="detail-value">${startDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">End Time:</span><br>
                        <span class="detail-value">${endDate}</span>
                    </div>
                </div>
                
                ${event.contact ? `
                <div class="event-section">
                    <h4>Contact:</h4>
                    <p>${event.contact}</p>
                </div>` : ''}
            </div>`;
    }

    const htmlResult = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter Preview</title>    
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .container {
            background-color: #ffffff;
            padding: 0;
        }
        .newsletter-title {
            text-align: center;
            margin-bottom: 20px;
        }
        .title-box {
            border: 2px solid #000000;
            padding: 10px 20px;
            display: inline-block;
            background-color: #ffffff;
        }
        .title-box h1 {
            margin: 0;
            font-size: 16px;
            font-weight: normal;
            color: #000000;
            letter-spacing: 1px;
        }
        .welcome-section {
            text-align: center;
            margin: 30px 0 20px 0;
        }
        .welcome-title {
            color: #E74C3C;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
        .description {
            text-align: left;
            margin-bottom: 30px;
            padding: 0 20px;
        }
        .description p {
            color: #333;
            line-height: 1.6;
            margin: 10px 0;
            font-size: 14px;
        }
        .event-card {
            border-top: 1px solid #cccccc;
            margin: 30px 0;
            padding: 20px 0;
        }
        .event-title {
            color: #333;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: bold;
        }
        .event-image {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 15px 0;
        }
        .event-section {
            margin: 15px 0;
        }
        .event-section h4 {
            color: #333;
            margin: 15px 0 5px 0;
            font-size: 14px;
            font-weight: bold;
        }
        .event-section p {
            color: #666;
            line-height: 1.5;
            margin: 5px 0;
            font-size: 14px;
        }
        .event-details {
            margin: 15px 0;
        }
        .detail-item {
            margin: 10px 0;
        }
        .detail-label {
            color: #333;
            font-weight: bold;
            font-size: 14px;
        }
        .detail-value {
            color: #666;
            font-size: 14px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #cccccc;
        }
        .footer-text {
            color: #4472C4;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        @media (max-width: 600px) {
            body { 
                padding: 10px; 
            }
            .title-box h1 { 
                font-size: 14px; 
            }
            .welcome-title {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        
        <div class="newsletter-title">
            <div class="title-box">
                <h1>${title.toUpperCase()}</h1>
            </div>
        </div>
             
        <div class="welcome-section">
            <div class="welcome-title">${subheader}</div>
        </div>
        
        <div class="description">
            <p>${description}</p>
        </div>

        <div class="events">
            ${eventsHtml}
        </div>

        <div class="footer">
            <div class="footer-text">
                UOA VOLUNTEERS CLUB
            </div>
        </div>
    </div>
</body>
</html>`;

    return htmlResult;
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

export { createNewsletter, saveNewsletterTitle };