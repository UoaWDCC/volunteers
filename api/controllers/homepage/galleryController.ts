import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { Request, Response } from 'express';

const colRef = collection(db, "homepage/gallery");

async function getGallery(req: Request, res: Response): Promise<void> {
    getDocs(colRef);
}