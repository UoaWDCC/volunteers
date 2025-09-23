import { acceptFriendRequest, createFriendRequest, getFriendRequests, rejectFriendRequest } from "../../controllers/friendRequestsController";

const express = require("express");

const router = express.Router();

router.get("/:uid", getFriendRequests); // uid as in the user's uid in the users collection
router.post("/", createFriendRequest); // Requires a request body with the following arguments: { requester_id, reciever_id }
router.post("/:id/accept", acceptFriendRequest); // Requires the id of the friend request document (returned with the getFriendRequests controller)
router.delete("/:id/reject", rejectFriendRequest); // Same parameters as acceptFriendRequest ^^

export default router;