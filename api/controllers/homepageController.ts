import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { Request, Response } from 'express';



async function getGallery(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "gallery");
    const docs = await getDocs(colRef);

    // Return an array of the data from the gallery collection
    res.status(200).json(docs.docs.map(doc => doc.data()));
}

async function getHighlights(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "highlights");
    const docs = await getDocs(colRef);

    // Return an array of the data from the eventHighlights collection
    res.status(200).json(docs.docs.map(doc => doc.data()));
}

async function getAchievements(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "achievements");
    const docs = await getDocs(colRef);

    // Only return the first document from the achievements collection. Since there should only be one document in the collection, this is fine.
    const doc = docs.docs.map(doc => doc.data())[0];

    // Return the single document from the achievements collection
    res.status(200).json(doc);
}

async function getCommunity(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "community");
    const docs = await getDocs(colRef);

    // Only return the first document from the community collection. Since there should only be one document in the collection, this is fine.
    const doc = docs.docs.map(doc => doc.data())[0];

    // Return the single document from the community collection
    res.status(200).json(doc);
}

async function getSponsors(req: Request, res: Response): Promise<void> {
    const colRef = collection(db, "sponsors");
    const docs = await getDocs(colRef);

    // Return an array of the data from the sponsors collection
    res.status(200).json(docs.docs.map(doc => doc.data()));
}


export { getGallery, getHighlights, getAchievements, getCommunity, getSponsors };