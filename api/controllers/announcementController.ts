import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, QuerySnapshot } from 'firebase/firestore';
import { Request, Response } from 'express';


const colRef = collection(db, "Announcements");


export async function getAllAnnouncements(req: Request, res: Response): Promise<void> {
    const userDocs = await getDocs(colRef);
    const announcements = userDocs.docs.map(doc => doc.data());
    
    res.json(announcements);
    
    // console.log(announcements);
}


export async function getAnnouncementByUser(req: Request, res: Response): Promise<void> {    
    try {
        const currentLocalTime = new Date();
        console.log(currentLocalTime);


        const querySnapshot = await getDocs(colRef);
        const announcements = querySnapshot.docs
            .filter((doc) => {
                const startDate = doc.data().StartDate;
                const endDate = doc.data().EndDate;

                console.log('Start Date:', startDate.toDate(), 'End Date:', endDate.toDate(), 'Current Time:', currentLocalTime);
                return startDate.toDate() <= currentLocalTime && currentLocalTime <= endDate.toDate();
            })
            .map((doc) => doc.data());
        
        console.log(announcements);

        res.json(announcements);
    } catch (error) {
        console.error('Error getting documents: ', error);
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
}