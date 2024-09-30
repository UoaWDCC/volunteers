import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, where, query } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects
import { error } from 'console';  // Import console error (though it's not used in the code...)
import { auth } from 'firebase-admin';


const colRef = collection(db, "users");

async function getUsers(req: Request, res: Response): Promise<void> {
    const userDocs = await getDocs(colRef);  // Fetch all documents from the "users" collection
    const users = userDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));  // Map documents to their data and include the document ID
    
    res.json(users);  // Send the users data as JSON response
    
    // Print out the users for testing purposes
    // console.log(users);
}

async function addUser(req: Request, res: Response): Promise<void> {
  // Get all users
  const userDocs = await getDocs(colRef);
  const users = userDocs.docs.map(doc => doc.data());
  const studentID = req.body.studentID;  // Get studentID from request body

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

  const userRef = doc(db, "users", req.params.id);  // Reference to the specific user document
  const docSnapshot = (await getDoc(userRef));  // Fetch the document snapshot

  if (!docSnapshot.exists()) {
    console.log("Document does not exist");  // Log error message if document does not exist
    res.status(404).send("Document not found");  // Send 404 response
    return;
  }

  const user = { id: docSnapshot.id, ...docSnapshot.data() }
  await deleteDoc(userRef);  // Delete the document
  res.status(200).json(user);  // Send the deleted user data as JSON response
}

async function getUser(req: Request, res: Response): Promise<void> {
    try {

        const userId = req.params.id;  // Get user ID from request parameters

        if (!userId) {
            res.status(400).json({error: "User Id is Required"});  // Send error response if user ID is not provided
            return;
        }

        // Check uid field in the user document
        const q = query(colRef, where("uid", "==", userId));

        const snapshot = await getDocs(q);  // Fetch the user document snapshot

        const userSnapshot = snapshot.docs[0];  // Get the first document in the snapshot

        if (userSnapshot.exists()) {
            const user = userSnapshot.data();  // Get user data
            res.json(user);  // Send the user data as JSON response
            // console.log(user);  // Uncomment to log user data for debugging
        } else {
            res.status(404).json({ error: 'User not found' });  // Send 404 response if user does not exist
        }
    } catch (error) {
        console.error('Error fetching user');  // Log error if something goes wrong
        res.status(500).json({ error: 'Internal server error' });  // Send 500 response for internal server error
    }
    
}

async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userRef = doc(db, "users", req.params.id);  // Reference to the specific user document
        const userDoc = await getDoc(userRef);  // Fetch the document snapshot

        if (!userDoc.exists()) {
            res.status(404).json({ message: 'User not found' });  // Send 404 response if user does not exist
            return;
        }
        await updateDoc(userRef, req.body);  // Update the document with data from request body
        
        // Fetch the updated user data for testing purposes
        const updatedUserDoc = await getDoc(userRef);
        const updatedUser = updatedUserDoc.data();

        res.status(200).json(updatedUser);  // Send updated user data as JSON response
        console.log(updatedUser);  // Log updated user data for debugging
    } catch (error) {
        console.error('Error updating user:', error);  // Log error if something goes wrong
        res.status(500).json({ message: 'Internal server error' });  // Send 500 response for internal server error
    }
}

export { getUsers, addUser, deleteUser, getUser, updateUser };  // Export functions for use in other modules