import { db } from '../config/firebase';  // Import the Firestore database configuration
import { doc, getDoc, updateDoc, arrayRemove, where, collection, query, getDocs } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects


// IMPORTANT NOTE FOR ALL FRIENDS RELATED API ENDPOINTS:
// the `uid` parameter in the api endpoints refers to the user's 'uid' field in their document NOT the actual dociment id

// this was done because the `AuthenticationConextProvider.tsx` only provides this value and not the document id itself, therefore it will be used as 
// the main identifier for fetching user data in the frontend

// Get all friends by uid
async function getFriends(req: Request, res: Response): Promise<void> {

    console.log("Fetching friends for user");

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

        if (!friendshipsDoc.exists() || !friendshipsData) {
            res.json([]);
            return;
        }

        // Fetch each friends details from the users collection
        // And return them as promises
        const friendsPromises = friendshipsData?.friend_ids.map(async (friend_id: string) => {

            const usersQuery = query(
                collection(db, "users"),
                where("uid", "==", friend_id),
            );
            const userDocs = await getDocs(usersQuery);
            const userData = userDocs.docs[0].data();
            const docId = userDocs.docs[0].id // include the document id in case someone specifically needs it
            const user = {
                id: docId,
                ...userData
            }


            // const friendDetails = userDoc.data();
            return { ...user };
        });


        // Once promises fufilled, assign them as a 'friends' constant
        const friends = (await Promise.all(friendsPromises)).filter(Boolean);
        res.json(friends);


    } catch (error) {
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
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
        const userDocRef = doc(db, "friendships", uid);
        const friendDocRef = doc(db, "friendships", friend_id);

        // Check if the document exists
        const userDocSnap = await getDoc(userDocRef);
        const friendDocSnap = await getDoc(userDocRef);


        const missingDocs: string[] = [];
        if (!userDocSnap.exists()) missingDocs.push(uid);
        if (!friendDocSnap.exists()) missingDocs.push(friend_id);
        if (missingDocs.length > 0) {
            res.status(200).json({
                message: `Document${missingDocs.length > 1 ? "s" : ""} for ${missingDocs.join(", ")} not found in friendships collection. Deletion not required.`
            });
            return;
        }

        await Promise.all([
            // Delete friend from user's friends list
            updateDoc(userDocRef, {
                friend_ids: arrayRemove(friend_id)
            }),
            // Delete user from friend's friends list
            updateDoc(friendDocRef, {
                friend_ids: arrayRemove(uid)
            })
        ])

        res.status(200).json({ message: "Friend removed successfully" });

    } catch (error) {
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
    }
}

export { getFriends, deleteFriend, };  // Export functions for use in other modules
