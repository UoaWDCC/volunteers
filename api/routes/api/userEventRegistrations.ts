const express = require("express");
import { 
    getUserEventRegistrations,
    getRegistrationsByUserId,
    getRegistrationsByEventId,
    registerUserForEvent,
    cancelUserRegistration,
    updateRegistrationStatus,
    deleteRegistration
} from '../../controllers/userEventRegistrationController';

const router = express.Router();

// Get all registrations
router.get("/", getUserEventRegistrations);

// Get registrations by user ID
router.get("/user/:userId", getRegistrationsByUserId);

// Get registrations by event ID
router.get("/event/:eventId", getRegistrationsByEventId);

// Register user for an event
router.post("/register", registerUserForEvent);

// Cancel user registration
router.put("/cancel/:userId/:eventId", cancelUserRegistration);

// Update registration status
router.put("/:registrationId/status", updateRegistrationStatus);

// Delete registration
router.delete("/:registrationId", deleteRegistration);

export default router; 