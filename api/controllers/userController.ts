import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Request, Response } from 'express';


const colRef = collection(db, "users");

async function getUsers(req: Request, res: Response): Promise<void> {
  const userDocs = await getDocs(colRef);
  const users = userDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));

  res.json(users).status(200);

  // Print out the users for testing purposes
  console.log(users);
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
  const userRef = doc(db, "users", req.body.id);
  const docSnapshot = (await getDoc(userRef));

  if (!docSnapshot.exists()) {
    console.log("Document does not exist")
    res.status(404).send("Document not found")
    return;
  }

  const user = { id: docSnapshot.id, ...docSnapshot.data() }

  await deleteDoc(userRef);

  res.json(user).status(200);

  // Print out message for testing purposes
  console.log("User deleted");
}

async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const id = req.body.id;

    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = userDoc.data();
    res.json(user);

    // Print out message for testing purposes
    console.log(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userRef = doc(db, "users", req.body.id);
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