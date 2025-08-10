import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, query, where, or, serverTimestamp } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects


async function createFriendRequest(req: Request, res: Response): Promise<void> {
    const { requester_id, reciever_id } = req.body;

    if (!requester_id) {
        res.status(400).json({ error: "requester_id is required" });
        return;
    } else if (!reciever_id) {
        res.status(400).json({ error: "reciever_id is required" });
        return;
    }

    try {
        // Use user id as document id in friendships collection
        const q = query(
            collection(db, "friendrequests"),
            or(
                where("requester_id", "==", requester_id),
                where("reciever_id", "==", reciever_id)
            )
        );

        // Check if the document exists
        const docSnap = await getDocs(q);

        if (docSnap.empty) {
            // Create new document with initial array
            await addDoc(
                collection(db, "friendrequests"),
                {
                    added_at: serverTimestamp(),
                    requester_id: requester_id,
                    reciever_id: reciever_id
                }
            );
        } else {
            res.status(200).json({ message: "Friend request already exists" });
        }

        res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export { createFriendRequest, };  // Export functions for use in other modules
