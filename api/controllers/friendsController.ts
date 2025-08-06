import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects

// Collection reference
const colRef = collection(db, "friendships");

// Get all friends by uid
async function getFriendsByUid(req: Request, res: Response): Promise<void> {
    try {
        const uid = req.params.uid;

        if (!uid) {
            res.status(400).json({ error: "UID is required" });
            return;
        }

        const friendshipQuery = query(colRef, where("user_id", "==", uid));
        const friendshipSnapshot = await getDocs(friendshipQuery);

        if (friendshipSnapshot.empty) {
            res.status(404).json({ error: "Record for user in friends collection not found" });
            return;
        }

        const friendshipDoc = friendshipSnapshot.docs[0];
        const friendshipId = friendshipDoc.id;

        const friendsColRef = collection(db, "friendships", friendshipId, "friends");
        const friendsSnapshot = await getDocs(friendsColRef);

        const promises = friendsSnapshot.docs.map(async (friendsDoc) => {
            const data = friendsDoc.data();
            const friendId = data.friend_id;

            const userDocRef = doc(db, "users", friendId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const friendDetails = userDoc.data();
                return { id: friendsDoc.id, ...friendDetails };
            }

            return null;
        });

        const friends = (await Promise.all(promises)).filter(Boolean);
        res.json(friends);

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
