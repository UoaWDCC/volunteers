import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects
import { error } from 'console';  // Import console error (though it's not used in the code...)
import { auth } from 'firebase-admin';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();  // Initialize Firebase Storage
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
      //console.log("Student ID must be unique");
      return;
    }
  }

  // New studentID is unique, add user to database
  const newUser = await addDoc(colRef, req.body);

  res.json(newUser.id);

  // Print out the new user id for testing purposes
  //console.log(newUser.id)
}

async function deleteUser(req: Request, res: Response): Promise<void> {

  const userRef = doc(db, "users", req.params.id);  // Reference to the specific user document
  const docSnapshot = (await getDoc(userRef));  // Fetch the document snapshot

  if (!docSnapshot.exists()) {
    //console.log("Document does not exist");  // Log error message if document does not exist
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

// maybe remove this later, idk if its bad to have this endpoint
async function getUserByUid(req: Request, res: Response): Promise<void> {
    try {
        const uid = req.params.uid;  // Get uid from request parameters

        if (!uid) {
            res.status(400).json({ error: "UID is required" });
            return;
        }

        // Create a Firestore query to find users where the "uid" field matches the request parameter
        const userQuery = query(colRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(userQuery);  // Execute the query

        if (!querySnapshot.empty) {
            // If the query returns results, send the first document's data
            const user = querySnapshot.docs[0].data();  // Get the first matching document's data
            res.status(200).json({
                id: querySnapshot.docs[0].id,  // Include the document ID
                ...user,  // Spread the user data
            });  // Send the user data as JSON response
        } else {
            // If no documents are found, send a 404 error
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id; // This 'id' is expected to be the user's UID for user documents
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        let updateData: { [key: string]: any } = { ...req.body };

        const file = (req as any).file;
        if (file) {
            console.log(`File to upload: ${file.originalname}`);

            const storagePath = `profile_pictures/${userId}/${Date.now()}_${file.originalname}`;
            const storageRef = ref(storage, storagePath);

            const uploadResult = await uploadBytes(storageRef, file.buffer, { contentType: file.mimetype });

            const publicImageUrl = await getDownloadURL(uploadResult.ref);

            updateData.profile_picture = publicImageUrl;
            console.log(`Profile picture uploaded to: ${publicImageUrl}`);
        }

        // Update the Firestore document with the combined data (req.body + profile_picture if uploaded)
        await updateDoc(userRef, updateData);

        // Fetch the updated user data to send back in the response
        const updatedUserDoc = await getDoc(userRef);
        const updatedUser = updatedUserDoc.data();

        res.status(200).json(updatedUser);
        console.log('User profile updated:', updatedUser);
    } catch (error) {
        console.error('Error updating user (including image):', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getUsers, addUser, deleteUser, getUser, updateUser, getUserByUid };  // Export functions for use in other modules