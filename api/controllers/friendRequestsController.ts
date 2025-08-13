import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where, setDoc, arrayUnion, arrayRemove, runTransaction, or, serverTimestamp } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects

async function getFriendRequests(req: Request, res: Response): Promise<void> {
    // This returns a json object with just the requester and reciever ids
    // Will need to be revisited and refactored to return more details if needed (i.e. each user's details like name)
    const uid = req.params.uid;

    if (!uid) {
        res.status(400).json({ error: "uid is required" });
        return;
    }

    try {
        const q = query(
            collection(db, "friendrequests"),
            or(
                where("requester_id", "==", uid),
                where("reciever_id", "==", uid),
            )
        );

        const frDocs = await getDocs(q);
        const friendRequests = frDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        res.status(200).json(friendRequests)


    } catch (error) {
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
    }
}

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
            where("requester_id", "==", requester_id),
            where("reciever_id", "==", reciever_id)
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
            return;
        }

        res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
    }
}

async function acceptFriendRequest(req: Request, res: Response): Promise<void> {

    const frId = req.params.id;


    if (!frId) {
        res.status(400).json({ error: "Friend request ID is required" });
        return;
    }

    // Delete friend request document
    try {
        await runTransaction(db, async (transaction) => {

            const frDoc = await getDoc(doc(db, "friendrequests", frId));
            const frData = frDoc.data();
            if (!frDoc.exists() || !frData) {
                throw new Error("Friend request not found");
            }

            const friendRequestDoc = frDoc.ref;
            transaction.delete(friendRequestDoc);

            const requesterDocRef = doc(db, "friendships", frData.requester_id);
            const receiverDocRef = doc(db, "friendships", frData.reciever_id);

            // Add user ids to each other's friends list
            transaction.set(requesterDocRef, { friend_ids: arrayUnion(frData.reciever_id) }, { merge: true });
            transaction.set(receiverDocRef, { friend_ids: arrayUnion(frData.requester_id) }, { merge: true });
        });

        res.status(200).json({ error: "Friend request accepted succesfully" });
        
    } catch (error) {
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
    }
}

async function rejectFriendRequest(req: Request, res: Response): Promise<void> {

    const frId = req.params.id;

    if (!frId) {
        res.status(400).json({ error: "requester_id is required" });
        return;
    }

    // Delete friend request document
    try {
        const frDoc = await getDoc(doc(db, "friendrequests", frId));
        const frData = frDoc.data();
        if (!frDoc.exists() || !frData) {
            throw new Error("Friend request not found");
        } else {
            const friendRequestDoc = frDoc.ref;
            await deleteDoc(friendRequestDoc);
        }

        res.status(200).json({ message: "Friend request rejected successfully" });

    } catch (error) {
        res.status(500).json({ error: `Internal server error, ${JSON.stringify(error)}` });
    }
}

export { getFriendRequests, createFriendRequest, acceptFriendRequest, rejectFriendRequest };  // Export functions for use in other modules
