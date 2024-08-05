import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Request, Response } from 'express';
import { error } from 'console';


const colRef = collection(db, "users");

async function getUsers(req: Request, res: Response): Promise<void> {
    const userDocs = await getDocs(colRef);
    const users = userDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));
    
    res.json(users);
    
    // Print out the users for testing purposes
    // console.log(users);
}

async function addUser(req: Request, res: Response): Promise<void> {
  // Get all users
  const userDocs = await getDocs(colRef);
  const users = userDocs.docs.map(doc => doc.data());
  const studentID = req.body.studentID;

  // Check if studentID is already in use
  for (let i = 0; i < users.length; i++) {
    if (users[i].studentID === studentID) {
      // Student ID is not unique, send error message and return
      res.status(400).send("Student ID must be unique");

      // Print out error message for testing purposes
      console.log("Student ID must be unique");
      return;
    }
  }

  // New studentID is unique, add user to database
  const newUser = await addDoc(colRef, req.body);

  res.json(newUser.id);

  // Print out the new user id for testing purposes
  console.log(newUser.id)
}

async function deleteUser(req: Request, res: Response): Promise<void> {

  const userRef = doc(db, "users", req.params.id);
  const docSnapshot = (await getDoc(userRef));

  if (!docSnapshot.exists()) {
    console.log("Document does not exist")
    res.status(404).send("Document not found")
    return;
  }

  const user = { id: docSnapshot.id, ...docSnapshot.data() }
  await deleteDoc(userRef);
  res.status(200).json(user);
}

async function getUser(req: Request, res: Response): Promise<void> {
    try {

        const userId = req.params.id;

        if (!userId) {
            res.status(400).json({error: "User Id is Required"});
            return;
        }


        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            const user = userSnapshot.data();
            res.json(user);
            // console.log(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user');
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userRef = doc(db, "users", req.params.id);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await updateDoc(userRef, req.body);
        
        // Fetch the updated user data for testing purposes
        const updatedUserDoc = await getDoc(userRef);
        const updatedUser = updatedUserDoc.data();

        res.json(updatedUser);
        console.log(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getUsers, addUser, deleteUser, getUser, updateUser };