import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects

// Collection reference
const colRef = collection(db, "friendships");

// Get all friends by uid
async function getFriendsByUid(req: Request, res: Response): Promise<void> {
    try {
        const uid = req.params.uid;  // Get uid from request parameters
        const userRef = doc(db, "users", uid); // Get reference object for specific uid

        if (!uid) {
            res.status(400).json({ error: "UID is required" });
            return;
        }

        // Create a Firestore query to find users where the "user_ref" field matches the request parameter
        const userQuery = query(colRef, where("user_ref", "==", userRef));
        const querySnapshot = await getDocs(userQuery)  // Execute the query

        if (!querySnapshot.empty) {
            // Get first matching document from top-level frienships collection
            let friendshipDoc = querySnapshot.docs[0];
            let friendshipId = friendshipDoc.id;

            // Get the friends subcollection for that friendship
            const friendsColRef = collection(db, "friendships", friendshipId, "friends");
            const friendsSnapshot = await getDocs(friendsColRef);

            let friends: any = []; 
            
            friendsSnapshot.docs.forEach(doc => {
                let data = doc.data();

                friends.push({ id: doc.id, ...data }); // Push each document's data and its ID into the friends array
            });

            res.json(friends);  // Send the events data as JSON response
        } else {
            // If no documents are found, send a 404 error
            res.status(404).json({ error: "Record for user in friends collection not found" });
        }

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateFriends(req: Request, res: Response): Promise<void> {
}

async function deleteFriend(req: Request, res: Response): Promise<void> {
}

async function createFriendRequest(req: Request, res: Response): Promise<void> {
}

async function deleteFriendRequest(req: Request, res: Response): Promise<void> {
}


export { getFriendsByUid, };  // Export functions for use in other modules
