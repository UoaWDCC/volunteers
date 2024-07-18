import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Request, Response } from 'express';


const colRef = collection(db, "Announcements");


export async function getAllAnnouncements(req: Request, res: Response): Promise<void> {
    const userDocs = await getDocs(colRef);
    const announcements = userDocs.docs.map(doc => doc.data());
    
    res.json(announcements);
    
    console.log(announcements);
}