import { db } from '../config/firebase';  // Import the Firestore database configuration
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects

// Get all friends by uid
async function getFriends(req: Request, res: Response): Promise<void> {

    // NOTE: each document id in the friendships collection is the corresponsing user's id
    try {
        const uid = req.params.uid;

        if (!uid) {
            res.status(400).json({ error: "UID is required" });
            return;
        }

        // Fetch their friendships document
        const friendshipsRef = doc(db, "friendships", uid);
        const friendshipsDoc = await getDoc(friendshipsRef);
        const friendshipsData = friendshipsDoc.data();

        if (!friendshipsDoc.exists() || !friendshipsData) res.json(null);

        // Fetch each friends details form the user collection
        // And return them as promises
        const friendsPromises = friendshipsData?.friend_ids.map(async (friend_id: string) => {

            const userDocRef = doc(db, "users", friend_id);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            if (userDoc.exists()) {
                // const friendDetails = userDoc.data();
                return { id: friend_id, ...userData };
            }

            return null;
        });

        // Once promises fufilled, assign them as a 'friends' constant
        const friends = (await Promise.all(friendsPromises)).filter(Boolean);
        res.json(friends);

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: `Internal server error ${JSON.stringify(error)}` });
    }
}

async function deleteFriend(req: Request, res: Response): Promise<void> {
    const uid = req.params.uid;
    const { friend_id } = req.body;

    if (!uid) {
        res.status(400).json({ error: "uid is required" });
        return;
    } else if (!friend_id) {
        res.status(400).json({ error: "friend_id is required" });
        return;
    }

    try {
        // Use user id as document id in friendships collection
        const docRef = doc(db, "friendships", uid);

        // Check if the document exists
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            res.status(200).json({ message: "friend_id not found. Operation successful" });
        } else {
            // Update the existing document by appending new friend_id
            await updateDoc(docRef, {
                friend_ids: arrayRemove(friend_id) // 'arrayUnion' handles duplicates which absolutely lovely
            });
        }

        res.status(200).json({ message: "Friend removed successfully" });

    } catch (error) {
        console.error("Error removing friend:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getFriends, deleteFriend, };  // Export functions for use in other modules
