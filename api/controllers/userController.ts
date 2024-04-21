import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Request, Response } from 'express';


const colRef = collection(db, 'users');

async function getUsers(req: Request, res: Response): Promise<void> {
    const docs = await getDocs(colRef);
    const users = docs.docs.map(doc => doc.data());
    
    res.json(users);
    
    // Print out the users for testing purposes
    console.log(users);

}

export { getUsers };