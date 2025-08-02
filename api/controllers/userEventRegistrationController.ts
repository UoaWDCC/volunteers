import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { Request, Response } from 'express';

// Collection reference
const colRef = collection(db, "userEventRegistrations");

// Get all user event registrations
async function getUserEventRegistrations(req: Request, res: Response): Promise<void> {
    try {
        const snapshot = await getDocs(colRef);
        let registrations: any = [];
        snapshot.docs.forEach((doc) => {
            let data = doc.data();
            // Convert Firestore timestamps to Date objects
            if (data.registrationDate) {
                data.registrationDate = data.registrationDate.toDate();
            }
            registrations.push({ ...data, id: doc.id });
        });
        res.json(registrations);
    } catch (err: any) {
        console.error('Error fetching user event registrations:', err.message);
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
}

// Get registrations by user ID
async function getRegistrationsByUserId(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.params;
        const q = query(colRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);
        
        let registrations: any = [];
        snapshot.docs.forEach((doc) => {
            let data = doc.data();
            if (data.registrationDate) {
                data.registrationDate = data.registrationDate.toDate();
            }
            registrations.push({ ...data, id: doc.id });
        });
        res.json(registrations);
    } catch (err: any) {
        console.error('Error fetching user registrations:', err.message);
        res.status(500).json({ error: 'Failed to fetch user registrations' });
    }
}

// Get registrations by event ID
async function getRegistrationsByEventId(req: Request, res: Response): Promise<void> {
    try {
        const { eventId } = req.params;
        const q = query(colRef, where('eventId', '==', eventId));
        const snapshot = await getDocs(q);
        
        let registrations: any = [];
        snapshot.docs.forEach((doc) => {
            let data = doc.data();
            if (data.registrationDate) {
                data.registrationDate = data.registrationDate.toDate();
            }
            registrations.push({ ...data, id: doc.id });
        });
        res.json(registrations);
    } catch (err: any) {
        console.error('Error fetching event registrations:', err.message);
        res.status(500).json({ error: 'Failed to fetch event registrations' });
    }
}

// Register user for an event
async function registerUserForEvent(req: Request, res: Response): Promise<void> {
    try {
        const { userId, eventId, userEmail, eventTitle } = req.body;
        
        // Validate required fields
        if (!userId || !eventId || !userEmail || !eventTitle) {
            res.status(400).json({ error: 'Missing required fields: userId, eventId, userEmail, eventTitle' });
            return;
        }

        // Check if user is already registered for this event (only active registrations)
        const existingQuery = query(
            colRef, 
            where('userId', '==', userId), 
            where('eventId', '==', eventId),
            where('status', '==', 'registered')
        );
        const existingSnapshot = await getDocs(existingQuery);
        
        if (!existingSnapshot.empty) {
            res.status(409).json({ error: 'User is already registered for this event' });
            return;
        }

        // Check if user has a cancelled registration for this event
        const cancelledQuery = query(
            colRef, 
            where('userId', '==', userId), 
            where('eventId', '==', eventId),
            where('status', '==', 'cancelled')
        );
        const cancelledSnapshot = await getDocs(cancelledQuery);

        if (!cancelledSnapshot.empty) {
            // Update the cancelled registration to registered
            const registrationDoc = cancelledSnapshot.docs[0];
            await updateDoc(registrationDoc.ref, {
                status: 'registered',
                registrationDate: new Date(),
                notes: 'Re-registered after cancellation'
            });
            
            res.status(200).json({ 
                id: registrationDoc.id, 
                message: 'Successfully re-registered for event',
                registration: { ...registrationDoc.data(), id: registrationDoc.id, status: 'registered' }
            });
        } else {
            // Create new registration
            const newRegistration = {
                userId,
                eventId,
                userEmail,
                eventTitle,
                registrationDate: new Date(),
                status: 'registered',
                notes: ''
            };

            const docRef = await addDoc(colRef, newRegistration);
            res.status(201).json({ 
                id: docRef.id, 
                message: 'Successfully registered for event',
                registration: { ...newRegistration, id: docRef.id }
            });
        }
    } catch (err: any) {
        console.error('Error registering user for event:', err.message);
        res.status(500).json({ error: 'Failed to register for event' });
    }
}

// Cancel user registration for an event
async function cancelUserRegistration(req: Request, res: Response): Promise<void> {
    try {
        const { userId, eventId } = req.params;
        
        // Find the registration
        const q = query(
            colRef, 
            where('userId', '==', userId), 
            where('eventId', '==', eventId)
        );
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }

        // Update the registration status to cancelled
        const registrationDoc = snapshot.docs[0];
        await updateDoc(registrationDoc.ref, {
            status: 'cancelled',
            notes: req.body.notes || 'Registration cancelled by user'
        });

        res.json({ 
            message: 'Registration cancelled successfully',
            id: registrationDoc.id
        });
    } catch (err: any) {
        console.error('Error cancelling registration:', err.message);
        res.status(500).json({ error: 'Failed to cancel registration' });
    }
}

// Update registration status
async function updateRegistrationStatus(req: Request, res: Response): Promise<void> {
    try {
        const { registrationId } = req.params;
        const { status, notes } = req.body;
        
        const registrationRef = doc(db, "userEventRegistrations", registrationId);
        const registrationDoc = await getDoc(registrationRef);
        
        if (!registrationDoc.exists()) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }

        const updateData: any = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        await updateDoc(registrationRef, updateData);
        
        res.json({ 
            message: 'Registration status updated successfully',
            id: registrationId
        });
    } catch (err: any) {
        console.error('Error updating registration status:', err.message);
        res.status(500).json({ error: 'Failed to update registration status' });
    }
}

// Delete registration
async function deleteRegistration(req: Request, res: Response): Promise<void> {
    try {
        const { registrationId } = req.params;
        
        const registrationRef = doc(db, "userEventRegistrations", registrationId);
        const registrationDoc = await getDoc(registrationRef);
        
        if (!registrationDoc.exists()) {
            res.status(404).json({ error: 'Registration not found' });
            return;
        }

        await deleteDoc(registrationRef);
        res.json({ message: 'Registration deleted successfully' });
    } catch (err: any) {
        console.error('Error deleting registration:', err.message);
        res.status(500).json({ error: 'Failed to delete registration' });
    }
}

export {
    getUserEventRegistrations,
    getRegistrationsByUserId,
    getRegistrationsByEventId,
    registerUserForEvent,
    cancelUserRegistration,
    updateRegistrationStatus,
    deleteRegistration
}; 