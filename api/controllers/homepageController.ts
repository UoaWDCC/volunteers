import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { Request, Response } from 'express';

async function getGallery(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "gallery");

    const docs = await getDocs(colRef);

    // Return an array of the data from the gallery collection
    res.status(200).json(docs.docs.map(doc => {doc.data()}));
}

export { getGallery };