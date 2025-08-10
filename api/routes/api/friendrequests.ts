import { createFriendRequest, } from "../../controllers/friendRequestsController";

const express = require("express");

const router = express.Router();

// Add target friend id in request body (i.e. friend you want to add, remove etc.)

router.post("/", createFriendRequest);

export default router;