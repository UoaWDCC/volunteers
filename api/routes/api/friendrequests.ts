import { acceptFriendRequest, createFriendRequest, getFriendRequests, rejectFriendRequest } from "../../controllers/friendRequestsController";

const express = require("express");

const router = express.Router();

// Add target friend id in request body (i.e. friend you want to add, remove etc.)

router.get("/:uid", getFriendRequests);
router.post("/", createFriendRequest);
router.post("/:id/accept", acceptFriendRequest);
router.delete("/:id/reject", rejectFriendRequest);

export default router;